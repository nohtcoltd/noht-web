<script setup lang="ts">
import { ref, computed } from '@vue/composition-api'

const props = withDefaults(
  defineProps<{
    pages: number
    current: number
    duration: number
    perspective: number
    easing: string
    isAxisX: boolean
  }>(),
  {
    duration: 500,
    perspective: 500,
    easing: 'ease-out',
    isAxisX: true,
  },
)

const hoge = ref<number>(props.current)
const lastPage = ref<number>(1)
const isIncrement = computed(() => lastPage.value < props.current)

const translateValue = (el, isNext) => {
  const { clientWidth, clientHeight } = el
  const size = props.isAxisX ? clientHeight : clientWidth
  const zPosition = size / 2
  const flatPosition = isNext ? size / 2 : -size / 2

  if (props.isAxisX) {
    return `translate3d(0, ${flatPosition}px, ${zPosition}px)`
  }

  return `translate3d(${flatPosition}px, 0, ${zPosition}px)`
}

const rotateValue = (isNext) => {
  const deg = isNext ? -90 : 90

  if (props.isAxisX) {
    return `rotate3d(1, 0, 0, ${deg}deg)`
  }

  return `rotate3d(0, 1, 0, ${deg}deg)`
}

const enter = async (el, done) => {
  console.log(props.current > lastPage.value)
  console.log(isIncrement.value)
  await el.animate(
    {
      transform: [
        `${rotateValue(!isIncrement.value)} ${translateValue(el, !isIncrement.value)}`,
        `rotate3d(${props.isAxisX ? '1, 0' : '0, 1'}, 0, 0) translate3d(0, 0, 0px)`,
      ],
    },
    {
      duration: props.duration,
      easign: props.easign,
    },
  ).finished

  lastPage.value = props.current

  done()
}

const leave = async (el, done) => {
  el.style.position = 'absolute'
  el.style.width = '100%'

  await el.animate(
    {
      transform: [
        `rotate3d(1, 0, 0, 0) translate3d(0, 0, 0px)`,
        `${rotateValue(isIncrement.value)} ${translateValue(el, isIncrement.value)}`,
      ],
    },
    {
      duration: props.duration,
      easign: props.easign,
    },
  ).finished
  done()
}
</script>

<template>
  <div
    class="?bg-slate-50 relative"
    :style="{
      perspective: `${perspective}px`,
    }"
    @click="hoge = hoge + 1"
  >
    <transition :css="false" @enter="enter" @leave="leave">
      <div :key="`page-${current}`">
        <slot :name="`page-${current}`" />
      </div>
    </transition>
  </div>
</template>
