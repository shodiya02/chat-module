<template>
  <div class="w-[300px] border-r border-gray-200 dark:border-gray-700 p-4">
    <h2 class="text-lg font-semibold mb-4">Conversations</h2>

    <ul v-if="!isLoading" class="space-y-2">
      <!-- Add inside your v-for loop -->
      <template v-for="chat in sortedChats" :key="chat.ticketId">

      <li
          class="p-3 border rounded cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800 relative"
          @click="selectChat(chatWithDraft(chat))"
        >
          <div class="font-medium">{{ chat.client.name }}</div>
          <div class="text-sm text-gray-600">{{ chat.project?.name }}</div>

          <div v-if="getDraft(chat.ticketId)" class="text-xs text-red-500 mt-1">
            Draft: {{ getDraft(chat.ticketId) }}
          </div>
          <div v-else class="text-sm text-gray-500 mt-1">
            {{ chat.lastMessage?.text }}
          </div>

          <div
            v-if="chat.status === 'HasUpdate'"
            class="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-tr rounded-br"
          />
        </li>
      </template>


    </ul>
    <div v-else class="p-4 text-gray-400">Loading chats...</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { type ChatInfo, useChatting } from '@/service/modules/chat/chat'
import { useLocalStorage } from '@vueuse/core'
import { getTicketsList } from '@/service/http/api/chat.ts'

const { open } = useChatting()

const filter = computed(() => ({
  date: [],
  status: undefined,
  operatorId: undefined,
  topicId: undefined,
  departmentId: undefined,
  projectId: undefined,
  rating: undefined,
  page: 1
}))

const { data: ticketData, isLoading } = getTicketsList(filter)

function getDraft(ticketId: string) {
  return useLocalStorage(`draft_${ticketId}`, '', { writeDefaults: false }).value
}

function chatWithDraft(chat: ChatInfo) {
  return {
    ...chat,
    draftMessage: getDraft(chat.ticketId)
  }
}

const sortedChats = computed(() => {
  return [...chats.value].sort((a, b) => {
    const aTime = new Date(a.lastMessage?.createdAt ?? 0).getTime()
    const bTime = new Date(b.lastMessage?.createdAt ?? 0).getTime()
    return bTime - aTime // newest first
  })
})



const chats = ref<ChatInfo[]>([
  {
    ticketId: 'abc123',
    client: { name: 'Alice' },
    project: { name: 'Website Redesign' },
    lastMessage: { text: 'Can you update the footer?', createdAt: '2024-04-01T10:00:00Z' },
    status: 'HasUpdate'
  },
  {
    ticketId: 'def456',
    client: { name: 'Bob' },
    project: { name: 'Mobile App' },
    lastMessage: { text: 'Bug on login screen', createdAt: '2024-04-02T09:15:00Z' },
    status: 'Archived'
  },
  {
    ticketId: 'ghi789',
    client: { name: 'Charlie' },
    project: { name: 'Landing Page' },
    lastMessage: { text: 'New updates pushed!', createdAt: '2024-04-03T12:30:00Z' },
    status: 'HasUpdate'
  }
])



function selectChat(chat: ChatInfo) {
  open(chat)
}
</script>
