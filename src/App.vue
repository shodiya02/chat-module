<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">💬 Real-Time Chat Module</h1>

      <!-- Status Card -->
      <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <p class="text-green-800 font-semibold">WebSocket Connected</p>
        </div>
        <p class="text-sm text-green-700 mt-1">
          Real-time messaging active. Messages will appear instantly!
        </p>
      </div>

      <!-- Chat Container -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-blue-600 text-white px-6 py-4">
          <h2 class="text-xl font-semibold">Chat Messages</h2>
          <p class="text-sm text-blue-100">Messages from: {{ messages.length }} total</p>
        </div>

        <!-- Message List -->
        <ChatMessageList />

        <!-- Message Input -->
        <ChatInput ticket-id="YOUR_TICKET_ID_HERE" />
      </div>

      <!-- Debug Info -->
      <div class="mt-4 p-4 bg-gray-800 text-gray-100 rounded-lg text-xs font-mono">
        <p class="text-gray-400 mb-2">🐛 Debug Info:</p>
        <p>Total messages: {{ messages.length }}</p>
        <p class="text-gray-400 mt-2">Check console (F12) for WebSocket events</p>
      </div>
    </div>
  </div>
  <WsEvents />
</template>

<script lang="ts" setup>
import WsEvents from '@/WsEvents.vue'
import ChatMessageList from '@/components/Chat/ChatMessageList.vue'
import ChatInput from '@/components/Chat/ChatInput.vue'
import { useMessages } from '@/service/modules/chat/chat'

const { messages } = useMessages()
</script>
