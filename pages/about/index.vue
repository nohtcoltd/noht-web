<script lang="ts" setup>
import MapLink from '~/components/widgets/MapLink.vue'
import SvgLogo from '~/assets/svg/logo_noht_co_ltd.svg?component'
import SvgLogoUs from '~/assets/svg/logo_noht_co_ltd_us.svg?component'
</script>

<template>
  <article
    class="flex-1 text-left text-[length:clamp(13px,1vw,15px)] font-semibold leading-[1.8] tracking-[.8em] fl-col-nowrap fl-center-stretch-stretch mb:px-[15px] mb:text-[11px] mb:leading-[1.3] mb:tracking-[.4em]"
  >
    <header class="text-[110%]">
      <SvgLogo
        class="mb:max-h-[20px] mb-[.2em] h-full max-h-[clamp(20px,2em,32px)]"
      />
      株式会社ノート
    </header>

    <section>
      <dl>
        <dt>代表者</dt>
        <dd>平井慶一郎</dd>
      </dl>
      <dl>
        <dt>資本金</dt>
        <dd>1億円</dd>
      </dl>
      <dl>
        <dt>決算月</dt>
        <dd>3月</dd>
      </dl>
      <dl>
        <dt>従業員</dt>
        <dd>146名</dd>
      </dl>
    </section>
    <section>
      <div class="mb:leading-[1.8] leading-[2.5] tracking-[.4em]">
        ウェブサイト・アプリケーションの企画・開発<br />
        ロゴ・イラスト・3DCG・映像などの企画・制作<br />
        印刷物・立体物・グッズ製品の企画・製造<br />
        カスタマセンターの運営<br />
        電子機器の企画・開発<br />
        レーベル・出版管理
      </div>
    </section>

    <section class="tracking-[.2em]">
      <div class="leading-[2] tracking-[.4em]">
        法人番号<br/>
        6130001042584
      </div>
      <div class="leading-[2] tracking-[.4em] mt-[1em]">
        適格請求書発行事業者番号<br/>
        T6130001042584
      </div>
    </section>
    <section class="tracking-[.2em]">
      <div class="leading-[2] tracking-[.4em]">
        <div>
          本社所在地
          <div class="address">
            〒604-8435 京都府京都市中京区西ノ京三条坊町2-13<MapLink
              class="ml-[.3em]"
              href="https://goo.gl/maps/Sus4brH2eubUviHN7"
            />
          </div>
        </div>
        <div class="mt-[1em]">
          第2分室
          <div class="address">
            〒604-8432 京都府京都市中京区西ノ京南原町1-2<MapLink
              class="ml-[.3em]"
              href="https://goo.gl/maps/CapZUcepc8i3cxUT6"
            />
          </div>
        </div>

        <SvgLogoUs
          class="mb:max-h-[18px] mb-[.2em] mt-[4em] h-full max-h-[clamp(18px,2em,25px)]"
        />

        <div class="mt-[1em]">
          米国支社
          <div class="address">
            3511 Silverside Road, Suite 105 Wilmington, DE 19810 USA<MapLink
              class="ml-[.3em]"
              href="https://goo.gl/maps/8FjuQUYtgGYbwUYYA"
            />
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

section {
  @apply mt-[min(8vw,6em)];
}

dl {
  @apply fl-row-nowrap mt-[1em] first:mt-0;
}
dt {
  @apply mr-[2em];
}
</style>
