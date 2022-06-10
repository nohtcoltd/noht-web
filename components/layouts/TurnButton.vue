<script setup lang="ts">
import { ref } from '#imports'
import TurnBox from '~/components/widgets/TurnBox.vue'
import LinkButton from '~/components/layouts/LinkButton.vue'

defineProps<{
  currentFace: number
}>()

const isRotating = ref(false)

const startRotation = () => (isRotating.value = true)
const completeRotation = () => (isRotating.value = false)
</script>

<template>
  <div v-bind="$attrs">
    <TurnBox
      :current-face="currentFace"
      :faces="2"
      :is-axis-x="true"
      :is-reversed="currentFace === 2"
      @start:rotation="startRotation"
      @complete:rotation="completeRotation"
    >
      <template #face-1>
        <div class="py-[5px]">
          <LinkButton :is-selected="false" :is-selectable="!isRotating"><slot /></LinkButton>
        </div>
      </template>
      <template #face-2>
        <div class="py-[5px]">
          <LinkButton :is-selected="true"><slot /></LinkButton>
        </div>
      </template>
    </TurnBox>
  </div>
</template>
