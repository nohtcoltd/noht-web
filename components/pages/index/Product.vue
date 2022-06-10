<script lang="ts" setup>
import TurnBox from '~/components/widgets/TurnBox.vue'
import useProduct from '~/composables/pages/index/useProduct'
import ProductHeader from '~/components/pages/index/ProductHeader.vue'
import ProductDetail from '~/components/pages/index/ProductDetail.vue'
import ProductStaff from '~/components/pages/index/ProductStaff.vue'
withDefaults(
  defineProps<{
    title: string
    caption: string
    headerBg: string
    detailBg: string
    staffBg: string
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
</script>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  head: (vm) => {
    const { headerBg, detailBg, staffBg } = vm
    const imagePaths = [headerBg, detailBg, staffBg]
      .map((bg) => {
        const matches = bg.match(/^url\((.*?)\)$/)

        if (matches) {
          return matches[1]
        }

        return null
      })
      .filter((url) => url)

    return {
      link: imagePaths.map((path) => ({ rel: 'preload', href: path, as: 'image' })),
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
        <ProductHeader
          :title="title"
          :caption="caption"
          :style="{
            background: headerBg,
          }"
        >
          <slot name="header" />
        </ProductHeader>
      </div>
    </template>
    <template #face-2>
      <div class="body relative" @click="changeCurrentFace(3)" @pointerdown="handlePointerDown">
        <ProductDetail
          class="bg-cover bg-center bg-no-repeat"
          :style="{
            backgroundImage: detailBg,
          }"
        >
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
            background: staffBg,
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
