<script lang="ts" setup>
import { computed } from '#app'

const props = defineProps<{
  src: string
}>()

const srcset = computed(() => {
  if (!props.src) {
    return ''
  }

  const retinaPath = props.src.replace(/(.*)\.(.*)$/g, '$1@2x.$2')

  return `${props.src} 1x, ${retinaPath} 2x`
})
</script>

<template>
  <img class="retina-image" :srcset="srcset" />
</template>
