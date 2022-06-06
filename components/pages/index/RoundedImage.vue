<script lang="ts" setup>
import RetinaImage from '~/components/elements/RetinaImage.vue'

defineProps<{
  src: string
}>()
</script>

<template>
  <RetinaImage class="rounded-[30px] mb:rounded-[20px]" :src="src" />
</template>
