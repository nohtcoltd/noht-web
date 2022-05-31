<template>
  <button class="block w-[20vw] max-w-[60px] p-1 my-hover:opacity-70" @click="$emit('click', $event)">
    <div class="pointer-events-none relative aspect-square w-full">
      <div
        v-for="num in 2"
        :key="`key-${num}`"
        class="absolute inset-0 m-auto h-px w-full bg-black"
        :class="num === 1 ? 'rotate-45' : '-rotate-45'"
      />
    </div>
  </button>
</template>
