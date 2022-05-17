<script setup lang="ts">
import { ref } from '@vue/composition-api'
import TurnBox from '~/components/widgets/TurnBox.vue'

const current = ref<number>(1)
const tst = ref<number>(1)

const changePage = (page) => (current.value = page)
</script>
<template>
  <article>
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
    </div>
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
