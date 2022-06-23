<script setup lang="ts">
import SvgTwitter from '~/assets/svg/icon_twitter.svg?component'

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
    <SvgTwitter class="w-[length:max(1.6em,27px)]" />
  </a>
</template>
