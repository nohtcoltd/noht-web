<script setup lang="ts">
import { ref, computed, nextTick, watch, toRefs } from '#app'

type Face = number

const props = withDefaults(
  defineProps<{
    currentFace: Face
    faces: number
    duration?: number
    perspective?: number
    easing?: string
    isAxisX?: boolean
    isReversed?: boolean
  }>(),
  {
    duration: 500,
    perspective: 500,
    easing: 'ease-out',
    isAxisX: true,
    isReversed: false,
  },
)

const emits = defineEmits<{
  (e: 'start:rotation', prev: Face, next: Face): void
  (e: 'complete:rotation', prev: Face, next: Face): void
  (e: 'start:forward-rotation', prev: Face, next: Face): void
  (e: 'finish:forward-rotation', prev: Face, next: Face): void
  (e: 'complete:forward-rotation', prev: Face, next: Face): void
  (e: 'start:backward-rotation', prev: Face, next: Face): void
  (e: 'finish:backward-rotation', prev: Face, next: Face): void
  (e: 'complete:backward-rotation', prev: Face, next: Face): void
}>()

const isRotating = ref(false)
const isForward = ref(true)
const lastFace = ref<Face>(1)
const next = ref<Face>(null)
const prev = ref<Face>(null)

const $wrapper = ref<HTMLElement>(null)
const $box = ref<HTMLElement>(null)
const $prev = ref<HTMLElement>(null)
const $next = ref<HTMLElement>(null)

// XXX: nuxt bridgeのvue2でv-forのrefが廃止、vue3のref="関数"が未実装なため子要素からDOM取得
// vue3なら不要
const getFaceElement = computed(() => (face) => Array.from($box.value.children)[face - 1] as HTMLElement)

const wrapperAnimation = ref<Animation>(null)
const boxAnimation = ref<Animation>(null)
const prevAnimation = ref<Animation>(null)
const nextAnimation = ref<Animation>(null)

watch(toRefs(props).currentFace, async (newValue, oldValue) => {
  if (isRotating.value && newValue === prev.value && oldValue === next.value) {
    isForward.value = false
    emits('finish:forward-rotation', oldValue, newValue)
    emits('start:backward-rotation', newValue, oldValue)
    reverseAnimation()
    return
  }

  if (!isForward.value && oldValue === prev.value && newValue === next.value) {
    emits('finish:backward-rotation', oldValue, newValue)
    emits('start:forward-rotation', oldValue, newValue)
    isForward.value = true
    reverseAnimation()
    return
  }

  rotateBox(oldValue, newValue)
})

const animationOption = computed(() => ({
  duration: props.duration,
  easing: props.easing,
}))

const createPrev = async (face: Face) => {
  prev.value = face
  $prev.value = getFaceElement.value(face)

  const { clientWidth, clientHeight } = $prev.value

  $prev.value.style.position = 'absolute'
  $prev.value.style.width = `${clientWidth}px`
  $prev.value.style.height = `${clientHeight}px`

  prevAnimation.value = $prev.value.animate(
    [
      {
        opacity: 1,
        offset: 0,
      },
      {
        opacity: 1,
        offset: 0.5,
      },
      {
        opacity: 0,
        offset: 1,
      },
    ],
    animationOption.value,
  )

  return
}

const createNext = async (face: Face) => {
  next.value = face
  $next.value = getFaceElement.value(face)

  const { clientWidth, clientHeight } = $next.value
  await nextTick()

  const xPositionName = !props.isAxisX && props.isReversed ? 'right' : 'left'
  const yPositionName = props.isAxisX && !props.isReversed ? 'bottom' : 'top'
  const xPositionValue = props.isAxisX ? '0' : '100%'
  const yPositionValue = props.isAxisX ? '100%' : '0'

  const transform = `${props.isAxisX ? 'rotateX' : 'rotateY'}(${props.isReversed ? -90 : 90}deg)`
  const transformOrigin =
    (props.isAxisX && !props.isReversed) || (!props.isAxisX && props.isReversed) ? '100% 100%' : '0 0'

  $next.value.style.width = `${clientWidth}px`
  $next.value.style.height = `${clientHeight}px`
  $next.value.style.position = 'absolute'
  $next.value.style[xPositionName] = xPositionValue
  $next.value.style[yPositionName] = yPositionValue
  $next.value.style.transform = transform
  $next.value.style.transformOrigin = transformOrigin

  nextAnimation.value = $next.value.animate(
    [
      {
        opacity: 0,
        offset: 0,
      },
      {
        opacity: 1,
        offset: 0.5,
      },
      {
        opacity: 1,
        offset: 1,
      },
    ],
    animationOption.value,
  )

  nextAnimation.value.onfinish = () => {
    $next.value.style.opacity = ''
  }

  return
}

