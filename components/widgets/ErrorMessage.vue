<script setup lang="ts">
defineProps<{
  error?: string
}>()
</script>
<template>
  <div v-if="error" class="mt-[.3em] px-[.5em] text-[85%] font-semibold text-[#ec3232] mb:text-[10px]">{{ error }}</div>
</template>
