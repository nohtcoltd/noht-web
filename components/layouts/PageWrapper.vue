<script setup lang="ts">
defineProps<{ isRotating: boolean }>()
</script>
<template>
  <div
    class="bg-white py-[120px] pc:pl-[2em] tablet:mx-auto tablet:w-full tablet:max-w-[800px] tablet:px-[50px] tablet:pt-0 tablet:pb-[100px] mb:max-w-[500px] mb:px-[15px]"
    :class="isRotating ? 'overflow-hidden h-screen' : ''"
  >
    <slot />
  </div>
</template>
