<script setup lang="ts">
import Product from '~/components/pages/index/Product.vue'
import ExternalLinkButton from '~/components/pages/index/ExternalLinkButton.vue'
import TwitterButton from '~/components/pages/index/TwitterButton.vue'
import RetinaImage from '~/components/elements/RetinaImage.vue'
import RoundedImage from '~/components/pages/index/RoundedImage.vue'
import Staff from '~/components/pages/index/Staff.vue'
import useMediaQuery from '~/composables/useMediaQuery'

const { isMobile } = useMediaQuery()
</script>

<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  layout: 'TurnPage',
})
</script>

<template>
  <article class="w-full bg-white pr-[6vw] text-sm fl-col-nowrap fl-start-center-center tablet:px-0 tablet:py-0">
    <div class="w-full max-w-[1200px] fl-col-nowrap fl-start-center-center mb:max-w-[500px]">
      <Product
        title="HOLDA"
        caption="ACRYLIC GOODS PRINT SERVICE"
        header-bg="#F5F5F5"
        detail-bg="url(images/bg_holda@2x.jpg)"
        staff-bg="#F80000"
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

      <Product
        title="SECONDPRESS.US"
        caption="CANBADGE PRINT SERVICE"
        header-bg="#00A6C2"
        detail-bg="url(images/bg_secondpress@2x.png)"
        staff-bg="#85A5A2"
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

      <Product
        title="BANANANA EFFECTS"
        caption="EFFECTS PEDAL BRAND"
        header-bg="#FFB200"
        detail-bg="url(images/bg_bananana@2x.jpg)"
        staff-bg="#FEDA47"
        staff-color="#111"
      >
        <template #header>
          <RetinaImage
            src="images/image_symbol_bananana.png"
            class="mb:r-0 absolute top-[35%] bottom-0 right-[4%] my-auto h-[clamp(200px,150%,600px)] mb:right-[0%] mb:top-[-5%] mb:h-[100%]"
          />
        </template>

        <template #detail-image>
          <div class="w-[30%] max-w-[600px] mb:w-full mb:max-w-[150px]">
            <RetinaImage src="images/image_description_bananana.png" class="mx-auto w-full max-w-[250px]" alt="" />
          </div>
        </template>

        <template #detail-description>
          <p>世界で愛されている謎のエフェクターブランド。</p>
          <p class="mt-[.8em]">
            エキセントリックなサウンドとユニークなビジュアル。<br />
            そのほか全てが最高であることを実現できるように<wbr />
            魂を込めて企画・設計・製造しています。
          </p>
          <p class="mt-[.8em]">世界12ヶ国の正規ディーラーと、自社にて販売しています。</p>
        </template>

        <template #detail-links>
          <ExternalLinkButton href="https://ja.banananaeffects.com/">BANANANA EFFECTS</ExternalLinkButton>
          <TwitterButton href="https://twitter.com/banananaeffects" />
        </template>

        <template #staff>
          <div class="grid flex-1 grid-cols-2 content-center gap-[2em] text-[length:max(45%,17px)] mb:text-[12px]">
            <Staff name="KEIICHIRO HIRAI" :job-title="['PLAN/DIRECTION', 'UI/UX/DESIGN/WEB/PV']" />
            <Staff name="JUMPEI NOGUCHI" :job-title="['BLAND FOUNDER', 'PLAN/CONCEPT', 'SOUND/CIRCUIT/SOFTWARE']" />
          </div>
          <div
            class="grid flex-1 grid-cols-5 content-center justify-center gap-x-[.5em] gap-y-[.5em] text-[length:max(35%,13px)] mb:mt-[4em] mb:grid-cols-3 mb:gap-[1.5em] mb:text-[10px]"
          >
            <Staff name="AZARASHI" job-title="WEB FRONTEND" />
            <Staff name="YASUO INUI" job-title="B2B/B2C/EXPORT" />
            <Staff name="MUROSHI" job-title="MANUFACTURING" />
            <Staff name="NISHI" job-title="SUPPLY" />
            <Staff name="SHOTA MORIGUCHI" job-title="SOFTWARE ASSISTANT" />
          </div>
        </template>
      </Product>

      <Product
        title="PICTOCLUB"
        caption="ACRYLIC PICTOGRAM SIGNS"
        header-bg="#3D3D3D"
        detail-bg="url(images/bg_pictoclub@2x.jpg)"
        staff-bg="#3D3D3D"
      >
        <template #header>
          <div class="relative flex h-full w-full fl-row-nowrap fl-end-stretch-stretch">
            <RetinaImage
              :src="isMobile ? 'images/bg_header_pictoclub_mobile.jpg' : 'images/bg_header_pictoclub.jpg'"
              class="h-full w-full max-w-none object-cover object-right"
              alt=""
            />
          </div>
        </template>

        <template #detail-image>
          <div class="w-[30%] max-w-[600px] bg-center mb:w-full">
            <RetinaImage
              src="images/image_description_pictoclub.png"
              class="mx-auto w-full max-w-[250px] mb:max-w-[120px]"
              alt=""
            />
          </div>
        </template>

        <template #detail-description>
          <p>美しく、だれにでもやさしいサイン。</p>
          <p class="mt-[.8em]">
            数学的な美しさに加え、視認性を重視し、<br />
            ひとつひとつ細やかな検証・調整を行い丁寧にデザインしました。
          </p>
          <p class="mt-[.8em]">
            裏面には強力両面テープ、取り付けガイド付きで<wbr />
            簡単に壁に取り付けられるアクリル製のサインです。
          </p>
        </template>

        <template #detail-links>
          <ExternalLinkButton href="https://amzn.to/3lNL4oR">AMAZON.CO.JP</ExternalLinkButton>
        </template>

        <template #staff>
          <div class="grid grid-cols-2 content-center gap-[2em] text-[length:max(45%,17px)] pc:h-full mb:text-[12px]">
            <Staff name="KEIICHIRO HIRAI" job-title="PLAN/DIRECTION/DESIGN" />
            <Staff name="MAO MARUYA" job-title="DESIGN" />
          </div>
        </template>
      </Product>
    </div>
  </article>
</template>
