<script setup lang="ts">
import { ref, inject, useRoute } from '#app'
import ContactForm from '~/components/ContactForm.vue'
import { addCompleteForwardRotationHandle } from '~/composables/useTurnPage'
import CloseButton from '~/components/widgets/CloseButton.vue'
const route = useRoute()
const isThanksShown = ref(false)

const showThanks = () => (isThanksShown.value = true)
const hideThanks = () => (isThanksShown.value = false)

const addHandle = inject(addCompleteForwardRotationHandle)

addHandle(hideThanks)

const enter = ($el: HTMLElement, done: () => void) => {
  if (route.name !== 'contact') {
    done()
    return
  }

  $el.animate(
    {
      opacity: [0, 1],
    },
    {
      duration: 200,
    },
  ).finished

  done()
}
</script>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  layout: 'TurnPage',
})
</script>

<template>
  <article class="relative bg-white px-[3em] text-[length:clamp(25px,2.3vw,28px)] tablet:px-0">
    <transition appear :css="false" @enter="enter">
      <div
        v-if="isThanksShown"
        key="thanks"
        class="absolute top-0 left-0 right-0 m-auto h-[70vh] fl-col-nowrap fl-center-center-center mb:h-[50vh]"
      >
        <div class="text-[180%] font-semibold tracking-[.2em] font-poppins mb:text-[25px]">THANK YOU!</div>
        <div class="mt-[80px] pc:w-full pc:max-w-[80px]">
          <n-link :to="{ name: 'index' }">
            <close-button class="pc:min-w-full" />
          </n-link>
        </div>
      </div>
    </transition>

    <div v-show="!isThanksShown" class="fl-col-nowrap fl-center-center-center">
      <div class="text-[150%] font-semibold tracking-[.2em] font-poppins mb:text-[20px]">CONTACT</div>
      <contact-form class="mt-[2em] max-w-[800px] mb:mt-[1.5em] mb:max-w-[350px]" @sent="showThanks" />
    </div>
  </article>
</template>
