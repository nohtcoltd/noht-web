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
    :main-panel-background="{ color: '#00A6C2' }"
    :detail-panel-background="{ imageUrl: 'images/bg_secondpress.png' }"
    :staff-panel-background="{ color: '#85A5A2' }"
  >
    <template #main-panel>
      <RetinaImage
        src="images/image_symbol_secondpress.png"
        class="absolute top-0 bottom-0 right-[10%] my-auto h-[clamp(200px,80%,300px)] mb:right-0 mb:left-0 mb:bottom-[20%] mb:mx-auto mb:h-[70%]"
      />
    </template>

    <template #detail-panel-image>
      <RoundedImage src="images/image_description_secondpress.jpg" alt="" class="w-[40%] max-w-[600px] mb:w-full" />
    </template>

    <template #detail-panel-description>
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

    <template #detail-panel-links>
      <ExternalLinkButton href="https://www.secondpress.us/">SECONDPRESS.US</ExternalLinkButton>
      <TwitterButton href="https://twitter.com/secondpress_us" />
    </template>

    <template #staff-panel>
      <div
        class="grid grid-cols-6 gap-x-[.5em] gap-y-[.5em] text-[length:max(20%,11px)] pc:h-full mb:grid-cols-3 mb:gap-[1.5em] mb:text-[9px]"
      >
        <Staff name="KEIICHIRO HIRAI" job-title="PLAN/DIRECTOR/DESIGN" />
        <div class="col-span-5 mb:col-span-2" />
        <Staff name="FILRIYA" job-title="TEC LEAD" />
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
        <Staff name="YURIKO KAWAGUCHI" job-title="B2B" />
        <Staff name="MAYU KISHIDA" job-title="B2B ASSISTANT" />
        <Staff name="KEITA TAKEUCHI" job-title="PRDCTN MNG AST." />
        <Staff name="NOBORU KAWAZOE" job-title="LOGISTICS" />
        <Staff name="AOI FUJIWARA" job-title="B2C" />
        <Staff name="OKUBO" job-title="B2C" />
        <Staff name="ERIKO HORII" job-title="B2C" />
        <div class="col-span-2" />
        <Staff name="TAKAHIRO HIRA" job-title="PRDCTN MNG AST." />
      </div>
    </template>
  </Product>
</template>
