<script setup lang="ts">
import { ref } from '#app'
import TurnBox from '~/components/widgets/TurnBox.vue'

const face = ref(1)
const incre = () => (face.value = face.value === 3 ? 1 : face.value + 1)
const decre = () => (face.value = face.value === 1 ? 3 : face.value - 1)

const shown = {
  1: true,
  2: true,
  3: true,
  4: true,
}
</script>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  layout: 'empty',
})
</script>

<template>
  <div class="min-h-screen w-full bg-slate-300 py-32 px-10 fl-col-nowrap fl-start-center-center">
    <div class="mb-20">
      <div
        class="relative"
        :style="{
          perspective: '200px',
        }"
      >
        <div
          :style="{
            transformStyle: 'preserve-3d',
            // transform: 'rotateY(45deg)',
          }"
        >
          <div class="bgred-400 h-[230px] w-[300px] opacity-60"></div>
          <div
            data-not-rev
            class="absolute h-[200px] w-[250px] bg-blue-400 opacity-60"
            :style="{
              top: '0',
              left: '300px',
              transform: 'rotateY(90deg)',
              transformOrigin: '0 0',
            }"
          >
            hoge
          </div>
          <div
            data-rev
            class="absolute h-[200px] w-[250px] bg-blue-400 opacity-60"
            :style="{
              top: '0',
              right: '300px',
              transform: 'rotateY(-90deg)',
              transformOrigin: '100% 100%',
            }"
          >
            hoge
          </div>
          <div
            data-not-rev
            class="absolute h-[200px] w-[250px] bg-blue-400 opacity-60"
            :style="{
              bottom: '230px',
              left: '0',
              transform: 'rotateX(90deg)',
              transformOrigin: '100% 100%',
            }"
          >
            hoge
          </div>
          <div
            data-rev
            class="absolute h-[200px] w-[250px] bg-blue-400 opacity-60"
            :style="{
              top: '230px',
              left: '0',
              transform: 'rotateX(-90deg)',
              transformOrigin: '0 0',
            }"
          >
            hoge
          </div>
        </div>
      </div>
    </div>
    <div class="mb-14 fl-row-nowrap fl-center-center-center">
      <div class="bg-slate-500 p-4" @click="incre">+</div>
      <div class="bg-slate-200 p-4" @click="decre">-</div>
    </div>
    <div class="fl-row-nowrap fl-center-center-center">
      <TurnBox v-if="shown[1]" :faces="3" :value="face" :is-axis-x="false" class="bg-[red]" :duration="1000">
        <template #face-1>
          <div
            class="h-[50px] w-[80px] bg-black text-white opacity-50 fl-col-nowrap fl-center-center-center"
            @click="face = 2"
          >
            HOGE1
          </div>
        </template>
        <template #face-2>
          <div
            class="h-[100px] w-[120px] bg-[gray] text-white opacity-50 fl-col-nowrap fl-center-center-center"
            @click="face = 3"
          >
            HUGA2
          </div>
        </template>
        <template #face-3>
          <div
            class="h-[180px] w-[100px] bg-[green] text-white opacity-50 fl-col-nowrap fl-center-center-center"
            @click="face = 1"
          >
            HUGA3
          </div>
        </template>
      </TurnBox>
      <TurnBox
        v-if="shown[2]"
        :faces="3"
        :value="face"
        :is-axis-x="false"
        :is-reversed="true"
        class="ml-24 bg-[red]"
        :duration="1000"
      >
        <template #face-1>
          <div
            class="h-[30px] w-[80px] bg-black text-white opacity-50 fl-col-nowrap fl-center-center-center"
            @click="face = 2"
          >
            HOGE1
          </div>
        </template>
        <template #face-2>
          <div
            class="h-[134px] w-[160px] bg-[gray] text-white opacity-50 fl-col-nowrap fl-center-center-center"
            @click="face = 3"
          >
            HUGA2
          </div>
        </template>
        <template #face-3>
          <div
            class="h-[180px] w-[100px] bg-[green] text-white opacity-50 fl-col-nowrap fl-center-center-center"
            @click="face = 1"
          >
            HUGA3
          </div>
        </template>
      </TurnBox>
    </div>
    <div class="mt-[100px] fl-row-nowrap fl-center-center-center">
      <TurnBox v-if="shown[3]" :faces="3" :value="face" :is-axis-x="true" class="bg-[red]" :duration="1000">
        <template #face-1>
          <div
            class="h-[50px] w-[80px] bg-black text-white opacity-50 fl-col-nowrap fl-center-center-center"
            @click="face = 2"
          >
            HOGE1
          </div>
        </template>
        <template #face-2>
          <div
            class="h-[100px] w-[120px] bg-[gray] text-white opacity-50 fl-col-nowrap fl-center-center-center"
            @click="face = 3"
          >
            HUGA2
          </div>
        </template>
        <template #face-3>
          <div
            class="h-[180px] w-[100px] bg-[green] text-white opacity-50 fl-col-nowrap fl-center-center-center"
            @click="face = 1"
          >
            HUGA3
          </div>
        </template>
      </TurnBox>
      <TurnBox
        v-if="shown[4]"
        :faces="3"
        :value="face"
        :is-axis-x="true"
        :is-reversed="true"
        class="ml-24 bg-[red]"
        :duration="1000"
      >
        <template #face-1>
          <div
            class="h-[50px] w-[80px] bg-black text-white opacity-50 fl-col-nowrap fl-center-center-center"
            @click="face = 2"
          >
            HOGE1
          </div>
        </template>
        <template #face-2>
          <div
            class="h-[100px] w-[120px] bg-[gray] text-white opacity-50 fl-col-nowrap fl-center-center-center"
            @click="face = 3"
          >
            HUGA2
          </div>
        </template>
        <template #face-3>
          <div
            class="h-[180px] w-[100px] bg-[green] text-white opacity-50 fl-col-nowrap fl-center-center-center"
            @click="face = 1"
          >
            HUGA3
          </div>
        </template>
      </TurnBox>
    </div>
  </div>
</template>
