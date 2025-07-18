<template>
  <div ref="container" class="overflow-auto">
    <slot></slot>
    <slot name="empty"></slot>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { onMounted } from 'vue'

const props = defineProps({
  triggerLoad: {
    required: true,
    type: Function
  },
  reverse: {
    type: Boolean,
    default: false
  },
  threshold: {
    default: 100,
    type: Number
  }
})

const container = ref<HTMLDivElement | null>(null)

function hasReachedEnd(element: HTMLElement) {
  if (props.reverse) {
    return element.scrollHeight - element.clientHeight + element.scrollTop <= props.threshold
  } else {
    return element.scrollHeight - element.clientHeight - element.scrollTop <= props.threshold
  }
}


onMounted(() => {
  if (!container.value) {
    return
  }

  const div = container.value

  div.addEventListener('scroll', (e: Event) => {
    const element = e.target as HTMLElement

    if (hasReachedEnd(element)) {
      props.triggerLoad()
    }
  })
})

</script>