const rotateBox = async (prev: Face, next: Face) => {
  emits('start:rotation', prev, next)

  const prevWidth = $wrapper.value.clientWidth
  const prevHeight = $wrapper.value.clientHeight
  const prevSize = props.isAxisX ? prevHeight : prevWidth

  await createPrev(prev)
  await createNext(next)

  // スクロール位置確保のためwidth/heightを与えておく
  $wrapper.value.style.width = `${prevWidth}px`
  $wrapper.value.style.height = `${prevHeight}px`

  await nextTick()

  const nextWidth = $next.value.clientWidth
  const nextHeight = $next.value.clientHeight

  $box.value.style.position = 'absolute'
  $box.value.style.width = `${prevWidth}px`
  $box.value.style.height = `${prevHeight}px`

  const rotate = props.isReversed ? 90 : -90
  const adjustX = !props.isAxisX && props.isReversed ? nextWidth - prevWidth : 0
  const adjustY = props.isAxisX && !props.isReversed ? -(prevHeight - nextHeight) : 0
  const adjustZ = -prevSize / 2

  let adjust2d = adjustZ

  if ((!props.isAxisX && props.isReversed) || (props.isAxisX && !props.isReversed)) {
    adjust2d = -adjust2d
  }

  $prev.value.style.transform = `${$prev.value.style.transform} translateZ(${-adjustZ}px)`
  $next.value.style.transform = `${$next.value.style.transform} ${
    props.isAxisX ? 'translateY' : 'translateX'
  }(${adjust2d}px)`

  isRotating.value = true

  boxAnimation.value = $box.value.animate(
    [
      {
        transform: `translateX(0px) translateY(0px) translateZ(${adjustZ}px) rotate(0deg)`,
        offset: 0,
      },
      {
        transform: `
          translateX(${adjustX}px)
          translateY(${adjustY}px)
          translateZ(${adjustZ}px)
          ${props.isAxisX ? 'rotateX' : 'rotateY'}(${rotate}deg)
        `,

        offset: 1,
      },
    ],
    animationOption.value,
  )

  boxAnimation.value.onfinish = handleFinish

  wrapperAnimation.value = $wrapper.value.animate(
    {
      width: [`${prevWidth}px`, `${nextWidth}px`],
      height: [`${prevHeight}px`, `${nextHeight}px`],
    },
    animationOption.value,
  )

  return
}

const handleFinish = () => {
  $wrapper.value.style.width = ''
  $wrapper.value.style.height = ''

  $box.value.style.position = ''
  $box.value.style.transformOrigin = ''
  $box.value.style.width = ''
  $box.value.style.height = ''

  $next.value.style.width = ''
  $next.value.style.height = ''
  $next.value.style.position = ''
  $next.value.style.inset = ''
  $next.value.style.transform = ''
  $next.value.style.transformOrigin = ''

  $prev.value.style.width = ''
  $prev.value.style.height = ''
  $prev.value.style.position = ''
  $prev.value.style.transform = ''

  if (isForward.value) {
    emits('complete:forward-rotation', prev.value, next.value)
  } else {
    emits('complete:backward-rotation', prev.value, next.value)
  }

  emits('complete:rotation', prev.value, next.value)

  isForward.value = true
  isRotating.value = false
  boxAnimation.value = null
  wrapperAnimation.value = null

  lastFace.value = props.currentFace
  prev.value = null
  next.value = null
}

const reverseAnimation = () => {
  prevAnimation.value.reverse()
  nextAnimation.value.reverse()
  boxAnimation.value.reverse()
  wrapperAnimation.value.reverse()
}
</script>

<template>
  <div>
    <div ref="$wrapper" class="relative">
      <div
        :style="{
          perspective: `${perspective}px`,
        }"
        :class="isRotating ? 'absolute inset-0 mx-auto h-full w-full' : ''"
      >
        <div
          ref="$box"
          :style="{
            transformStyle: 'preserve-3d',
            transformBox: 'fill-box',
          }"
        >
          <div v-for="face in faces" :key="`face-${face}`">
            <div v-show="face === currentFace || prev === face || next === face">
              <client-only>
                <slot :name="`face-${face}`" />
              </client-only>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
