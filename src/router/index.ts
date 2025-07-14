import { createRouter, createWebHistory } from 'vue-router'
import ChatLayout from '@/components/chatting/ChatLayout.vue'

const routes = [
  {
    path: '/',
    name: 'Chat',
    component: ChatLayout,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
