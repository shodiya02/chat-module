import type { App } from 'vue'
import { inject, onBeforeUnmount } from 'vue'

type SocketHandler = (...args: any) => void

export class WS {
  ws: WebSocket | undefined
  events = new Map<string, Set<SocketHandler>>()
  private token: string | undefined

  connect(token: string) {
    console.log('Connect')
    this.token = token

    if (this.ws) {
      this.ws.onclose = null
      this.ws.close()
    }

    const initWS = () => {
      const wsUrl = `${window.CALL24_CONFIG.WS_URL}?token=${token}`
      console.log('🔌 Initializing WebSocket connection to:', wsUrl)
      this.ws = new WebSocket(wsUrl)

      this.ws.onopen = () => {
        console.log('✅ WebSocket connected successfully!')
      }

      this.ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error)
      }

      this.ws.onclose = (ev: CloseEvent) => {
        console.log('⚠️ WebSocket closed:', ev.code, ev.reason)
        console.log('🔄 Reconnecting in 1 second...')
        setTimeout(() => {
          initWS()
        }, 1000)
      }

      this.ws.onmessage = (ev) => {
        try {
          const { name, payload } = JSON.parse(ev.data)
          console.log('📩 WebSocket message received:', name, payload)

          const handlers = this.events.get(name)?.values()

          if (handlers) {
            for (const fn of handlers) fn(payload)
          } else {
            console.warn('⚠️ No handlers registered for event:', name)
          }
        } catch (e) {
          console.error(`❌ Error while parsing WebSocket message:`, ev.data, e)
        }
      }
    }

    initWS()
  }

  onEvent(event: string, handler: SocketHandler) {
    if (this.events.has(event)) {
      this.events.get(event)?.add(handler)
    } else {
      this.events.set(event, new Set([handler]))
    }
  }

  removeEvent(event: string, handler: SocketHandler) {
    const set = this.events.get(event)

    if (set) set.delete(handler)
  }
}

export const ws = new WS()

export default {
  install: (app: App) => {
    app.provide('socket', ws)
  }
}

export function useOnEvent(event: string, handler: SocketHandler) {
  const ws = inject<WS>('socket')

  if (ws) {
    ws.onEvent(event, handler)

    onBeforeUnmount(() => {
      ws.removeEvent(event, handler)
    })
  }
}
