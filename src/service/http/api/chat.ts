import http from '@/service/http'
import type { ChatMessage } from '@/service/modules/chat/chat'
import { useMutation } from '@tanstack/vue-query'

// ============================================
// TYPE DEFINITIONS (from original code)
// ============================================

export interface SendTextMessageData {
  ticketId: string
  replyTo?: string  // Optional: for replying to a message
  text: string
}

export interface SendTextMessageResponse {
  sent: boolean
  message: ChatMessage
}

// ============================================
// SEND TEXT MESSAGE
// ============================================

/**
 * Send a text message to a chat
 *
 * Usage in component:
 * ```
 * const { mutate: send } = sendTextMessage()
 *
 * send({ ticketId: '123', text: 'Hello!' })
 * ```
 */
export function sendTextMessage() {
  return useMutation({
    mutationKey: ['chat-send-text-message'],
    mutationFn: async (data: SendTextMessageData) => {
      return http
        .post<SendTextMessageResponse>('operator-chat/message/text', data)
        .then((res) => res.data)
    }
  })
}

// ============================================
// EDIT TEXT MESSAGE
// ============================================

export interface EditTextMessageData {
  ticketId: string
  messageId: string
  text: string
}

export interface EditTextMessageResponse {
  edited: boolean
  message: ChatMessage
}

export function editTextMessage() {
  return useMutation({
    mutationKey: ['chat-edit-text-message'],
    mutationFn: async (data: EditTextMessageData) => {
      return http
        .post<EditTextMessageResponse>('operator-chat/message/text/edit', data)
        .then((res) => res.data)
    }
  })
}

// ============================================
// DELETE MESSAGE
// ============================================

interface DeleteTextMessageData {
  ticketId: string
  messageId: string
}

interface DeleteTextMessageResponse {
  deleted: boolean
}

export function deleteMessage() {
  return useMutation({
    mutationKey: ['chat-delete-text-message'],
    mutationFn: async (data: DeleteTextMessageData) => {
      return http
        .delete<DeleteTextMessageResponse>('operator-chat/message', { data })
        .then((res) => res.data)
    }
  })
}
