<template>
  <div ref="container" class="flex h-screen w-full" tabindex="-1">
    <Conversations />

    <div class="flex-grow">
      <ConditionalChatRendererLayout v-if="chatting" :chatting="chatting" />
      <div v-else class="flex items-center justify-center h-full text-gray-400">
        Select a conversation
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ConditionalChatRendererLayout from '@/layout/ConditionalChatRendererLayout.vue'
import { useChatting } from '@/service/modules/chat/chat'
import Conversations from '@/components/conversations/Conversations.vue'

const container = ref<HTMLElement | null>(null)

const { chatting, close } = useChatting()

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()
    close()
  }
}

onMounted(() => {
  container.value?.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  container.value?.removeEventListener('keydown', handleKeyDown)
})
</script>
