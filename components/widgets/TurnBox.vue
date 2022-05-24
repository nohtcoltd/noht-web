<script setup lang="ts">
import { ref, computed, nextTick, watch, toRefs, onMounted } from '#app'

type Face = number

// XXX: nuxt bridgeのvue2でv-forのrefが廃止、vue3のref="関数"が未実装なためDOM特定のためにidを降る
// vue3なら不要
const id = ref<number>()
onMounted(() => (id.value = Math.floor(Math.random() * 10000)))

const props = withDefaults(
  defineProps<{
    value: Face
    faces: number
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

const emits = defineEmits<{
  (e: 'update', value: Face): void
  (e: 'start:rotate', value: Face): void
  (e: 'finish:rotate', value: Face): void
}>()

const inAnimation = ref(false)
const lastValue = ref<Face>(1)
const next = ref<Face>(null)
const prev = ref<Face>(null)

const $wrapper = ref<HTMLElement>(null)
const $box = ref<HTMLElement>(null)
const $prev = ref<HTMLElement>(null)
const $next = ref<HTMLElement>(null)

const wrapperAnimation = ref<Animation>(null)
const boxAnimation = ref<Animation>(null)
const prevAnimation = ref<Animation>(null)
const nextAnimation = ref<Animation>(null)

watch(toRefs(props).value, async (newValue, oldValue) => {
  if (newValue === prev.value && oldValue === next.value) {
    reverseAnimation()
    return
  }

  rotateBox(oldValue, newValue)
})

const animationOption = computed(() => ({
  duration: props.duration,
  easing: props.easing,
}))

const createPrev = async (face) => {
  prev.value = face
  $prev.value = $wrapper.value.querySelector(`[data-face="${id.value}-${prev.value}"]`)

  const { clientWidth, clientHeight } = $prev.value
  // console.log('f', clientWidth, clientHeight)

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

const createNext = async (face) => {
  next.value = face
  $next.value = $wrapper.value.querySelector(`[data-face="${id.value}-${next.value}"]`)

  const { clientWidth, clientHeight } = $next.value

  await nextTick()

  const xPositionName = !props.isAxisX && props.isReversed ? 'right' : 'left'
  const yPositionName = props.isAxisX && !props.isReversed ? 'bottom' : 'top'
  const xPositionValue = props.isAxisX ? '0' : '100%'
  const yPositionValue = props.isAxisX ? '100%' : '0'

  const rotationName = props.isAxisX ? 'rotateX' : 'rotateY'
  const rotationValue = props.isReversed ? -90 : 90
  const transformValue = `${rotationName}(${rotationValue}deg)`
  const transformOriginValue =
    (props.isAxisX && !props.isReversed) || (!props.isAxisX && props.isReversed) ? '100% 100%' : '0 0'

  $next.value.style.width = `${clientWidth}px`
  $next.value.style.height = `${clientHeight}px`
  $next.value.style.position = 'absolute'
  $next.value.style[xPositionName] = xPositionValue
  $next.value.style[yPositionName] = yPositionValue
  $next.value.style.transform = transformValue
  $next.value.style.transformOrigin = transformOriginValue

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
  emits('start:rotate', props.value)
  const wrapperWidth = $wrapper.value.clientWidth
  const wrapperHeight = $wrapper.value.clientHeight
  const wrapperSize = props.isAxisX ? wrapperHeight : wrapperWidth

  await createPrev(prev)
  await createNext(next)

  await nextTick()

  const rotationName = props.isAxisX ? 'rotateX' : 'rotateY'
  const nextWidth = $next.value.clientWidth
  const nextHeight = $next.value.clientHeight
  const nextSize = props.isAxisX ? nextHeight : nextWidth

  $wrapper.value.style.width = `${wrapperWidth}px`
  $wrapper.value.style.height = `${wrapperHeight}px`

  $box.value.style.position = 'absolute'
  $box.value.style.width = `${wrapperWidth}px`
  $box.value.style.height = `${wrapperHeight}px`

  const offsetX = !props.isAxisX && props.isReversed ? nextWidth - wrapperWidth : 0
  const offsetY = props.isAxisX && !props.isReversed ? -(wrapperHeight - nextHeight) : 0

  inAnimation.value = true

  boxAnimation.value = $box.value.animate(
    {
      transformOrigin: [`50% 50% ${-nextSize / 2}px`, `50% 50% ${-wrapperSize / 2}px`],
      transform: [
        `translateX(${offsetX}px) translateY(${offsetY}px) ${rotationName}(${props.isReversed ? 90 : -90}deg)`,
      ],
    },
    animationOption.value,
  )

  boxAnimation.value.onfinish = handleFinish

  wrapperAnimation.value = $wrapper.value.animate(
    {
      width: [`${wrapperWidth}px`, `${nextWidth}px`],
      height: [`${wrapperHeight}px`, `${nextHeight}px`],
    },
    animationOption.value,
  )

  // setTimeout(() => {
  //   boxAnimation.value.pause()
  //   wrapperAnimation.value.pause()
  // }, props.duration - 500)

  return
}

const handleFinish = () => {
  inAnimation.value = false
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

  lastValue.value = props.value

  boxAnimation.value = null
  wrapperAnimation.value = null

  prev.value = null
  next.value = null

  emits('finish:rotate', props.value)
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
        :class="inAnimation ? 'absolute inset-0 mx-auto h-full w-full' : ''"
      >
        <div
          ref="$box"
          :style="{
            transformStyle: 'preserve-3d',
          }"
        >
          <div v-for="face in faces" :key="`face-${face}`" :data-face="`${id}-${face}`">
            <div v-show="face === value || prev === face || next === face">
              <slot :name="`face-${face}`" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
