<script setup lang="ts">
import type { ChatMessage } from '@/service/modules/chat/chat'

defineProps<{
  message: ChatMessage
}>()

function formatTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div class="mb-4 flex items-start gap-3">
    <!-- Avatar -->
    <div class="flex-shrink-0">
      <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
        {{ message.sender.slice(0, 2).toUpperCase() }}
      </div>
    </div>

    <!-- Message content -->
    <div class="flex-1">
      <div class="flex items-baseline gap-2 mb-1">
        <span class="font-semibold text-gray-900">{{ message.sender }}</span>
        <span class="text-xs text-gray-500">{{ formatTime(message.createdAt) }}</span>
      </div>
      <div class="bg-gray-100 rounded-lg px-4 py-2 inline-block">
        <p class="text-gray-800">{{ message.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
