<template>
  <a
    target="_blank"
    rel="”noreferrer”"
    class="mr-[1em] select-none rounded-full bg-black px-[1.5em] py-[.5em] text-[length:max(15px,90%)] font-bold tracking-[.3em] text-white fl-row-nowrap fl-start-center-center font-poppins my-hover:opacity-80 mb:text-[13px] mb:tracking-[.1em]"
    @click.stop
  >
    <svg :is="require('assets/svg/icon_global.svg?inline')" class="mr-[.8em] w-[1.5em] fill-white mb:mr-[.5em]"></svg>
    <slot
  /></a>
</template>
