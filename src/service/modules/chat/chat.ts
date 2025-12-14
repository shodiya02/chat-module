import { ref } from 'vue'

// Simple message type
export interface ChatMessage {
  _id: string
  text: string
  sender: string
  chat: string
  createdAt: string
  type?: number
}

// Reactive array to store messages
const messages = ref<ChatMessage[]>([])

// Add a new message to the store
export function addMessage(message: ChatMessage) {
  // Check if message already exists (avoid duplicates)
  const exists = messages.value.find((m) => m._id === message._id)
  if (!exists) {
    messages.value.push(message)
    // Sort by creation date (newest at bottom)
    messages.value.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
  }
}

// Remove a message (for delete events)
export function removeMessage(messageId: string) {
  messages.value = messages.value.filter((m) => m._id !== messageId)
}

// Update a message (for edit events)
export function updateMessage(messageId: string, updates: Partial<ChatMessage>) {
  const index = messages.value.findIndex((m) => m._id === messageId)
  if (index !== -1) {
    messages.value[index] = { ...messages.value[index], ...updates }
  }
}

// Get all messages (reactive)
export function useMessages() {
  return {
    messages,
    addMessage,
    removeMessage,
    updateMessage
  }
}
