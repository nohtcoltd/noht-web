<script setup lang="ts">
import { useRoute, useRouter, computed, ref } from '#app'
import TurnButton from '~/components/layouts/TurnButton.vue'

const route = useRoute()
const router = useRouter()
const isCurrentRoute = computed(() => (routeName) => route.name === routeName)

const props = withDefaults(
  defineProps<{
    isDisabled: boolean
    isButtonRotationDisabled: boolean
  }>(),
  {
    isDisabled: false,
    isButtonRotationDisabled: false,
  },
)

const redirectTo = async (routeName) => {
  if (props.isDisabled) {
    return
  }

  await router.push({ name: routeName })
}
</script>
<template>
  <div class="t fl-col-nowrap fl-center-stretch-stretch">
    <div
      @click="redirectTo('index')"
      :disable="isCurrentRoute('index')"
      :class="isCurrentRoute('index') ? '' : 'cursor-pointer my-hover:opacity-80'"
    >
      <svg :is="require('assets/svg/logo.svg?inline')" class="mx-auto max-w-[max(120px,3.5em)]" />
    </div>
    <TurnButton
      :is-rotation-disabled="isButtonRotationDisabled"
      :is-rotated="isCurrentRoute('index')"
      class="mt-[2.5em]"
      @click="redirectTo('index')"
      >PRODUCTS</TurnButton
    >
    <TurnButton
      :is-rotation-disabled="isButtonRotationDisabled"
      :is-rotated="isCurrentRoute('about')"
      class="mt-[.5em]"
      @click="redirectTo('about')"
      >ABOUT</TurnButton
    >
    <TurnButton
      :is-rotation-disabled="isButtonRotationDisabled"
      :is-rotated="isCurrentRoute('contact')"
      class="mt-[.5em]"
      @click="redirectTo('contact')"
      >CONTACT</TurnButton
    >
  </div>
</template>
