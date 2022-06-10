<script setup lang="ts">
import Product from '~/components/pages/index/Product.vue'
import ExternalLinkButton from '~/components/pages/index/ExternalLinkButton.vue'
import TwitterButton from '~/components/pages/index/TwitterButton.vue'
import RetinaImage from '~/components/elements/RetinaImage.vue'
import Staff from '~/components/pages/index/Staff.vue'
</script>

<template>
  <Product
    title="BANANANA EFFECTS"
    caption="EFFECTS PEDAL BRAND"
    :header-bg="{ color: '#FFB200' }"
    :detail-bg="{ imageUrl: 'images/bg_bananana.jpg' }"
    :staff-bg="{ color: '#FEDA47' }"
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
</template>
