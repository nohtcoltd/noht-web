<script setup lang="ts">
import { onMounted, ref } from '@vue/composition-api'
import TurnBox from '~/components/widgets/TurnBox.vue'

const current = ref<number>(1)
const $hogeBox = ref<HTMLElement>(null)
const anim = ref<Animation>(null)

onMounted(() => {
  return
  anim.value = $hogeBox.value.animate(
    {
      transform: ['rotateY(360deg)'],
    },
    {
      duration: 3000,

      iterations: Infinity,
    },
  )
})

const hoge = () => anim.value.reverse()

const changePage = (page) => (current.value = page)
</script>
<template>
  <article>
    <div class="mx-auto mb-5 w-[100px] select-none bg-slate-500 p-10" @click="current = current === 1 ? 2 : 1">+</div>
    <!-- <div class="p-10">
      <div
        class="bg-[red]"
        :style="{
          perspective: '300px',
        }"
      >
        <div
          :style="{
            transformStyle: 'preserve-3d',
            transform: `rotateX(0deg) rotateY(0deg)`,
          }"
          class="relative mx-auto w-[300px]"
          ref="$hogeBox"
        >
          <div class="h-[120px] bg-slate-100 p-10 opacity-60">HOGE</div>
          <div
            class="absolute left-0 top-0 h-[180px] w-full bg-blue-100 p-10 opacity-60"
            :style="{
              transform: `translateY(-50%) translateZ(-90px) rotateX(90deg)`,
            }"
          >
            top not<br />HOGE
          </div>
          <div
            class="absolute left-0 bottom-0 h-[180px] w-full bg-blue-100 p-10 opacity-60"
            :style="{
              transform: `translateY(50%) translateZ(-90px) rotateX(-90deg)`,
            }"
          >
            bottom rev<br />HOGE
          </div>
          <div
            class="absolute top-0 left-0 h-full w-[280px] bg-blue-100 p-10 opacity-60"
            :style="{
              transform: `translateX(-50%) translateZ(-140px) rotateY(90deg)`,
            }"
          >
            left rev<br />HOGE
          </div>
          <div
            class="absolute top-0 right-0 h-full w-[280px] bg-blue-100 p-10 opacity-60"
            :style="{
              transform: `translateX(50%) translateZ(-140px) rotateY(90deg)`,
            }"
          >
            right not<br />HOGE
          </div>
        </div>
      </div>
    </div> -->
    <div class="mx-auto w-fit bg-[yellow] fl-col-nowrap fl-center-center-center">
      <div class="p-10 fl-col-nowrap fl-start-center-center">
        <turn-box v-model="current" :is-axis-x="false" :is-reversed="true">
          <template #face-2>
            <div @click="current = 1" class="-opacity-50 w-[120px] bg-black p-5 px-6 text-white">HOGE</div>
          </template>
          <template #face-1>
            <div @click="current = 2" class="-opacity-50 w-[180px] bg-gray-400 p-5 px-10 text-white">
              HOGEGE<br />HOGEHOGE
            </div>
          </template>
        </turn-box>
      </div>
      <div class="p-10 fl-col-nowrap fl-start-center-center">
        <turn-box v-model="current" :is-axis-x="false" :is-reversed="false">
          <template #face-1>
            <div @click="current = 2" class="-opacity-50 w-[120px] bg-black p-5 px-6 text-white">HOGE</div>
          </template>
          <template #face-2>
            <div @click="current = 1" class="-opacity-50 w-[180px] bg-gray-400 p-5 px-10 text-white">
              HOGEGE<br />HOGEHOGE
            </div>
          </template>
        </turn-box>
      </div>
      <div class="p-10 fl-col-nowrap fl-start-center-center">
        <turn-box v-model="current" :is-axis-x="true" :is-reversed="true" class="w-[300px]">
          <template #face-1>
            <div @click="current = 2" class="-opacity-50 bg-black p-5 px-6 text-white">HOGE</div>
          </template>
          <template #face-2>
            <div @click="current = 1" class="-opacity-50 bg-gray-400 p-5 px-10 text-white">HOGEGE<br />hoge</div>
          </template>
        </turn-box>
      </div>
      <div class="p-10 fl-col-nowrap fl-start-center-center">
        <turn-box v-model="current" :is-axis-x="true" :is-reversed="false" class="w-[300px]">
          <template #face-1>
            <div @click="current = 2" class="-opacity-50 bg-black p-5 px-6 text-white">HOGE</div>
          </template>
          <template #face-2>
            <div @click="current = 1" class="-opacity-50 bg-gray-400 p-5 px-10 text-white">HOGEGE<br />hoge</div>
          </template>
        </turn-box>
      </div>

      <!-- <div @click="hoge" class="p-10 text-[30px]">逆</div> -->
    </div>
    <!--
    <div class="py-32 fl-row-nowrap fl-start-stretch-stretch">
      <turn-box v-model="current" class="mx-auto w-[300px]" :is-reversed="false">
        <template #face-1>
          <div class="---p-1.5">
            <div @click="changePage(2)" class="select-none bg-[#888] p-[20px]">ほげ</div>
          </div>
        </template>
        <template #face-2>
          <div class="---p-1.5">
            <div @click="changePage(3)" class="select-none bg-black p-[20px] text-white">
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
            </div>
          </div>
        </template>
        <template #face-3>
          <div class="---p-1.5">
            <div @click="changePage(1)" class="select-none bg-black p-[20px] text-white">
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
            </div>
          </div>
        </template>
      </turn-box>
      <turn-box v-model="current" class="mx-auto w-[300px]" :is-reversed="true">
        <template #face-1>
          <div class="---p-1.5">
            <div @click="changePage(2)" class="select-none bg-[#888] p-[20px]">ほげ</div>
          </div>
        </template>
        <template #face-2>
          <div class="---p-1.5">
            <div @click="changePage(3)" class="select-none bg-black p-[20px] text-white">
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
            </div>
          </div>
        </template>
        <template #face-3>
          <div class="---p-1.5">
            <div @click="changePage(1)" class="select-none bg-black p-[20px] text-white">
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
              ふが<br />ほげ<br />
            </div>
          </div>
        </template>
      </turn-box>
    </div> -->

    <nuxt />
  </article>
</template>

<style>
@keyframes cube-rotate {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.scene {
  width: 200px;
  height: 200px;
  margin: 50px 0 0 50px;

  perspective: 1000px;
  perspective-origin: 50% -150px;
}

.cube {
  transform-style: preserve-3d;
  animation: cube-rotate 10s infinite ease;
}

.cube div {
  display: block;
  position: absolute;
  width: 200px;
  height: 200px;
  line-height: 200px;
  font-size: 40px;
  color: white;
  text-align: center;
  backface-visibility: visible;
}

.front {
  background: rgba(0, 0, 0, 0.4);
  transform: translateZ(100px);
}

.back {
  background: rgba(0, 255, 0, 1);
  transform: rotateY(180deg) translateZ(100px);
}

.top {
  background: rgba(196, 0, 0, 0.7);
  transform: rotateX(90deg) translateZ(100px);
}

.bottom {
  background: rgba(196, 0, 196, 0.7);
  transform: rotateX(-90deg) translateZ(100px);
}

.left {
  background: rgba(0, 0, 196, 0.7);
  transform: rotateY(-90deg) translateZ(100px);
}

.right {
  background: rgba(196, 196, 0, 0.7);
  transform: rotateY(90deg) translateZ(100px);
}
</style>
