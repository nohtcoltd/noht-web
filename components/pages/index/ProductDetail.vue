<template>
  <div class="h-full py-[2%] px-[5%] mb:py-[30px] mb:px-[20px]">
    <div
      class="pointer-events-none mx-auto h-full w-full fl-row-nowrap fl-start-center-center mb:max-w-[350px] mb:fl-col-nowrap"
    >
      <slot name="image" />
      <div
        class="pointer-events-auto ml-[3em] flex-1 text-[length:max(30%,13px)] font-semibold leading-[1.7] tracking-[.4em] fl-col-nowrap fl-start-stretch-stretch init-font-family pc:word-break-keep-all mb:ml-0 mb:mt-[30px] mb:w-full mb:text-center mb:text-[12px] mb:tracking-[.2em] mb:fl-start-center-center"
      >
        <slot name="description" />
        <div class="mt-[5em] fl-row-wrap fl-start-center-center mb:mt-[3em]">
          <slot name="links" />
        </div>
      </div>
    </div>
  </div>
</template>
