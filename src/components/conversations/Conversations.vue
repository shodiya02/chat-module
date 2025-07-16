<template>
  <div class="w-[300px] border-r border-gray-200 dark:border-gray-700 p-4">
    <h2 class="text-lg font-semibold mb-4">Conversations</h2>

    <ul class="space-y-2">
      <!-- Add inside your v-for loop -->
      <template v-for="chat in currentChats" :key="chat.ticketId">

        <li
          class="p-3 border rounded cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800 relative"
        >
          <div class="font-medium">{{ chat.client.name }}</div>
          <div class="text-sm text-gray-600">{{ chat.project?.name }}</div>


          <div class="text-sm text-gray-500 mt-1">
            {{ chat.lastMessage?.text }}
          </div>

          <div
            class="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-tr rounded-br"
          />
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useChatConversationManager } from '@/service/modules/chat/chat-conversation-manager.ts'
const { currentChats } = useChatConversationManager()

</script>
