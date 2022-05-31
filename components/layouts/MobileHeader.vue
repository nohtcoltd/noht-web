<script setup lang="ts">
import MenuButton from '~/components/widgets/MenuButton.vue'
import { useRoute, useRouter, computed } from '#app'
import useMediaQuery from '~/composables/useMediaQuery'

const route = useRoute()
const router = useRouter()
const isCurrentRoute = computed(() => (routeName) => route.name === routeName)

const props = withDefaults(
  defineProps<{
    isDisabled: boolean
    isSelectedDisabled: boolean
    isButtonRotationDisabled: boolean
  }>(),
  {
    isDisabled: false,
    isSelectedDisabled: false,
    isButtonRotationDisabled: false,
  },
)

const redirectTo = async (routeName) => {
  if (isCurrentRoute.value('index')) {
    return
  }

  await router.push({ name: routeName })
}

const { isTablet } = useMediaQuery()
</script>
<template>
  <header v-if="isTablet" class="s sticky top-0 z-50 mb-[50px] w-full bg-white/80">
    <div class="relative">
      <div class="mx-auto w-[clamp(90px,20vw,120px)] py-[20px] px-[10px]" @click="redirectTo('index')">
        <svg :is="require('assets/svg/logo.svg?inline')" class="mx-auto" />
      </div>
      <MenuButton @click="$emit('click:menu', $event)" class="absolute right-0 top-0 bottom-0 m-auto ml-auto" />
    </div>
  </header>
</template>
