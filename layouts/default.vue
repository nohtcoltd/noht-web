<script setup lang="ts">
import TurnBox from '~/components/widgets/TurnBox.vue'
import Index from '~/pages/index.vue'
import About from '~/pages/about/index.vue'
import Contact from '~/pages/contact/index.vue'
import useTurnPage from '~/composables/useTurnPage'
import PcNaviMenu from '~/components/layouts/PcNaviMenu.vue'
import PageWrapper from '~/components/layouts/PageWrapper.vue'
import CloseButton from '~/components/widgets/CloseButton.vue'
import MobileHeader from '../components/layouts/MobileHeader.vue'
import MobileNaviMenu from '~/components/layouts/MobileNaviMenu.vue'

const {
  $index,
  $about,
  $contact,
  $navi,
  isRotating,
  perspective,
  duration,
  isReversed,
  currentFace,
  startRotation,
  completeRotation,
  completeRotateForward,
  completeRotateBackward,
  openMobileNavi,
  closeMobileNavi,
} = useTurnPage()
</script>
<template>
  <article class="min-h-screen w-screen text-[length:clamp(15px,2.2vw,50px)] init-font-family">
    <div class="mx-auto w-full max-w-[1800px] fl-row-nowrap fl-start-stretch-stretch">
      <PcNaviMenu />
      <div class="relative z-0 flex-1 tablet:w-full">
        <TurnBox
          :current-face="currentFace"
          :is-axis-x="false"
          :faces="4"
          :is-reversed="isReversed"
          :duration="duration"
          :perspective="perspective"
          class="min-h-screen w-full"
          @start:rotation="startRotation"
          @complete:rotation="completeRotation"
          @complete:forward-rotation="completeRotateForward"
          @complete:backward-rotation="completeRotateBackward"
        >
          <template #face-1>
            <PageWrapper :is-rotating="isRotating">
              <MobileHeader @click:menu="openMobileNavi" />
              <index ref="$index" />
            </PageWrapper>
          </template>
          <template #face-2>
            <PageWrapper :is-rotating="isRotating">
              <MobileHeader @click:menu="openMobileNavi" />
              <about ref="$about" />
            </PageWrapper>
          </template>
          <template #face-3>
            <PageWrapper :is-rotating="isRotating">
              <MobileHeader @click:menu="openMobileNavi" />
              <contact ref="$contact" />
            </PageWrapper>
          </template>
          <template #face-4>
            <div
              class="mx-auto h-screen py-[50px] fl-col-nowrap fl-center-center-center"
              ref="$navi"
              :style="{
                maxHeight: '100dvh',
              }"
            >
              <MobileNaviMenu :is-redirection-disabled="isRotating" />
              <CloseButton @click="closeMobileNavi" class="mx-auto mt-[80px]" />
            </div>
          </template>
        </TurnBox>
      </div>
    </div>
  </article>
</template>
