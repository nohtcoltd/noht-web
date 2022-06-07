<script setup lang="ts">
defineProps<{
  href?: string
}>()
</script>

<template>
  <a
    target="_blank"
    rel="”noreferrer”"
    :href="href"
    class="ml-[.7em] select-none"
    :class="!href ? 'pointer-events-none cursor-default' : 'my-hover:opacity-80'"
    @click.stop
  >
    <svg :is="require('assets/svg/icon_twitter.svg?inline')" class="w-[length:max(1.8em,30px)]"></svg>
  </a>
</template>
