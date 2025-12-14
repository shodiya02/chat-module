import { watchImmediate } from '@vueuse/core'
import { ws } from '@/modules/socket/index.ts'
import { ref } from 'vue'
import { addMessage, removeMessage, updateMessage } from '@/service/modules/chat/chat'

enum ChatEventType {
  NewMessage = 'chat.message.new',
  MessageDeleted = 'chat.message.deleted',
  MessageEdited = 'chat.message.edited',

  OperatorConnected = 'OPERATOR_CONNECTED_TO_TICKET',
  OperatorDisconnected = 'OPERATOR_DISCONNECTED_FROM_TICKET',

  WebCallRoomCreated = 'web-call.room.created',
  WebCallRoomPeerJoined = 'web-call.room.peer.joined',
  WebCallRoomPeerDisconnected = 'web-call.room.peer.disconnected',
  WebCallRoomClosed = 'web-call.room.closed',
}

export default function registerEvents() {
  const tokenVal =
    'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjdkZjUzZDUwNWEzODE3YmU1Njk5ZSIsInVzZXJuYW1lIjoiSm9uaWJla1MiLCJ0eXBlIjoiZW1wbG95ZWUiLCJvcmdhbml6YXRpb24iOiI2MzVmYjk1ODIwOTg1MThiZjNiYjM3YjYiLCJpYXQiOjE3NDYxMDA3MTR9.eF_yKD4U3Kl8JyIKZzUZAJ4gJzyEyVYWbWcUKD5oaLHF0-g7fAZ3R2OjfrCZO5e7r0mqDrK3MO8dKMm-S8-l34Y59Wh_X0jx67QPqjcDb5jKTHFYyGKrbgT7Xi5U6LB7w0Bwsvkg7rlftXy8Be77CmFKPwxa5rwv71U-KemwQ1Tk2sDblYPA30m6-SuafbOW4KMwf6PC4LfQrgESGxZCPum8MhOBeJg7QESoia_8LU28QMEeX3syCQye9sFfHjo-XrAiIHo48YVxxI3GaAa8sAdzC-k0esqdgG9D56g_XqPR_RwupCcClhWrtSPNArVus179blgZmBfhMj3ogV0nwyZPfaTb7OAkxinPr9fT5UoZxt5W9Kpd-mCQRrKtz0K05gYbFi5jVObGIEPZ_I-abZHK6z5T6urjTFhkck8qndNsJZwnlcpHY_D3McltN36A2Aj0tlMSmMqYB75u-MU1b1_JBeeLb-ErLa2_1QM_srRB3sWvMaYWOCvC9MLnburmlzAhriW0xgXHV48eRbQai2VlvJju5Pu-Q-GG__UFWRuvfjH93QLr7Gj8e64IA9Di9fd48mjGAlCO10v_pmm8xvKH6TUXK0O6y3Vi-3hnNmGrcIPQOQM6Ur6pqr-3-bzoGLRsn5Lhcv7O71P_rQb5lcsOa43_tsVYkYdUXqKVFGk'
  const token = ref<string | null>(tokenVal)

  watchImmediate(token, (token, oldValue) => {
    if (token && token !== oldValue) {
      ws.connect(token)
    }
  })

  // Register event handlers to see incoming messages
  console.log('🎯 Registering WebSocket event handlers...')

  // Handler for new chat messages
  ws.onEvent(ChatEventType.NewMessage, (message) => {
    console.log('📨 New message received:', message)
    addMessage(message) // Add to our message store!
  })

  // Handler for deleted messages
  ws.onEvent(ChatEventType.MessageDeleted, (data) => {
    console.log('🗑️ Message deleted:', data)
    if (data._id) {
      removeMessage(data._id) // Remove from store
    }
  })

  // Handler for edited messages
  ws.onEvent(ChatEventType.MessageEdited, (message) => {
    console.log('✏️ Message edited:', message)
    if (message._id) {
      updateMessage(message._id, message) // Update in store
    }
  })

  // Handler for operator presence
  ws.onEvent(ChatEventType.OperatorConnected, (data) => {
    console.log('👤 Operator connected:', data)
  })

  ws.onEvent(ChatEventType.OperatorDisconnected, (data) => {
    console.log('👋 Operator disconnected:', data)
  })
}
