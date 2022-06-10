<script setup lang="ts">
import Secondpress from '~/components/pages/index/products/Secondpress.vue'
import Holda from '~/components/pages/index/products/Holda.vue'
import BanananaEffects from '~/components/pages/index/products/BanananaEffects.vue'
import Pictoclub from '~/components/pages/index/products/Pictoclub.vue'
</script>

<script lang="ts">
import { defineNuxtComponent } from '#app'

export default defineNuxtComponent({
  layout: 'TurnPage',
})
</script>

<template>
  <article class="w-full bg-white pr-[3vw] text-sm fl-col-nowrap fl-start-center-center tablet:px-0 tablet:py-0">
    <div class="w-full max-w-[1200px] fl-col-nowrap fl-start-center-center">
      <Holda />
      <Secondpress />
      <BanananaEffects />
      <Pictoclub />
    </div>
  </article>
</template>
