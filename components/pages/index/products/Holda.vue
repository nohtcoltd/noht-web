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
    :header-bg="{ color: '#F5F5F5' }"
    :detail-bg="{ imageUrl: 'images/bg_holda.jpg' }"
    :staff-bg="{ color: '#F80000' }"
  >
    <template #header>
      <RetinaImage
        src="images/image_symbol_holda.png"
        class="absolute top-[-10%] right-[10%] h-[clamp(200px,120%,500px)] mb:top-[-30%] mb:right-[10%] mb:h-[130%]"
      />
    </template>

    <template #detail-image>
      <RoundedImage src="images/image_description_holda.jpg" alt="" class="w-[40%] max-w-[600px] mb:w-full" />
    </template>

    <template #detail-description>
      <p>
        画像1枚でつくれる<br />
        アクリルグッズ製作サービス。
      </p>
      <p class="mt-[20px]">現在鋭意準備中。</p>
    </template>

    <template #detail-links>
      COMING2022
      <TwitterButton href="https://twitter.com/HOLDA_JP" />
    </template>

    <template #staff>
      <div
        class="grid grid-cols-6 gap-x-[.5em] gap-y-[.5em] text-[length:max(25%,11px)] pc:h-full mb:grid-cols-3 mb:gap-[1.5em] mb:text-[9px]"
      >
        <Staff name="KEIICHIRO HIRAI" job-title="PLAN/DIRECTOR/DESIGN" />
        <div class="col-span-5 mb:col-span-2" />
        <Staff name="TAKUMA FURUTANI" job-title="BACKEND LEAD" />
        <Staff name="YUGO NISHIOKA" job-title="BACKEND" />
        <Staff name="YMMR" job-title="FRONTEND" />
        <Staff name="AZARASHI" job-title="IMAGE CALC." />
        <Staff name="SAITO" job-title="PRODUCTION MNG." />
        <Staff name="ISHIZAWA" job-title="PRODUCTION MNG." />
        <Staff name="YOSHIDA" job-title="HARDWARE" />
        <Staff name="MAOMARUYA" job-title="3DCG/ILLUST" />
        <Staff name="MOCHIPAN" job-title="ILLUSTRATION" />
        <Staff name="NISHI" :job-title="['PLAN ASSISTANT', 'ADS/MARKETING']" />
        <Staff name="OKAMOTO" job-title="PRDCTN MNG AST." />
        <Staff name="INOUE" job-title="PRDCTN MNG AST." />
        <Staff name="ICHIKAWA" job-title="B2B LEAD" />
        <Staff name="YAMAGUCHI" job-title="B2B" />
        <Staff name="KAWAGUCHI" job-title="B2B" />
        <Staff name="KISHIDA" job-title="B2B ASSISTANT" />
        <Staff name="TAKEUCHI" job-title="PRDCTN MNG AST." />
        <Staff name="KAWAZOE" job-title="LOGISTICS" />
        <Staff name="FUJIWARA" job-title="B2C" />
        <Staff name="OKUBO" job-title="B2C" />
        <Staff name="HORII" job-title="B2C" />
        <div class="col-span-2" />
        <Staff name="HIRA" job-title="PRDCTN MNG AST." />
      </div>
    </template>
  </Product>
</template>
