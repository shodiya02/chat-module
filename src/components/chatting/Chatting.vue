<template>
  <div class="h-full flex flex-col">
    <div class="flex-grow overflow-y-auto p-4 space-y-2 bg-gray-50">
      <div
        v-for="message in messages"
        :key="message.id"
        class="p-2 rounded border bg-white shadow-sm"
      >
        <div class="text-sm text-gray-700">{{ message.sender }}:</div>
        <div class="text-base">{{ message.text }}</div>

        <div class="p-4 border-b bg-white">
          <div class="text-lg font-semibold">{{ chatting?.client.name }}</div>
          <div class="text-sm text-gray-500">{{ chatting?.project?.name }}</div>
        </div>

      </div>
    </div>

    <div class="border-t p-4">
      <input
        v-model="newMessage"
        class="w-full p-2 border rounded"
        placeholder="Type a message..."
        @keydown.enter="sendMessage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { useChatting } from '@/service/modules/chat/chat'
import { useLocalStorage } from '@vueuse/core'

const { chatting } = useChatting()

const messages = ref<{ id: number; text: string; sender: string }[]>([])
const newMessage = useLocalStorage(
  computed(() => `draft-${chatting.value?.ticketId}-message`),
  '',
  { writeDefaults: false }
)

// Load mock messages when chat changes
watchEffect(() => {
  if (chatting.value) {
    // Mock: Load messages based on ticketId
    messages.value = [
      { id: 1, text: `Hello from ${chatting.value.ticketId}`, sender: 'User' },
      { id: 2, text: 'How can I help?', sender: 'Support' }
    ]
  }
})

function sendMessage() {
  if (!newMessage.value.trim()) return

  messages.value.push({
    id: Date.now(),
    text: newMessage.value,
    sender: 'You'
  })

  newMessage.value = ''
}
</script>
