<script setup lang="ts">
import { useRoute, useRouter, computed } from '#imports'
import TurnButton from '~/components/layouts/TurnButton.vue'

const route = useRoute()
const router = useRouter()
const isCurrentRoute = computed(() => (routeName) => route.name === routeName)
const currentFace = computed(() => (routeName) => isCurrentRoute.value(routeName) ? 2 : 1)

const props = withDefaults(
  defineProps<{
    isRedirectionDisabled?: boolean
  }>(),
  {
    isRedirectionDisabled: false,
  },
)

const redirectTo = async (routeName) => {
  if (props.isRedirectionDisabled) {
    return
  }

  await router.push({ name: routeName })
}
</script>
<template>
  <div
    class="sticky top-0 z-10 h-screen pl-[2.6em] pr-[clamp(0px,calc(3vw-30px),1em)] fl-col-nowrap fl-center-stretch-stretch tablet:hidden"
  >
    <div @click="redirectTo('index')" :class="isCurrentRoute('index') ? '' : 'cursor-pointer my-hover:opacity-80'">
      <svg :is="require('assets/svg/logo_noht.svg?inline')" class="mx-auto max-w-[max(110px,3.5em)]" />
    </div>
    <TurnButton :current-face="currentFace('index')" class="mt-[2.5em]" @click="redirectTo('index')"
      >PRODUCTS</TurnButton
    >
    <TurnButton :current-face="currentFace('about')" class="mt-[.5em]" @click="redirectTo('about')">ABOUT</TurnButton>
    <TurnButton :current-face="currentFace('contact')" class="mt-[.5em]" @click="redirectTo('contact')"
      >CONTACT</TurnButton
    >
  </div>
</template>
