<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Chat View</h2>
    <p class="text-gray-600">Currently viewing ticket: <strong>{{ chatting?.ticketId }}</strong></p>
    <Chatting v-if="chatting" :ticket-id="chatting.ticketId" />

  </div>
</template>

<script lang="ts" setup>
import { useChatting } from '@/service/modules/chat/chat'
import Chatting from '@/components/chatting/Chatting.vue'

const { chatting } = useChatting()
</script>
