<script setup lang="ts">
defineProps<{
  name: string
  jobTitle: string | string[]
}>()
</script>

<template>
  <div
    class="text-center font-semibold leading-[1.3] tracking-[.1em] fl-col-nowrap fl-start-center-center font-poppins"
  >
    <div class="tracking-[.2em]">{{ name }}</div>
    <div class="mt-[.5em] text-[60%] fl-col-nowrap fl-start-center-center word-break mb:text-[80%]">
      <template v-if="Array.isArray(jobTitle)">
        <span v-for="(str, index) in jobTitle" :key="`key-${index}`"> {{ str }}</span>
      </template>
      <template v-else>
        {{ jobTitle }}
      </template>
    </div>
  </div>
</template>
