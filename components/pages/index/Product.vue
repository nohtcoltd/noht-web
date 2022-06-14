<script lang="ts" setup>
import { computed } from '#app'
import TurnBox from '~/components/widgets/TurnBox.vue'
import useProduct from '~/composables/pages/index/useProduct'
import MainPanel from '~/components/pages/index/MainPanel.vue'
import DetailPanel from '~/components/pages/index/DetailPanel.vue'
import StaffPanel from '~/components/pages/index/StaffPanel.vue'
import getRetinaImageUrl from '~/assets/js/getRetinaImageUrl'
import useMediaQuery from '~/composables/useMediaQuery'
const { isRetina } = useMediaQuery()

type Background = {
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
    mainPanelBackground?: Background
    detailPanelBackground?: Background
    staffPanelBackground?: Background
    staffPanelColor?: string
  }>(),
  {
    staffPanelColor: '#fff',
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
  enter,
} = useProduct()

const backgroundStyle = computed(() => ({ color, imageUrl, position, size, repeat }: Background) => {
  return {
    backgroundColor: color || null,
    backgroundImage: imageUrl ? `-webkit-image-set(url(${imageUrl}) 1x, url(${getRetinaImageUrl(imageUrl)}) 2x)` : null,
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
    const { mainPanelBackground, detailPanelBackground, staffPanelBackground } = vm
    const imageUrls = [mainPanelBackground, detailPanelBackground, staffPanelBackground]
      .filter(({ imageUrl }) => !!imageUrl)
      .map(({ imageUrl }) => imageUrl)

    return {
      link: imageUrls.map((url) => ({
        rel: 'preload',
        href: url,
        as: 'image',
        imagesrcset: `${url} 1x, ${getRetinaImageUrl(url)} 2x`,
      })),
    }
  },
})
</script>

<template>
  <transition appear :css="false" @enter="enter">
    <TurnBox
      ref="$box"
      :current-face="currentFace"
      :faces="3"
      :duration="duration"
      :is-reversed="false"
      class="relative mt-[1em] w-full text-[length:clamp(10px,3vw,50px)] opacity-0 first:mt-0 mb:mt-[20px]"
      :class="[isRotating ? 'z-10' : 'z-0']"
      @start:rotation="startRotation"
      @complete:rotation="completeRotation"
    >
      <template #face-1>
        <div class="body cursor-pointer" @click="changeCurrentFace(2)" @pointerdown="handlePointerDown">
          <MainPanel :title="title" :caption="caption" :style="backgroundStyle(mainPanelBackground)">
            <slot name="main-panel" />
          </MainPanel>
        </div>
      </template>
      <template #face-2>
        <div class="body relative" @click="changeCurrentFace(3)" @pointerdown="handlePointerDown">
          <DetailPanel :style="backgroundStyle(detailPanelBackground)">
            <template #image>
              <slot name="detail-panel-image" />
            </template>
            <template #description>
              <slot name="detail-panel-description" />
            </template>
            <template #links>
              <slot name="detail-panel-links" />
            </template>
          </DetailPanel>
        </div>
      </template>
      <template #face-3>
        <div class="body" @click="changeCurrentFace(1)" @pointerdown="handlePointerDown">
          <StaffPanel
            :title="title"
            :style="{
              color: staffPanelColor,
              ...backgroundStyle(staffPanelBackground),
            }"
          >
            <slot name="staff-panel" />
          </StaffPanel>
        </div>
      </template>
    </TurnBox>
  </transition>
</template>

<style scoped>
.body {
  @apply h-[400px] max-h-[450px] min-h-[350px] w-full overflow-hidden rounded-[30px] mb:h-auto mb:max-h-[none] mb:min-h-0;
}
</style>
