<template>
  <div
    class="min-h-screen w-screen px-[40px] text-center text-[length:clamp(25px,8vw,40px)] font-semibold fl-col-nowrap fl-center-center-center"
    :style="{
      minHeight: '100dvh',
    }"
  >
    <n-link :to="{ name: 'index' }" class="mb-[1em]">
      <svg :is="require('assets/svg/logo_noht.svg?inline')" class="w-[max(80px,3em)] fill-[#aaa]" />
    </n-link>

    404 Not Found.
  </div>
</template>
