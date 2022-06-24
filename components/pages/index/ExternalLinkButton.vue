<script setup lang="ts">
import SvgGlobal from '~/assets/svg/icon_global.svg?component'
</script>
<template>
  <a
    target="_blank"
    rel="”noreferrer”"
    class="mr-[1em] select-none rounded-full bg-black px-[1.5em] py-[.5em] text-[length:max(14px,80%)] font-bold tracking-[.3em] text-white fl-row-nowrap fl-start-center-center font-poppins my-hover:opacity-80 mb:text-[13px] mb:tracking-[.1em]"
    @click.stop
  >
    <SvgGlobal class="mr-[.8em] w-[1.5em] fill-white mb:mr-[.5em]" />
    <slot
  /></a>
</template>
