<script setup lang="ts">
import { ref, computed, nextTick } from '@vue/composition-api'

const props = withDefaults(
  defineProps<{
    value: number
    duration: number
    perspective: number
    easing: string
    isAxisX: boolean
    isReversed: boolean
  }>(),
  {
    duration: 500,
    perspective: 500,
    easing: 'ease-out',
    isAxisX: true,
    isReversed: false,
  },
)

const last = ref(1)
const inAnimation = ref(false)
const $container = ref<HTMLElement>(null)
const initialSize = ref<number>(null)
const size = computed(() => (el: HTMLElement) => props.isAxisX ? el.clientHeight : el.clientWidth)

const enter = async (el: HTMLElement, done) => {
  inAnimation.value = true

  const axisTranslate = props.isAxisX ? 'translateY' : 'translateX'
  const axisRotate = props.isAxisX ? 'rotateX' : 'rotateY'
  const enterSize = size.value(el)
  const enterZ = -enterSize / 2
  const enterDeg = props.isReversed ? -90 : 90
  const enterTranslate = props.isReversed ? -enterSize / 2 + initialSize.value : -enterSize / 2

  el.style.transform = `${axisTranslate}(${enterTranslate}px) translateZ(${enterZ}px) ${axisRotate}(${enterDeg}deg)`
  el.style.position = 'reactive'
  el.style.zIndex = '10'

  const boxOriginZ = props.isReversed ? size.value(el) / 2 - initialSize.value : -size.value(el) / 2
  const boxDeg = props.isReversed ? 90 : -90
  const boxOffset = props.isReversed ? -size.value(el) + initialSize.value : 0

  const anim = await $container.value.animate(
    {
      top: ['0px', `${boxOffset}px`],
      transformOrigin: [`50% 50% 0px`, `50% 50% ${boxOriginZ}px`],
      height: [`${initialSize.value}px`, `${size.value($container.value)}px`],
      transform: [`rotate(0)`, `${axisRotate}(${boxDeg}deg)`],
    },
    {
      duration: props.duration,
      easing: props.easing,
    },
  ).finished

  el.style.transform = ''

  inAnimation.value = false
  last.value = props.value

  done()
}

const leave = async (el, done) => {
  initialSize.value = size.value(el)

  el.style.position = 'absolute'
  el.style.zIndex = '0'

  if (props.isAxisX) {
    el.style.width = '100%'
  } else {
    el.style.height = '100%'
  }

  await new Promise((resolve) => setTimeout(resolve, props.duration))

  done()
}

const cancelEnter = (el, done) => {
  console.log('cancelEnter', el, done)
}

const cancelLeave = (el, done) => {
  console.log('cancelLeave', el, done)
}
</script>

<template>
  <div
    :style="{
      perspective: `${perspective}px`,
    }"
  >
    <div
      ref="$container"
      class="relative"
      :style="{
        transformStyle: 'preserve-3d',
      }"
    >
      <transition
        :css="false"
        @enter="enter"
        @leave="leave"
        @enter-cancelled="cancelEnter"
        @leave-cancelled="cancelLeave"
      >
        <div :key="`face-${value}`">
          <slot :name="`face-${value}`" />
        </div>
      </transition>
    </div>

    <div v-if="inAnimation" class="absolute top-0 left-0 z-10 h-full w-full" />
  </div>
</template>
