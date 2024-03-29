<script setup lang="ts">
import MyInput from '~/components/elements/MyInput.vue'
import ErrorMessage from '~/components/widgets/ErrorMessage.vue'
import { addCompleteForwardRotationHandle } from '~/composables/useTurnPage'
import LoadingGear from '~/components/widgets/LoadingGear.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const siteRecaptchaKey = runtimeConfig.siteRecaptchaKey
const $recaptcha = ref<VueRecaptcha>(null)
const recaptchaToken = ref<string>(null)
const recaptchaError = ref<string>(null)
const isRecaptchaValid = computed(() => !recaptchaError.value && recaptchaToken.value)
const handleRecaptchaVerify = (token) => {
  recaptchaToken.value = token
  recaptchaError.value = null
}
const handleRecaptchaError = () => {
  recaptchaToken.value = null
  recaptchaError.value = '失敗しました'
}
const handleRecaptchaExpired = () => {
  recaptchaToken.value = null
}

const isFailed = ref(false)
const isValidated = ref(false)
const isSubmitting = ref(false)

const formName = 'contact'
const requiredErrorMessage = '必須項目です'
const mailErrorMessage = '有効なメールアドレスを入力してください'

const form = useForm({
  validationSchema: yup.object({
    name: yup.string().required(requiredErrorMessage),
    'company-name': yup.string(),
    mail: yup.string().email(mailErrorMessage).required(requiredErrorMessage),
    content: yup.string().required(requiredErrorMessage),
  }),
})

const errors = computed((): { [key in keyof form.values]: string } => {
  if (isValidated.value) {
    return form.errors.value
  }

  return {}
})

const emits = defineEmits<{
  (e: 'sent', data: any)
  (e: 'failed', data: any)
}>()

const submit = async () => {
  const { valid } = await form.validate()
  isValidated.value = true

  if (!valid || !isRecaptchaValid.value) {
    return
  }

  isSubmitting.value = true
  isFailed.value = false

  const formData = new FormData()

  Object.keys(form.values).forEach((key) => formData.append(key, form.values[key]))

  // 以下netlify form用
  formData.append('form-name', formName)
  formData.append('g-recaptcha-response', recaptchaToken.value)
  const data = await $fetch('/contact.html', {
    method: 'POST',
    body: formData,
  }).catch((error) => new Error(error))

  isSubmitting.value = false

  if (data instanceof Error) {
    isFailed.value = true
    return
  }

  emits('sent', data)
}

const reset = () => {
  form.resetForm()
  isValidated.value = false
  recaptchaToken.value = null
  recaptchaError.value = null
  $recaptcha.value.reset()
}

const addHandle = inject(addCompleteForwardRotationHandle)

addHandle(() => {
  if (route.name === 'contact') {
    return
  }

  reset()
})
</script>

<template>
  <!-- netlifyにformを認識させる:
    <form netlify name="hoge">
      <input name="form-name" value="hoge" />
    -->
  <form
    :name="formName"
    netlify
    data-netlify-recaptcha="true"
    class="w-full text-[16px] fl-col-nowrap fl-start-center-center mb:text-[14px]"
    action="/contact.html"
  >
    <div class="hidden">
      <input type="text" name="form-name" value="contact" />
      <input type="text" name="name" />
      <input type="text" name="mail" />
      <input type="text" name="company-name" />
      <textarea name="content"></textarea>
      <div data-netlify-recaptcha="true" class="hidden"></div>
    </div>
    <client-only>
      <input type="hidden" name="form-name" :value="formName" />
      <div class="w-full max-w-[350px]">
        <MyInput v-model="form.values.name" :error="errors.name" placeholder="NAME" name="name" class="mt-[1.2em]" />
        <ErrorMessage :error="errors.name" />
        <MyInput v-model="form.values['company-name']" placeholder="COMPANY" name="company-name" class="mt-[1.2em]" />
        <MyInput v-model="form.values.mail" :error="errors.mail" placeholder="MAIL" name="mail" class="mt-[1.2em]" />
        <ErrorMessage :error="errors.mail" />
      </div>
      <div class="w-full">
        <textarea
          v-model="form.values.content"
          :error="errors.content"
          name="content"
          class="mt-[3em] aspect-[5/2] w-full resize-none rounded-[15px] border border-solid border-transparent bg-[#f7f7f7] p-[1em] font-semibold outline-none placeholder:text-[length:inherit] mb:mt-[2em]"
          :class="errors.content ? 'border-[#ec3232]' : ''"
        />
        <ErrorMessage :error="errors.content" />
      </div>

      <div class="mt-[2em] min-h-[80px]">
        <VueRecaptcha
          ref="$recaptcha"
          :hideBadge="false"
          :sitekey="siteRecaptchaKey"
          size="normal"
          :version="2"
          @verify="handleRecaptchaVerify"
          @error="handleRecaptchaError"
          @expired="handleRecaptchaExpired"
        />
        <template v-if="isValidated">
          <ErrorMessage v-if="recaptchaError" error="失敗しました" />
          <ErrorMessage v-else-if="!recaptchaToken" error="必須項目です" />
        </template>
      </div>

      <div
        @click="submit"
        class="mt-[4em] cursor-pointer select-none rounded-[.5em] bg-[#111] py-[.5em] px-[4em] text-[min(120%,25px)] font-semibold tracking-[.2em] text-white font-poppins my-hover:opacity-80"
      >
        CONFIRM
      </div>
    </client-only>
    <div
      v-if="isSubmitting"
      class="absolute top-0 left-0 z-50 h-full w-full flex-col bg-white/80 fl-center-center-center"
    >
      <LoadingGear class="absolute inset-0 m-auto" />
    </div>
  </form>
</template>
