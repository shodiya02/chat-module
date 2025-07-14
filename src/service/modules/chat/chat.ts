import { ref } from 'vue'

export interface ChatInfo {
  ticketId: string
  client: { name: string }
  project?: { name: string }
  lastMessage?: {
    text: string
    createdAt: string
  }
  status: string
}

const chatting = ref<ChatInfo | undefined>(undefined)

export function useChatting() {
  function open(chat: ChatInfo) {
    chatting.value = chat
  }

  function close() {
    chatting.value = undefined
  }

  return {
    chatting,
    open,
    close
  }
}
