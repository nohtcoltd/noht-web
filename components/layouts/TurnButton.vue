<script setup lang="ts">
import { ref } from '#app'
import TurnBox from '~/components/widgets/TurnBox.vue'

withDefaults(
  defineProps<{
    isRotated: boolean
    isRotationDisabled: boolean
  }>(),
  {
    isRotationDisabled: false,
  },
)
const inRotation = ref(false)

const startRotation = () => (inRotation.value = true)
const finishRotation = () => (inRotation.value = false)

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <TurnBox
    :faces="2"
    :value="isRotated ? 2 : 1"
    :is-axis-x="true"
    :is-reversed="!isRotated"
    :duration="isRotationDisabled ? 0 : 500"
    @start:rotate="startRotation"
    @finish:rotate="finishRotation"
  >
    <template #face-1>
      <div class="wrapper">
        <div
          @click="$emit('click')"
          class="button block text-[#111]"
          :class="inRotation ? '' : 'my-hover:bg-[#00000015]'"
        >
          <slot />
        </div>
      </div>
    </template>
    <template #face-2>
      <div class="wrapper">
        <div class="button bg-[#111] text-white">
          <slot />
        </div>
      </div>
    </template>
  </TurnBox>
</template>

<style scoped>
.wrapper {
  @apply py-[5px];
}
.button {
  @apply w-full select-none rounded-full px-[30px] py-[15px] text-center text-[length:max(40%,14px)] font-semibold tracking-[.3em] font-poppins;
}
</style>
