<script lang="ts" setup>
import TurnBox from '~/components/widgets/TurnBox.vue'
import useProduct from '~/composables/pages/index/useProduct'
import MainPanel from '~/components/pages/index/MainPanel.vue'
import DetailPanel from '~/components/pages/index/DetailPanel.vue'
import StaffPanel from '~/components/pages/index/StaffPanel.vue'
import getRetinaImageUrl from '~/assets/js/getRetinaImageUrl'

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
  isMounted,
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

<template>
  <transition :css="false" @enter="enter">
    <TurnBox
      v-if="isMounted"
      ref="$box"
      :current-face="currentFace"
      :faces="3"
      easing="cubic-bezier(0.215, 0.61, 0.355, 1)"
      :duration="duration"
      :is-reversed="false"
      class="relative mt-[1em] w-full text-[length:clamp(10px,3vw,50px)] opacity-0 first:mt-0 mb:mt-[clamp(15px,calc(-7px+5vw),30px)]"
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
  @apply h-[400px] max-h-[450px] min-h-[350px] w-full overflow-hidden rounded-[30px] mb:h-auto mb:max-h-[none] mb:min-h-0 mb:rounded-[clamp(20px,3vw,30px)];
}
</style>
