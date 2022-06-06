<script setup lang="ts">
import TurnBox from '~/components/widgets/TurnBox.vue'
import Index from '~/pages/index.vue'
import Abount from '~/pages/about/index.vue'
import Contact from '~/pages/contact/index.vue'
import useTurnPage from '~/composables/useTurnPage'
import useMediaQuery from '~/composables/useMediaQuery'
import NaviMenu from '~/components/layouts/NaviMenu.vue'
import PageWrapper from '~/components/layouts/PageWrapper.vue'
import CloseButton from '~/components/widgets/CloseButton.vue'
import MobileHeader from '../components/layouts/MobileHeader.vue'

const {
  $el,
  $index,
  $about,
  $contact,
  isRotating,
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
  <article
    class="h-screen w-screen overflow-x-hidden overflow-y-scroll text-[length:clamp(15px,2.2vw,50px)] init-font-family"
    ref="$el"
  >
    <div class="mx-auto w-full max-w-[1800px] fl-row-nowrap fl-start-stretch-stretch">
      <NaviMenu v-if="!isTablet" class="sticky top-[30%] z-10 h-full pl-[2.6em] pr-[1em]" />
      <div class="relative z-0 flex-1 tablet:w-full">
        <TurnBox
          :is-axis-x="false"
          :faces="4"
          :value="currentFace"
          :is-reversed="isReversed"
          :duration="duration * 1"
          :perspective="5000"
          class="w-full"
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
              <abount ref="$about" />
            </PageWrapper>
          </template>
          <template #face-3>
            <PageWrapper :is-rotating="isRotating">
              <MobileHeader @click:menu="openMobileNavi" />
              <contact ref="$contact" />
            </PageWrapper>
          </template>
          <template #face-4>
            <PageWrapper :is-rotating="isRotating" class="fl-col-nowrap fl-center-center-center">
              <div class="max-w-[300px] py-[80px]" ref="$navi">
                <NaviMenu :is-redirection-disabled="isRotating" :is-button-rotation-disabled="true" />
                <CloseButton @click="closeMobileNavi" class="mx-auto mt-[80px]" />
              </div>
            </PageWrapper>
          </template>
        </TurnBox>
      </div>
    </div>
  </article>
</template>
