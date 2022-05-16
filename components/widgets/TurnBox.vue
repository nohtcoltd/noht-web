<script setup lang="ts">
import { ref, computed } from '@vue/composition-api'

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

const translation = computed(() => (el, isNext) => {
  const { clientWidth, clientHeight } = el
  const size = props.isAxisX ? clientHeight : clientWidth
  const positionZ = size / 2
  const position2d = isNext ? -size / 2 : size / 2

  if (props.isAxisX) {
    return `translate3d(0, ${position2d}px, ${positionZ}px)`
  }

  return `translate3d(${-position2d}px, 0, ${positionZ}px)`
})

const rotation = computed(() => (isNext) => {
  const deg = isNext ? 90 : -90

  if (props.isAxisX) {
    return `rotate3d(1, 0, 0, ${deg}deg)`
  }

  return `rotate3d(0, 1, 0, ${deg}deg)`
})

const enter = async (el, done) => {
  inAnimation.value = true
  el.style.position = 'relative'

  el.animate(
    {
      opacity: [0, 1],
    },
    {
      duration: props.duration * 0.3,
    },
  )
  await el.animate(
    {
      zIndex: [0, 10],
      transform: [
        `${rotation.value(!props.isReversed)} ${translation.value(el, !props.isReversed)}`,
        `rotate3d(${props.isAxisX ? '1, 0' : '0, 1'}, 0, 0) translate3d(0, 0, 0)`,
      ],
    },
    {
      duration: props.duration,
      easign: props.easign,
    },
  ).finished

  inAnimation.value = false
  last.value = props.value

  done()
}

const leave = async (el, done) => {
  el.style.position = 'absolute'
  el.style.width = '100%'

  await el.animate(
    {
      zIndex: [10, 0],
      transform: [
        `rotate3d(1, 0, 0, 0) translate3d(0, 0, 0)`,
        `${rotation.value(props.isReversed)} ${translation.value(el, props.isReversed)}`,
      ],
    },
    {
      duration: props.duration,
      easign: props.easign,
    },
  ).finished
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
    class="?bg-slate-50 relative"
    :style="{
      perspective: `${perspective}px`,
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
    <div v-if="inAnimation" class="absolute top-0 left-0 z-10 h-full w-full" />
  </div>
</template>
