<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from '@vue/composition-api'
import { off } from 'process'

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
    duration: 5000,
    perspective: 500,
    easing: 'ease-out',
    isAxisX: true,
    isReversed: false,
  },
)

const last = ref(1)
const inAnimation = ref(false)
const $el = ref<HTMLElement>(null)
const $box = ref<HTMLElement>(null)
const boxSize = ref<{
  width: number
  height: number
}>(null)
const boxAnimate = ref<Animation>(null)
const elAnimate = ref<Animation>(null)

onMounted(() => {
  window.addEventListener('resize', changeBoxSize)
  changeBoxSize()
})

onUnmounted(() => {
  window.removeEventListener('resize', changeBoxSize)
})

const changeBoxSize = () =>
  (boxSize.value = {
    width: $box.value.clientWidth,
    height: $box.value.clientHeight,
  })

const enter = async (el: HTMLElement, done) => {
  inAnimation.value = true

  const { clientWidth, clientHeight } = el
  const enterPx = props.isAxisX ? clientHeight : clientWidth
  const xPositionName = !props.isAxisX && !props.isReversed ? 'right' : 'left'
  const yPositionName = props.isAxisX && props.isReversed ? 'bottom' : 'top'
  const translation2dName = props.isAxisX ? 'translateY' : 'translateX'
  let translation2dValue = enterPx / 2

  if ((!props.isReversed && props.isAxisX) || (props.isReversed && !props.isAxisX)) {
    translation2dValue = -translation2dValue
  }

  const translationZValue = -enterPx / 2
  const rotationName = props.isAxisX ? 'rotateX' : 'rotateY'
  const rotationValue = props.isReversed ? -90 : 90
  const transformValue = `${translation2dName}(${translation2dValue}px) translateZ(${translationZValue}px) ${rotationName}(${rotationValue}deg)`
  const transformOrigin = `50% 50% ${-(props.isAxisX ? boxSize.value.height : boxSize.value.width) / 2}px`

  el.style.position = 'absolute'
  el.style[xPositionName] = '0'
  el.style[yPositionName] = '0'
  el.style.transform = transformValue

  $box.value.style.transformOrigin = transformOrigin
  $box.value.style.width = `${boxSize.value.width}px`
  $box.value.style.height = `${boxSize.value.height}px`

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

  elAnimate.value = $el.value.animate(
    {
      width: [`${boxSize.value.width}px`, `${clientWidth}px`],
      height: [`${boxSize.value.height}px`, `${clientHeight}px`],
    },
    options,
  )
  await Promise.all([elAnimate.value.finished, boxAnimate.value.finished])

  el.style.position = ''
  el.style[xPositionName] = ''
  el.style[yPositionName] = ''
  el.style.transform = ''

  $el.value.style.width = ''
  $el.value.style.height = ''
  $box.value.style.transformOrigin = ''
  $box.value.style.transform = ''
  $box.value.style.width = ''
  $box.value.style.height = ''

  changeBoxSize()

  inAnimation.value = false
  last.value = props.value
  console.log('done')

  boxAnimate.value = null
  elAnimate.value = null
  done()
}

const leave = async (el, done) => {
  el.style.position = 'absolute'

  await new Promise((resolve) => setTimeout(resolve, props.duration - 30))

  done()
}
</script>

<template>
  <div ref="$el" class="relative fl-col-nowrap fl-center-center-center">
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
        <transition :css="false" @enter="enter" @leave="leave">
          <div :key="`face-${value}`" :class="isAxisX ? 'w-full' : ''">
            <slot :name="`face-${value}`" />
          </div>
        </transition>
      </div>
    </div>

    <div v-if="inAnimation" class="absolute top-0 left-0 z-10 h-full w-full" />
  </div>
</template>
