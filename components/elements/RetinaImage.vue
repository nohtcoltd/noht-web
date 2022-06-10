<script lang="ts" setup>
import { computed } from '#imports'
import getRetinaImageUrl from '~/assets/js/getRetinaImageUrl'

const props = defineProps<{
  src: string
}>()

const srcset = computed(() => {
  if (!props.src) {
    return ''
  }

  return `${props.src} 1x, ${getRetinaImageUrl(props.src)} 2x`
})
</script>

<template>
  <img class="retina-image" :srcset="srcset" />
</template>
