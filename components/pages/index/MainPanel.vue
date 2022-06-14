<script setup lang="ts">
defineProps<{
  title: string
  caption: string
}>()

const { isSmallMobile } = useMediaQuery()
</script>

<template>
  <div
    class="mb: mb:h- relative h-full w-full px-[.8em] py-[.8em] font-semibold fl-col-nowrap fl-end-start-start font-poppins mb:min-h-[300px] mb:px-[15px] mb:py-[20px] mb-s:min-h-0"
    :style="{
      aspectRatio: isSmallMobile ? '21/13' : '',
    }"
  >
    <div class="pointer-events-none absolute left-0 top-0 z-0 h-full w-full select-none font-semibold">
      <slot />
    </div>
    <div class="relative z-10 text-[length:max(50%,22px)] mb:text-[15px]">
      <div class="tracking-[.25em] mb:tracking-[.15em]">{{ title }}</div>
      <div class="mt-[.5em] text-[60%] tracking-[.2em] mb:mt-0 mb:tracking-[.1em]">{{ caption }}</div>
    </div>
  </div>
</template>
