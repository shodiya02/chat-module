<script setup lang="ts">
import { useMessages } from '@/service/modules/chat/chat'
import ChatMessage from './ChatMessage.vue'
import { ref, watch, nextTick } from 'vue'

const { messages } = useMessages()
const messageContainer = ref<HTMLElement | null>(null)

// Auto-scroll to bottom when new messages arrive
watch(
  () => messages.value.length,
  async () => {
    await nextTick()
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  }
)
</script>

<template>
  <div
    ref="messageContainer"
    class="flex-1 overflow-y-auto p-6 bg-white space-y-1"
    style="max-height: 500px"
  >
    <div v-if="messages.length === 0" class="text-center text-gray-500 py-8">
      <p>No messages yet. Messages will appear here in real-time!</p>
      <p class="text-sm mt-2">Try sending a message from another tab or the operator dashboard.</p>
    </div>

    <ChatMessage v-for="message in messages" :key="message._id" :message="message" />
  </div>
</template>

<style scoped></style>
