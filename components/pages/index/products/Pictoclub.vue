<script setup lang="ts">
import Product from '~/components/pages/index/Product.vue'
import ExternalLinkButton from '~/components/pages/index/ExternalLinkButton.vue'
import RetinaImage from '~/components/elements/RetinaImage.vue'
import Staff from '~/components/pages/index/Staff.vue'
import useMediaQuery from '~/composables/useMediaQuery'

const { isMobile } = useMediaQuery()
</script>

<template>
  <Product
    title="PICTOCLUB"
    caption="ACRYLIC PICTOGRAM SIGNS"
    :main-panel-background="{
      color: '#3D3D3D',
      imageUrl: isMobile ? 'images/bg_header_pictoclub_mobile.jpg' : 'images/bg_header_pictoclub.jpg',
      position: 'right center',
    }"
    :detail-panel-background="{
      imageUrl: 'images/bg_pictoclub.jpg',
      position: 'right center',
    }"
    :staff-panel-background="{ color: '#3D3D3D' }"
  >
    <template #detail-panel-image>
      <div class="w-[30%] max-w-[600px] bg-center mb:w-full">
        <RetinaImage
          src="images/image_description_pictoclub.png"
          class="mx-auto w-full max-w-[250px] mb:max-w-[120px]"
          alt=""
        />
      </div>
    </template>

    <template #detail-panel-description>
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

    <template #detail-panel-links>
      <ExternalLinkButton href="https://amzn.to/3lNL4oR">AMAZON.CO.JP</ExternalLinkButton>
    </template>

    <template #staff-panel>
      <div class="grid grid-cols-2 content-center gap-[2em] text-[length:max(45%,17px)] pc:h-full mb:text-[12px]">
        <Staff name="KEIICHIRO HIRAI" job-title="PLAN/DIRECTION/DESIGN" />
        <Staff name="MARUYA" job-title="DESIGN" />
      </div>
    </template>
  </Product>
</template>
