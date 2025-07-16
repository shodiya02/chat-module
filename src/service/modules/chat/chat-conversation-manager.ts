import { computed, inject, provide, ref } from 'vue'
import { useInfiniteQuery, useQueryClient } from '@tanstack/vue-query'
import http from '@/service/http'
import { TicketStatus } from '@/views/Tickets/types'
import { ChatTabType, type LocalTicketChat, type RemoteTicketChat } from './types'
import type { AxiosResponse } from 'axios'


const ChatConversationManagerSymbol = Symbol('ChatConversationManager')

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
          value: []
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
    queryKey: ['chat-list', activeTab, direction], // Added direction to query key for proper caching
    queryFn: async (context) => {
      const chats = await fetchTicketList(
        context.pageParam,
        activeTab.value,
        direction.value, // FIXED: Added missing direction parameter
      )

      // Uncomment if you need to save chat details
      // chats.forEach((chat) => {
      //   saveChatItemDetails(queryClient, chat)
      // })

      return chats
    },
    getNextPageParam: (lastPage: any, pages) => {
      if (!Array.isArray(lastPage) || lastPage.length === 0) {
        return undefined
      }

      return pages.length + 1
    },
    initialPageParam: 1 // Added initialPageParam for @tanstack/vue-query v5
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

export function useChatConversationManager() {
  const chatConversationManager = inject(ChatConversationManagerSymbol)
  if (!chatConversationManager) {
    throw new Error('ChatConversationManager is not provided')
  }
  return chatConversationManager
}
