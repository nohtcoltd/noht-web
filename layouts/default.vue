<script setup lang="ts">
import { ref } from '@vue/composition-api'
import TurnBox from '~/components/widgets/TurnBox.vue'

const current = ref<number>(1)
const tst = ref<number>(1)

const changePage = (page) => (current.value = page)
</script>
<template>
  <article>
    <div class="py-32 fl-col-nowrap fl-start-stretch-stretch">
      <turn-box :pages="2" :current="current" class="mx-auto w-[300px]">
        <template #page-1>
          <div class="p-1.5">
            <div @click="changePage(2)" class="select-none rounded-md bg-[#888] p-[20px]">ほげ</div>
          </div>
        </template>
        <template #page-2>
          <div class="p-1.5">
            <div @click="changePage(1)" class="select-none rounded-md bg-black p-[20px] text-white">ふが</div>
          </div>
        </template>
      </turn-box>
      <turn-box :pages="2" :current="current" class="mx-auto w-[300px]" :is-axis-x="false">
        <template #page-1>
          <div class="p-1.5">
            <div @click="changePage(2)" class="select-none rounded-md bg-[#888] p-[20px]">ほげ</div>
          </div>
        </template>
        <template #page-2>
          <div class="p-1.5">
            <div @click="changePage(1)" class="select-none rounded-md bg-black p-[20px] text-white">ふが</div>
          </div>
        </template>
      </turn-box>
      <turn-box :pages="5" :current="tst" class="mx-auto w-[300px]" :is-axis-x="true">
        <template #page-1>
          <div class="p-1.5">
            <div @click="tst = tst + 1" class="select-none rounded-md bg-[#888] p-[20px]">ほげ1</div>
          </div>
        </template>
        <template #page-2>
          <div class="p-1.5">
            <div @click="tst = tst + 1" class="select-none rounded-md bg-[#888] p-[20px]">ほげ2</div>
          </div>
        </template>
        <template #page-3>
          <div class="p-1.5">
            <div @click="tst = tst + 1" class="select-none rounded-md bg-[#888] p-[20px]">ほげ3</div>
          </div>
        </template>
        <template #page-4>
          <div class="p-1.5">
            <div @click="tst = tst + 1" class="select-none rounded-md bg-[#888] p-[20px]">ほげ4</div>
          </div>
        </template>
        <template #page-5>
          <div class="p-1.5">
            <div @click="tst = 1" class="select-none rounded-md bg-[#888] p-[20px]">ほげ5</div>
          </div>
        </template>
      </turn-box>
    </div>
    <nuxt />
  </article>
</template>
