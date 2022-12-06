<script setup lang="ts">
import Product from '~/components/pages/index/Product.vue'
import TwitterButton from '~/components/pages/index/TwitterButton.vue'
import RetinaImage from '~/components/elements/RetinaImage.vue'
import RoundedImage from '~/components/pages/index/RoundedImage.vue'
import Staff from '~/components/pages/index/Staff.vue'
</script>

<template>
  <Product
    title="HOLDA"
    caption="ACRYLIC GOODS PRINT SERVICE"
    :main-panel-background="{ color: '#F5F5F5' }"
    :detail-panel-background="{ imageUrl: '/images/bg_holda.jpg' }"
    :staff-panel-background="{ color: '#F80000' }"
  >
    <template #main-panel>
      <RetinaImage
        src="/images/image_symbol_holda.png"
        class="absolute top-[-10%] right-[10%] h-[clamp(200px,120%,500px)] mb:top-[-30%] mb:right-[10%] mb:h-[130%]"
      />
    </template>

    <template #detail-panel-image>
      <RoundedImage src="/images/image_description_holda.jpg" alt="" class="w-[40%] max-w-[600px] mb:w-full" />
    </template>

    <template #detail-panel-description>
      <p>
        画像1枚でつくれる<br />
        アクリルグッズ製作サービス。
      </p>
      <p class="mt-[20px]">現在鋭意準備中。</p>
    </template>

    <template #detail-panel-links>
      COMING2022
      <TwitterButton href="https://twitter.com/HOLDA_JP" />
    </template>

    <template #staff-panel>
      <div
        class="grid grid-cols-6 gap-x-[.5em] gap-y-[.5em] text-[length:max(20%,11px)] pc:h-full mb:grid-cols-3 mb:gap-[1.5em] mb:text-[9px]"
      >
        <Staff name="KEIICHIRO HIRAI" job-title="PLAN/DIRECTOR/DESIGN" />
        <div class="col-span-5 mb:col-span-2" />
        <Staff name="FILRIYA" job-title="TECH LEAD" />
        <Staff name="YOUGO NISHIOKA " job-title="BACKEND LEAD" />
        <Staff name="YMMR" job-title="FRONTEND" />
        <Staff name="AZARASHI" job-title="IMAGE CALC." />
        <Staff name="TAICHI SAITO" job-title="PRODUCTION MNG." />
        <Staff name="TAKEYUKI ISHIZAWA" job-title="PRODUCTION MNG." />
        <Staff name="JUMPEI NOGUCHI" job-title="HARDWARE" />
        <Staff name="MAO MARUYA" job-title="3DCG/ILLUST" />
        <Staff name="MOCHIPAN" job-title="ILLUSTRATION" />
        <Staff name="MASAKI NISHITANI" :job-title="['PLAN ASSISTANT', 'ADS/MARKETING']" />
        <Staff name="MAO OKAMOTO" job-title="PRDCTN MNG AST." />
        <Staff name="YUKIKO INOUE" job-title="PRDCTN MNG AST." />
        <Staff name="MASASHI ICHIKAWA" job-title="B2B LEAD" />
        <Staff name="ERI YAMAGUCHI" job-title="B2B" />
        <Staff name="YURIE KAWAGUCHI" job-title="B2B" />
        <Staff name="KEITA TAKEUCHI" job-title="PRDCTN MNG AST." />
        <Staff name="NOBORU KAWAZOE" job-title="LOGISTICS" />
        <Staff name="AOI FUJIWARA" job-title="B2C" />
        <Staff name="KOBAYASHI" job-title="B2C" />
        <Staff name="ERIKO HORII" job-title="B2C" />
        <div class="col-span-3" />
        <Staff name="TAKAHIRO HIRA" job-title="PRDCTN MNG AST." />
      </div>
    </template>
  </Product>
</template>
