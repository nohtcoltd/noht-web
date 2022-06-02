<template>
  <button class="block w-[10vw] max-w-[35px] p-1 my-hover:opacity-70" @click="$emit('click', $event)">
    <div class="pointer-events-none relative aspect-square w-full">
      <div
        v-for="num in 3"
        :key="`key-${num}`"
        class="absolute left-0 h-px w-full bg-black"
        :class="num === 3 ? 'bottom-[15%]' : num === 2 ? 'top-[15%]' : 'top-0 bottom-0 my-auto'"
      />
    </div>
  </button>
</template>
