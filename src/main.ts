import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import socket from '@/modules/socket'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(VueQueryPlugin)

// app.use(router)
app.use(socket)
app.mount('#app')
