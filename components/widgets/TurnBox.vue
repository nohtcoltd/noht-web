<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted, watch, toRefs } from '@vue/composition-api'

type Face = number

const props = withDefaults(
  defineProps<{
    value: Face
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

const last = ref<Face>(1)
const tmpFront = ref<Face>(null)
const tmpSide = ref<Face>(null)
const inAnimation = computed(() => !!tmpSide.value)
const $tmpSide = ref<HTMLElement>(null)
const $tmpFront = ref<HTMLElement>(null)
const $wrapper = ref<HTMLElement>(null)
const $box = ref<HTMLElement>(null)
const boxSize = ref<{
  width: number
  height: number
}>(null)
const boxAnimate = ref<Animation>(null)
const wrapperAnimate = ref<Animation>(null)

onMounted(() => {
  window.addEventListener('resize', changeBoxSize)
  changeBoxSize()
})

onUnmounted(() => {
  window.removeEventListener('resize', changeBoxSize)
})

const refProps = toRefs(props)

watch(refProps.value, async (newValue, oldValue) => {
  if (inAnimation.value) {
    boxAnimate.value.reverse()
    wrapperAnimate.value.reverse()
    return
  }

  animateBox(oldValue, newValue)
})

const createSide = async (value) => {
  tmpSide.value = value
  await nextTick()
  const $el = $tmpSide.value
  const { clientWidth, clientHeight } = $el
  const sidePx = props.isAxisX ? clientHeight : clientWidth
  const xPositionName = !props.isAxisX && !props.isReversed ? 'right' : 'left'
  const yPositionName = props.isAxisX && props.isReversed ? 'bottom' : 'top'
  const translation2dName = props.isAxisX ? 'translateY' : 'translateX'
  let translation2dValue = sidePx / 2

  if ((!props.isReversed && props.isAxisX) || (props.isReversed && !props.isAxisX)) {
    translation2dValue = -translation2dValue
  }

  const translationZValue = -sidePx / 2
  const rotationName = props.isAxisX ? 'rotateX' : 'rotateY'
  const rotationValue = props.isReversed ? -90 : 90
  const transformValue = `${translation2dName}(${translation2dValue}px) translateZ(${translationZValue}px) ${rotationName}(${rotationValue}deg)`

  $el.style.position = 'absolute'
  $el.style[xPositionName] = '0'
  $el.style[yPositionName] = '0'
  $el.style.transform = transformValue
}

const createFront = async (value) => {
  tmpFront.value = value
  await nextTick()
  $tmpFront.value.style.position = 'absolute'
}

const animateBox = async (front: Face, side: Face) => {
  await createSide(side)
  createFront(front)

  const rotationName = props.isAxisX ? 'rotateX' : 'rotateY'
  const { clientWidth, clientHeight } = $tmpSide.value
  const transformOrigin = `50% 50% ${-(props.isAxisX ? boxSize.value.height : boxSize.value.width) / 2}px`

  $box.value.style.width = `${boxSize.value.width}px`
  $box.value.style.height = `${boxSize.value.height}px`
  $box.value.style.transformOrigin = transformOrigin

  let offSetLeft = (boxSize.value.width - clientWidth) / 2
  let offSetTop = (boxSize.value.height - clientHeight) / 2

  if (props.isAxisX && !props.isReversed) {
    offSetTop = -offSetTop
  }

  if (!props.isAxisX && props.isReversed) {
    offSetLeft = -offSetLeft
  }

  const options = {
    duration: props.duration,
    easing: props.easing,
  }

  boxAnimate.value = $box.value.animate(
    {
      left: ['0px', `${offSetLeft}px`],
      top: ['0px', `${offSetTop}px`],
      transform: [`${rotationName}(${props.isReversed ? 90 : -90}deg)`],
    },
    options,
  )

  wrapperAnimate.value = $wrapper.value.animate(
    {
      width: [`${boxSize.value.width}px`, `${clientWidth}px`],
      height: [`${boxSize.value.height}px`, `${clientHeight}px`],
    },
    options,
  )

  boxAnimate.value.onfinish = async () => {
    $wrapper.value.style.width = ''
    $wrapper.value.style.height = ''
    $box.value.style.transformOrigin = ''
    $box.value.style.transform = ''
    $box.value.style.width = ''
    $box.value.style.height = ''

    last.value = props.value

    boxAnimate.value = null
    wrapperAnimate.value = null

    tmpFront.value = null
    tmpSide.value = null
    $tmpFront.value = null
    $tmpSide.value = null

    await nextTick()
    changeBoxSize()
  }
}

const changeBoxSize = () =>
  (boxSize.value = {
    width: $box.value.clientWidth,
    height: $box.value.clientHeight,
  })
</script>

<template>
  <div ref="$wrapper" class="relative bg-[red] fl-col-nowrap fl-center-center-center">
    <div
      class="fl-col-nowrap fl-center-center-center"
      :class="isAxisX ? 'w-full' : ''"
      :style="{
        perspective: `${perspective}px`,
      }"
    >
      <div
        ref="$box"
        class="relative mx-auto"
        :class="isAxisX ? 'w-full' : ''"
        :style="{
          transformStyle: 'preserve-3d',
        }"
      >
        <div v-if="!inAnimation" :key="`face-${value}`" :class="isAxisX ? 'w-full' : ''" :data-face="value">
          <slot :name="`face-${value}`" />
        </div>
        <div
          v-if="tmpSide"
          :key="`tmp-side-${tmpSide}`"
          :class="isAxisX ? 'w-full' : ''"
          :data-tmp-side="value"
          ref="$tmpSide"
        >
          <slot :name="`face-${tmpSide}`" />
        </div>
        <div
          v-if="tmpFront"
          ref="$tmpFront"
          :key="`tmp-face-${tmpFront}`"
          :class="isAxisX ? 'w-full' : ''"
          :data-tmp-face="value"
        >
          <slot :name="`face-${tmpFront}`" />
        </div>
      </div>
    </div>

    <!-- <div v-if="inAnimation" class="absolute top-0 left-0 z-10 h-full w-full" /> -->
  </div>
</template>
