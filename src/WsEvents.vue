<script setup lang="ts">
import registerEvents from '@/modules/socket/events'
import { onMounted } from 'vue'

onMounted(() => {
  registerEvents()
})
</script>

<template>
  <div id="ws-events"></div>
</template>
