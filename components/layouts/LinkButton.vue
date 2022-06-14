<script setup lang="ts">
import useMediaQuery from '~/composables/useMediaQuery'

withDefaults(
  defineProps<{
    isSelected: boolean
    isSelectable: boolean
  }>(),
  {
    isSelectable: true,
  },
)

const { isTouchDevice } = useMediaQuery()
</script>
<template>
  <div
    class="block w-full select-none rounded-full px-[30px] py-[15px] text-center text-[length:max(40%,13px)] font-semibold tracking-[.3em] font-poppins"
    :class="[
      isSelected ? 'bg-[#111] text-white' : 'text-[#111]',
      isSelectable && !isSelected ? 'cursor-pointer' : '',
      isSelectable && !isSelected && !isTouchDevice ? 'hover:bg-[#00000015]' : '',
    ]"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>
