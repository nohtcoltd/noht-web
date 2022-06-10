<script setup lang="ts">
import { Route } from 'vue-router'
import { useRoute, useRouter, computed, ref, ComponentInstance, onMounted, onBeforeUnmount } from '#app'
import LinkButton from '~/components/layouts/LinkButton.vue'

const props = withDefaults(
  defineProps<{
    isRedirectionDisabled: boolean
  }>(),
  {
    isRedirectionDisabled: false,
  },
)

type RouteName = Route['name']
const route = useRoute()
const router = useRouter()
const $index = ref<ComponentInstance>(null)
const $about = ref<ComponentInstance>(null)
const $contact = ref<ComponentInstance>(null)
const routeToRouteButton = computed(() => ({
  index: $index.value,
  about: $about.value,
  contact: $contact.value,
}))

const isWindowSwiping = ref(false)
const isRouteSelecting = ref(false)
const activeRoute = ref<RouteName>(null)

const isSelectedRoute = computed(() => (routeName: RouteName) => {
  if (activeRoute.value) {
    return activeRoute.value === routeName
  }

  if (isRouteSelecting.value) {
    return false
  }

  return routeName === route.name
})

const buttonStyle = computed(() => (routeName: RouteName) => {
  if (isRouteSelecting && isCurrentRoute.value(routeName) && !isSelectedRoute.value(routeName)) {
    return {
      backgroundColor: '#00000015',
    }
  }
  return {}
})

const isCurrentRoute = computed(() => (routeName) => route.name === routeName)

const redirectTo = async (routeName: RouteName) => {
  if (props.isRedirectionDisabled) {
    return
  }

  router.push({ name: routeName })
}

const activateRoute = (routeName: RouteName) => {
  isRouteSelecting.value = true
  activeRoute.value = routeName
}

const deactivateRoute = (routeName: RouteName) => {
  if (routeName !== activeRoute.value) {
    return
  }

  activeRoute.value = null
}

const startSwiping = () => (isWindowSwiping.value = true)
const endSwiping = () => {
  isWindowSwiping.value = false
  isRouteSelecting.value = false

  activeRoute.value && redirectTo(activeRoute.value)
}

onMounted(() => {
  globalThis.addEventListener('pointerdown', startSwiping, { passive: true })
  globalThis.addEventListener('touchend', endSwiping, { passive: true })
  globalThis.addEventListener('mouseup', endSwiping, { passive: true })

  Object.keys(routeToRouteButton.value).forEach((routeName) => {
    globalThis.addEventListener('mousemove', (evt) => handlePointermove(evt, routeName), { passive: true })
    globalThis.addEventListener('touchmove', (evt) => handlePointermove(evt, routeName), { passive: true })
  })
})

onBeforeUnmount(() => {
  globalThis.removeEventListener('pointerdown', startSwiping)
  globalThis.removeEventListener('touchend', endSwiping)
  globalThis.removeEventListener('mouseup', endSwiping)

  Object.keys(routeToRouteButton.value).forEach((routeName) => {
    globalThis.removeEventListener('mousemove', (evt) => handlePointermove(evt, routeName))
    globalThis.removeEventListener('touchmove', (evt) => handlePointermove(evt, routeName))
  })
})

const handlePointermove = (evt: TouchEvent | MouseEvent, routeName: RouteName) => {
  if (!isWindowSwiping.value) {
    return
  }

  const { clientX, clientY } = evt instanceof TouchEvent ? evt.touches[0] : evt
  const { $el } = routeToRouteButton.value[routeName]
  const target = globalThis.document.elementFromPoint(clientX, clientY)

  if ($el.contains(target)) {
    activateRoute(routeName)
  } else {
    deactivateRoute(routeName)
  }
}
</script>

<template>
  <div class="fl-col-nowrap fl-center-stretch-stretch">
    <svg :is="require('assets/svg/logo_noht.svg?inline')" class="mx-auto max-w-[max(120px,3.5em)]" />
    <LinkButton
      ref="$index"
      :is-selected="isSelectedRoute('index')"
      class="mt-[50px]"
      @pointerdown="activateRoute('index')"
      :style="buttonStyle('index')"
    >
      PRODUCTS
    </LinkButton>
    <LinkButton
      ref="$about"
      :is-selected="isSelectedRoute('about')"
      class="mt-[15px]"
      @pointerdown="activateRoute('about')"
      :style="buttonStyle('about')"
    >
      ABOUT
    </LinkButton>
    <LinkButton
      ref="$contact"
      :is-selected="isSelectedRoute('contact')"
      class="mt-[15px]"
      @pointerdown="activateRoute('contact')"
      :style="buttonStyle('contact')"
    >
      CONTACT
    </LinkButton>
  </div>
</template>
