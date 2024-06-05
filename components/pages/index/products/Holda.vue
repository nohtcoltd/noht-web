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
        <Staff name="YOUGO NISHIOKA " job-title="BACKEND" />
        <Staff name="SHIBATARN" job-title="BACKEND" />
        <Staff name="BHUJEL" job-title="BACKEND" />
        <Staff name="YMMR" job-title="FRONTEND" />
        <Staff name="SUNOUCHI" job-title="FRONTEND" />
        <Staff name="MIKA UEDA" job-title="FRONTEND" />
        <Staff name="ISIKORO" job-title="IMAGE CALC." />
        <Staff name="WAKABA HOSOGI" job-title="PRODUCTION MNG." />
        <Staff name="JUMPEI NOGUCHI" job-title="HARDWARE" />
        <Staff name="MAO MARUYA" job-title="3DCG/ILLUST" />
        <Staff name="MOCHIPAN" job-title="ILLUSTRATION" />
        <Staff name="TAKAHIRO HIRA" job-title="PRDCTN MNG" />
        <Staff name="MAO OKAMOTO" job-title="PRDCTN MNG AST." />
        <Staff name="YUKIKO INOUE" job-title="PRDCTN MNG AST." />
        <Staff name="YURIE KAWAGUCHI" job-title="B2B" />
        <Staff name="MIKA SHIGETOMI " job-title="B2B" />
        <Staff name="KEITA TAKEUCHI" job-title="PRDCTN MNG AST." />
        <Staff name="NOBORU KAWAZOE" job-title="LOGISTICS" />
        <Staff name="NANAKA KOMURA" job-title="SALES MNG." />
        <Staff name="AOI SHIMAZAKI" job-title="B2C" />
        <Staff name="MINAMI HORI" job-title="B2C" />
        <Staff name="MINATSU TANIGUCHI" job-title="B2C" />
      </div>
    </template>
  </Product>
</template>
