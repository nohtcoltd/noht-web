<script lang="ts" setup>
import { computed } from '#app'
import TurnBox from '~/components/widgets/TurnBox.vue'
import useProduct from '~/composables/pages/index/useProduct'
import ProductHeader from '~/components/pages/index/ProductHeader.vue'
import ProductDetail from '~/components/pages/index/ProductDetail.vue'
import ProductStaff from '~/components/pages/index/ProductStaff.vue'
import useMediaQuery from '~/composables/useMediaQuery'

const { isRetina } = useMediaQuery()
type Bg = {
  color?: string
  imageUrl?: string
  position?: string
  size?: string
  repeat?: string
}

withDefaults(
  defineProps<{
    title: string
    caption: string
    headerBg?: Bg
    detailBg?: Bg
    staffBg?: Bg
    staffColor?: string
  }>(),
  {
    staffColor: '#fff',
  },
)

const {
  $box,
  currentFace,
  duration,
  isRotating,
  changeCurrentFace,
  startRotation,
  completeRotation,
  handlePointerDown,
} = useProduct()

const bgStyle = computed(() => ({ color, imageUrl, position, size, repeat }: Bg) => {
  return {
    backgroundColor: color || null,
    backgroundImage: imageUrl
      ? `url(
      ${isRetina ? imageUrl.replace(/(.*)\.(.*)$/g, '$1@2x.$2') : imageUrl}
    )`
      : null,
    backgroundPosition: position || 'center',
    backgroundSize: size || 'cover',
    backgroundRepeat: repeat || 'no-repeat',
  }
})
</script>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  head: (vm) => {
    const { headerBg, detailBg, staffBg } = vm
    const imageUrls = [headerBg, detailBg, staffBg].map(({ imageUrl }) => imageUrl).filter((url) => !!url)
    return {
      link: imageUrls.map((path) => ({ rel: 'preload', href: path, as: 'image' })),
    }
  },
})
</script>

<template>
  <TurnBox
    ref="$box"
    :current-face="currentFace"
    :faces="3"
    :duration="duration"
    :is-reversed="false"
    class="relative mt-[1em] w-full text-[length:clamp(10px,3vw,50px)] first:mt-0 mb:mt-[20px]"
    :class="isRotating ? 'z-10' : 'z-0'"
    @start:rotation="startRotation"
    @complete:rotation="completeRotation"
  >
    <template #face-1>
      <div class="body cursor-pointer" @click="changeCurrentFace(2)" @pointerdown="handlePointerDown">
        <ProductHeader :title="title" :caption="caption" :style="bgStyle(headerBg)">
          <slot name="header" />
        </ProductHeader>
      </div>
    </template>
    <template #face-2>
      <div class="body relative" @click="changeCurrentFace(3)" @pointerdown="handlePointerDown">
        <ProductDetail :style="bgStyle(detailBg)">
          <template #image>
            <slot name="detail-image" />
          </template>
          <template #description>
            <slot name="detail-description" />
          </template>
          <template #links>
            <slot name="detail-links" />
          </template>
        </ProductDetail>
      </div>
    </template>
    <template #face-3>
      <div class="body" @click="changeCurrentFace(1)" @pointerdown="handlePointerDown">
        <ProductStaff
          :title="title"
          :style="{
            color: staffColor,
            ...bgStyle(staffBg),
          }"
        >
          <slot name="staff" />
        </ProductStaff>
      </div>
    </template>
  </TurnBox>
</template>

<style scoped>
.body {
  @apply h-[400px] max-h-[450px] min-h-[350px] w-full overflow-hidden rounded-[30px] mb:h-auto mb:max-h-[none] mb:min-h-0;
}
</style>
