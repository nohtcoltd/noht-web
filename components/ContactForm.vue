<script setup lang="ts">
import { reactive, inject, ref, ComponentInstance, useRoute } from '#app'
import MyInput from '~/components/elements/MyInput.vue'
import ErrorMessage from '~/components/widgets/ErrorMessage.vue'
import { addCompleteForwardRotationHandle } from '~/composables/useTurnPage'

const route = useRoute()
const $observer = ref<ComponentInstance>(null)
const fields = reactive({
  name: '',
  companyName: '',
  mail: '',
  content: '',
})

const submit = async () => {
  const formData = new FormData()

  formData.append('name', fields.name)
  formData.append('company-name', fields.companyName)
  formData.append('mail', fields.mail)
  formData.append('content', fields.content)
  formData.append('form-name', 'contact')

  const data = await $fetch('/', {
    method: 'POST',
    body: formData,
  })
}

const reset = () => {
  $observer.value.reset()
  fields.name = ''
  fields.companyName = ''
  fields.mail = ''
  fields.content = ''
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
  <validation-observer ref="$observer" v-slot="{ handleSubmit }" slim>
    <form name="contact" netlify class="w-full text-[16px] fl-col-nowrap fl-start-center-center mb:text-[14px]">
      <input type="hidden" name="form-name" value="contact" />
      <div class="w-full max-w-[350px]">
        <validation-provider mode="passive" rules="required" v-slot="{ errors }" slim>
          <MyInput v-model="fields.name" :error="errors[0]" placeholder="NAME" name="name" class="mt-[1.2em]" />
          <ErrorMessage :error="errors[0]" />
        </validation-provider>
        <MyInput v-model="fields.companyName" placeholder="COMPANY" name="company-name" class="mt-[1.2em]" />
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

      <div
        @click="handleSubmit(submit)"
        class="mt-[4em] cursor-pointer select-none rounded-[.5em] bg-[#111] py-[.5em] px-[4em] text-[min(120%,25px)] font-semibold tracking-[.2em] text-white font-poppins my-hover:opacity-80"
      >
        CONFIRM
      </div>
    </form>
  </validation-observer>
</template>
