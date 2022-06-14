<script setup lang="ts">
defineProps<{ isRotating: boolean }>()
</script>
<template>
  <div
    class="min-h-full bg-white py-[120px] fl-col-nowrap fl-start-stretch-stretch pc:pl-[2em] tablet:mx-auto tablet:w-full tablet:px-[50px] tablet:pt-0 tablet:pb-[100px] mb:max-w-[700px] mb:px-[clamp(15px,calc(-7px+5vw),30px)]"
    :class="isRotating ? 'h-screen overflow-hidden' : ''"
  >
    <slot />
  </div>
</template>
