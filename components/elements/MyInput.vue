<script setup lang="ts">
import { ref, computed } from '#app'

const $input = ref<HTMLInputElement>()
const props = defineProps<{
  value: string | number
  error?: string
}>()
const isFocused = ref(false)

const handleFocus = () => {
  $input.value.select()
  isFocused.value = true
}
const handleBlur = () => (isFocused.value = false)

const hasValue = computed(() => !!props.value || props.value === 0)

const emits = defineEmits<{
  (e: 'input', value: string)
}>()

const onInput = ({ target }: Event) => {
  if (!(target instanceof HTMLInputElement) || !target) {
    return
  }

  emits('input', target.value)
}
</script>

<template>
  <div
    :class="[
      'my-input',
      'relative w-full rounded-[10px] border-[transparent] bg-[#f7f7f7] leading-[1]',
      {
        disabled: $attrs.disabled,
        error,
        shrink: hasValue && $attrs.placeholder && !$attrs.disabled,
        focus: isFocused,
      },
    ]"
  >
    <label
      class="font-[length:inherit] relative block max-h-full w-full rounded-[inherit] border-[color:inherit] text-[length:inherit] text-[color:inherit]"
    >
      <input
        ref="$input"
        v-bind="$attrs"
        type="text"
        :value="value"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="onInput"
        placeholder=""
        class="relative z-10 block w-full rounded-[inherit] bg-transparent p-[15px] font-[inherit] text-[length:inherit] font-bold outline-none"
      />
      <span class="appearance--top text-[110%] font-poppins"
        ><p>{{ $attrs.placeholder }}</p>
        <p
      /></span>
      <span class="appearance--bottom" />
      <span class="appearance--left" />
      <span class="appearance--right" />
      <slot name="inner" />
    </label>
    <slot />
  </div>
</template>

<style scoped>
.my-input.error {
  border-color: #ec3232;
}

[class^='appearance--'] {
  position: absolute;
  box-sizing: border-box;
  font-weight: 600;
  color: inherit;
  text-align: left;
  color: #999;
  z-index: 20;
}
.my-input.error [class^='appearance--'] {
  color: #ec3232;
}
.appearance--top {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  top: 0;
  left: 0;
  height: 100%;
  padding: 0 15px;
  border-radius: inherit;
  border-color: inherit;
}
.my-input:not(.disabled) .appearance--top {
  transition: height 100ms, font-size 100ms, background-color 0ms 100ms, z-index 0ms 100ms;
  z-index: 0;
}
.appearance--top p {
  border-top: 1px solid;
  border-top-color: inherit;
  box-sizing: border-box;
}
.appearance--top p:first-child {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  transition: padding 100ms;
  height: 100%;
  flex: 0 1 auto;
}
.appearance--top p:not(:first-child) {
  flex: 1 1 auto;
}
.appearance--bottom {
  width: calc(100% - 30px);
  bottom: 0;
  left: 0;
  border-top: 1px solid;
  border-color: inherit;
}
.appearance--left {
  top: 0;
  left: 0;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-left: 1px solid;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
  border-color: inherit;
}
.appearance--right {
  top: 0;
  right: 0;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  border-color: inherit;
}
.appearance--top,
.appearance--bottom {
  right: 0;
  margin: 0 auto;
}
.appearance--left,
.appearance--right {
  width: 15px;
  height: 100%;
}
.content > [class^='appearance--'] {
  border-color: inherit;
}
.shrink:not(.disabled) .appearance--top {
  height: 0%;
  font-size: 12px;
  z-index: 20;
}
.shrink:not(.disabled) .appearance--top p:first-child {
  border-top: none;
}
.shrink:not(.disabled) .appearance--top p:first-child:not(:empty) {
  padding: 0 2px;
}
.my-input:not(.disabled) input:-webkit-autofill ~ .appearance--top,
.my-input:not(.disabled) input:-webkit-autofill:focus ~ .appearance--top {
  height: 0%;
  font-size: 12px;
  z-index: 20;
}
.my-input:not(.disabled) input:-webkit-autofill ~ .appearance--top p:first-child,
.my-input:not(.disabled) input:-webkit-autofill:focus ~ .appearance--top p:first-child {
  border-top: none;
}
.my-input:not(.disabled) input:-webkit-autofill ~ .appearance--top p:first-child:not(:empty),
.my-input:not(.disabled) input:-webkit-autofill:focus ~ .appearance--top p:first-child:not(:empty) {
  padding: 0 2px;
}
.my-input:not(.disabled).focus [class^='appearance--'] {
  transition: height 100ms, font-size 100ms, background-color 0ms, z-index 0ms;
  border-color: #35aae2;
  color: #35aae2;
}
.my-input:not(.disabled).focus .appearance--top {
  height: 0%;
  font-size: 12px;
  z-index: 20;
}
.my-input:not(.disabled).focus .appearance--top p:first-child {
  border-top: none;
}
.my-input:not(.disabled).focus .appearance--top p:first-child:not(:empty) {
  padding: 0 2px;
}
.shrink:not(.disabled) .appearance--top {
  transition: none;
}
.shrink:not(.disabled) .appearance--top > p {
  transition: none;
}
.message {
  margin-top: 5px;
}
</style>
