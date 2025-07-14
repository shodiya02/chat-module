import { computed, provide, ref } from 'vue'
import { useInfiniteQuery, useQueryClient } from '@tanstack/vue-query'
import http from '@/service/http'
import { useUser } from '@/service/modules/user/user'
import { TicketStatus } from '@/views/Tickets/types'
import { ChatTabType, type LocalTicketChat, type RemoteTicketChat } from './types'
import { saveChatItemDetails } from './chat-item-details'
import type { AxiosResponse } from 'axios'


const ChatConversationManagerSymbol = Symbol('ChatConversationManager')
const ConversationTicketsPerPage = 20

interface FetchTicketListData {
  page: number
  sort?: {
    respondDate?: 1 | -1
    lastActivityAt?: 1 | -1
  }
  status?: TicketStatus[]
  filters: {
    key: 'operators'
    condition: '$in' | 'null'
    value: any[]
  }[]
}


async function fetchTicketList(
  page: number,
  activeTab: ChatTabType,
  direction: 'asc' | 'desc',
  userId: string
): Promise<RemoteTicketChat[]> {
  let data: FetchTicketListData

  if (activeTab === ChatTabType.New) {
    data = {
      page: page,
      filters: [],
      sort: {
        respondDate: direction === 'asc' ? 1 : -1,
        lastActivityAt: direction === 'asc' ? -1 : 1
      },
      status: [TicketStatus.HasUpdate]
    }
  } else if (activeTab === ChatTabType.Mine) {
    data = {
      page: page,
      sort: {
        lastActivityAt: direction === 'asc' ? -1 : 1
      },
      filters: [
        {
          key: 'operators',
          condition: '$in',
          value: [userId]
        }
      ]
    }
  } else if (activeTab === ChatTabType.All) {
    data = {
      page: page,
      filters: [],
      sort: {
        lastActivityAt: direction === 'asc' ? -1 : 1
      }
    }
  } else {
    throw new Error('Function not implemented')
  }

  return (
    await http.post<RemoteTicketChat[], AxiosResponse<RemoteTicketChat[]>, FetchTicketListData>(
      '/operator/tickets-beta',
      data
    )
  ).data
}

export function provideChatConversationManager() {
  const { id: userId } = useUser()
  const queryClient = useQueryClient()

  const activeTab = ref<ChatTabType>(ChatTabType.New)
  const direction = ref<'asc' | 'desc'>('asc')

  const {
    data: chatList,
    fetchNextPage,
    isLoading,
    isFetchingNextPage
  } = useInfiniteQuery({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryKey: ['chat-list', activeTab],
    queryFn: async (context) => {
      const chats = await fetchTicketList(
        context.pageParam,
        activeTab.value,
        userId.value!!
      )

      // chats.forEach((chat) => {
      //   saveChatItemDetails(queryClient, chat)
      // })

      return chats
    }
    getNextPageParam: (lastPage: any, pages) => {
      if (!Array.isArray(lastPage) || lastPage.length === 0) {
        return undefined
      }

      return pages.length + 1
    },
    enabled() {
      return userId.value != null
    },
  })

  const currentChats = computed<LocalTicketChat[]>(() => {
    const pages = chatList.value?.pages ?? []
    return pages.flat() as LocalTicketChat[]
  })

  const triggerLoad = async () => {
    if (!isLoading.value && !isFetchingNextPage.value) {
      await fetchNextPage()
    }
  }

  const manager = {
    activeTab,
    direction,
    chatList,
    currentChats,
    triggerLoad,
    isLoading,
    isFetchingNextPage
  }

  provide(ChatConversationManagerSymbol, manager)

  return manager
}

