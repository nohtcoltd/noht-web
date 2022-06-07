<script setup lang="ts">
import ContactForm from '~/components/ContactForm.vue'
</script>
<template>
  <article
    class="bg-white px-[3em] text-[length:clamp(20px,2.3vw,28px)] fl-col-nowrap fl-start-center-center tablet:px-0"
  >
    <div class="text-[150%] font-semibold tracking-[.2em] font-poppins mb:text-[20px]">CONTACT</div>
    <contact-form class="mt-[2em] max-w-[800px] mb:mt-[1.5em] mb:max-w-[350px]" />
  </article>
</template>
