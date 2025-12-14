<script setup lang="ts">
import { ref } from 'vue'
import { sendTextMessage } from '@/service/http/api/chat'

const props = defineProps<{
  ticketId: string
}>()

const messageText = ref('')
const { mutate: send, isPending } = sendTextMessage()

function handleSend() {
  if (!messageText.value.trim() || isPending.value) return

  send(
    {
      ticketId: props.ticketId,
      text: messageText.value
    },
    {
      onSuccess: () => {
        console.log('✅ Message sent successfully!')
        messageText.value = '' // Clear input
      },
      onError: (error) => {
        console.error('❌ Failed to send message:', error)
        alert('Failed to send message. Check console for details.')
      }
    }
  )
}

function handleKeydown(event: KeyboardEvent) {
  // Send on Enter (without Shift)
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSend()
  }
  // Shift+Enter allows new line
}
</script>

<template>
  <div class="border-t border-gray-200 p-4 bg-white">
    <div class="flex gap-2">
      <textarea
        v-model="messageText"
        @keydown="handleKeydown"
        :disabled="isPending"
        placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows="2"
      />
      <button
        @click="handleSend"
        :disabled="isPending || !messageText.trim()"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {{ isPending ? 'Sending...' : 'Send' }}
      </button>
    </div>
    <p class="text-xs text-gray-500 mt-2">
      💡 Tip: Press Enter to send, Shift+Enter for a new line
    </p>
  </div>
</template>
