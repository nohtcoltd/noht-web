<script setup lang="ts">
import { ref, inject } from '#app'
import ContactForm from '~/components/ContactForm.vue'
import { addCompleteForwardRotationHandle } from '~/composables/useTurnPage'

const isThanksShown = ref(false)

const showThanks = () => (isThanksShown.value = true)
const hideThanks = () => (isThanksShown.value = false)

const addHandle = inject(addCompleteForwardRotationHandle)

addHandle(hideThanks)
</script>
<template>
  <article class="bg-white px-[3em] text-[length:clamp(20px,2.3vw,28px)] tablet:px-0">
    <div v-if="isThanksShown">THANKS</div>
    <div v-else class="fl-col-nowrap fl-start-center-center">
      <div class="text-[150%] font-semibold tracking-[.2em] font-poppins mb:text-[20px]">CONTACT</div>
      <contact-form class="mt-[2em] max-w-[800px] mb:mt-[1.5em] mb:max-w-[350px]" @sent="showThanks" />
    </div>
  </article>
</template>
