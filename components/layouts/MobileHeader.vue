<script setup lang="ts">
import MenuButton from '~/components/widgets/MenuButton.vue'
import useMediaQuery from '~/composables/useMediaQuery'
/*
  Firefoxのposition: stickyがうまく機能しないのでjsで追従。
  タッチデバイスはjsだとカクつくのでstickyにしてある。
*/

const route = useRoute()
const router = useRouter()
const isCurrentRoute = computed(() => (routeName) => route.name === routeName)
const scrollTop = ref(0)
const changeScrollTop = () => (scrollTop.value = globalThis.scrollY)

const redirectTo = async (routeName) => {
  if (isCurrentRoute.value('index')) {
    return
  }

  await router.push({ name: routeName })
}

onMounted(() => {
  globalThis.addEventListener('scroll', changeScrollTop, { passive: true })
  globalThis.addEventListener('resize', changeScrollTop, { passive: true })
})

onUnmounted(() => {
  globalThis.removeEventListener('scroll', changeScrollTop)
  globalThis.removeEventListener('resize', changeScrollTop)
})

const { isTouchDevice } = useMediaQuery()
</script>
<template>
  <header
    class="top-0 z-50 mb-[30px] w-full pc:hidden"
    :class="isTouchDevice ? 'sticky' : 'relative'"
    :style="{
      transform: isTouchDevice ? '' : `translateY(${scrollTop}px)`,
    }"
  >
    <div class="absolute top-0 left-1/2 h-full w-screen -translate-x-1/2 bg-white/80" />
    <div class="relative">
      <div class="mx-auto w-[clamp(80px,20vw,100px)] py-[clamp(15px,2vw,20px)] px-[10px]" @click="redirectTo('index')">
        <svg :is="require('assets/svg/logo_noht.svg?inline')" class="mx-auto" />
      </div>
      <MenuButton @click="$emit('click:menu', $event)" class="absolute right-0 top-0 bottom-0 m-auto ml-auto" />
    </div>
  </header>
</template>
