<script setup lang="ts">
import { inject, ref, ComponentInstance, useRoute } from '#app'
// import { useContext } from '@nuxtjs/composition-api'
import MyInput from '~/components/elements/MyInput.vue'
import ErrorMessage from '~/components/widgets/ErrorMessage.vue'
import { addCompleteForwardRotationHandle } from '~/composables/useTurnPage'
import LoadingGear from '~/components/widgets/LoadingGear.vue'

// const { $recaptcha } = useContext()
const hasRecaptchaError = ref(false)
const isFailed = ref(false)
const isSubmitting = ref(false)

const route = useRoute()
const $observer = ref<ComponentInstance>(null)
const fields = ref({
  'form-name': 'contact',
  name: '',
  'company-name': '',
  mail: '',
  content: '',
})

const emits = defineEmits<{
  (e: 'sent', data: any)
  (e: 'failed', data: any)
}>()

const validateRecaptcha = async (): Promise<string> => {
  //TODO
  return
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     const token: string = await $recaptcha.getResponse()
  //     await $recaptcha.reset()

  //     resolve(token)
  //   } catch (error) {
  //     reject(error)
  //   }
  // })
}

const submit = async () => {
  hasRecaptchaError.value = false
  isFailed.value = false
  isSubmitting.value = true

  const recaptchaToken = await validateRecaptcha().catch((error) => new Error(error))

  if (recaptchaToken instanceof Error) {
    hasRecaptchaError.value = true
    isSubmitting.value = false
    return
  }

  const formData = new FormData()

  formData.append('name', fields.value.name)
  formData.append('company-name', fields.value['company-name'])
  formData.append('mail', fields.value.mail)
  formData.append('content', fields.value.content)

  // 以下netlify form用
  formData.append('form-name', 'contact')
  formData.append('g-recaptcha-response', recaptchaToken)

  const data = await $fetch('/', {
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
  fields.value.name = ''
  fields.value['company-name'] = ''
  fields.value.mail = ''
  fields.value.content = ''
  //TODO
  // $observer.value.reset()
  // $recaptcha.reset()
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
  <form :name="fields['form-name']" netlify data-netlify-recaptcha="true" class="w-full text-[16px] mb:text-[14px]">
    <input v-for="(value, key) in fields" :name="key" :key="key" type="hidden" :value="value" />
    <client-only>
      <validation-observer
        ref="$observer"
        v-slot="{ handleSubmit }"
        class="w-full fl-col-nowrap fl-start-center-center"
      >
        <input type="hidden" name="form-name" :value="fields['form-name']" />
        <div class="w-full max-w-[350px]">
          <validation-provider mode="passive" rules="required" v-slot="{ errors }" slim>
            <MyInput v-model="fields.name" :error="errors[0]" placeholder="NAME" name="name" class="mt-[1.2em]" />
            <ErrorMessage :error="errors[0]" />
          </validation-provider>
          <MyInput v-model="fields['company-name']" placeholder="COMPANY" name="company-name" class="mt-[1.2em]" />
          <validation-provider mode="passive" rules="required|email" v-slot="{ errors }" slim>
            <MyInput v-model="fields.mail" :error="errors[0]" placeholder="MAIL" name="mail" class="mt-[1.2em]" />
            <ErrorMessage :error="errors[0]" />
          </validation-provider>
        </div>
        <validation-provider class="block w-full" mode="passive" rules="required" v-slot="{ errors }" slim>
          <textarea
            v-model="fields.content"
            :error="errors[0]"
            name="content"
            class="mt-[3em] aspect-[5/2] w-full resize-none rounded-[15px] border border-solid border-transparent bg-[#f7f7f7] p-[1em] font-semibold outline-none placeholder:text-[length:inherit] mb:mt-[2em]"
            :class="errors.length !== 0 ? 'border-[#ec3232]' : ''"
          />
          <ErrorMessage :error="errors[0]" />
        </validation-provider>

        <div class="mt-[2em] min-h-[80px]">
          <recaptcha />
          <ErrorMessage v-if="hasRecaptchaError" error="失敗しました" />
        </div>

        <div
          @click="handleSubmit(submit)"
          class="mt-[4em] cursor-pointer select-none rounded-[.5em] bg-[#111] py-[.5em] px-[4em] text-[min(120%,25px)] font-semibold tracking-[.2em] text-white font-poppins my-hover:opacity-80"
        >
          CONFIRM
        </div>
      </validation-observer>
    </client-only>
    <div
      v-if="isSubmitting"
      class="absolute top-0 left-0 z-50 h-full w-full flex-col bg-white/80 fl-center-center-center"
    >
      <LoadingGear class="absolute inset-0 m-auto" />
    </div>
  </form>
</template>
