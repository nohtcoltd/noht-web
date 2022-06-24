<script setup lang="ts">
defineProps<{
  title: string
}>()

useHead({
  link: [
    {
      rel: 'preload',
      href: '/images/bg_noht_pattern.png',
      as: 'image',
    },
  ],
})
</script>

<template>
  <div class="h-full w-full px-[5%] py-[3%] text-white mb:min-h-[30vw] mb:py-[40px] mb:px-[20px]">
    <div
      class="absolute top-0 left-0 h-full w-full opacity-[.15]"
      :style="{
        backgroundImage: 'url(/images/bg_noht_pattern.png)',
      }"
    />
    <div class="relative z-10 h-full fl-col-nowrap fl-start-center-center">
      <div
        class="mb-[1em] w-full text-[length:max(50%,22px)] font-semibold tracking-[.2em] fl-col-nowrap fl-start-end-end font-poppins mb:text-[16px]"
      >
        {{ title }}
        <div class="mt-[.4em] text-[70%] tracking-[.15em] mb:mt-0">STAFF</div>
      </div>
      <div class="flex-1 fl-col-nowrap fl-center-center-center">
        <slot />
      </div>
    </div>
  </div>
</template>
