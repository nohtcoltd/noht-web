<script setup lang="ts">
import Product from '~/components/pages/index/Product.vue'
import ExternalLinkButton from '~/components/pages/index/ExternalLinkButton.vue'
import TwitterButton from '~/components/pages/index/TwitterButton.vue'
import RetinaImage from '~/components/elements/RetinaImage.vue'
import RoundedImage from '~/components/pages/index/RoundedImage.vue'
import Staff from '~/components/pages/index/Staff.vue'
</script>

<template>
  <Product
    title="SECONDPRESS.US"
    caption="CANBADGE PRINT SERVICE"
    :header-bg="{ color: '#00A6C2' }"
    :detail-bg="{ imageUrl: 'images/bg_secondpress.png' }"
    :staff-bg="{ color: '#85A5A2' }"
  >
    <template #header>
      <RetinaImage
        src="images/image_symbol_secondpress.png"
        class="absolute top-0 bottom-0 right-[10%] my-auto h-[clamp(200px,80%,300px)] mb:right-[5%] mb:bottom-[15%] mb:h-[75%]"
      />
    </template>

    <template #detail-image>
      <RoundedImage src="images/image_description_secondpress.jpg" alt="" class="w-[40%] max-w-[600px] mb:w-full" />
    </template>

    <template #detail-description>
      <p class="">
        画像1枚でつくれる<br />
        オリジナル缶バッジ製作サービス。
      </p>
      <p class="mt-[.8em]">
        ユーザ52万人・年間1500万個以上の製作実績。<br />
        生産体制まで自社で設計・運営しており<wbr />
        価格・品質ともに圧倒的に優れ、国内シェア最大級。
      </p>
    </template>

    <template #detail-links>
      <ExternalLinkButton href="https://www.secondpress.us/">SECONDPRESS.US</ExternalLinkButton>
      <TwitterButton href="https://twitter.com/secondpress_us" />
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
