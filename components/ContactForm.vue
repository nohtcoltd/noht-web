<script setup lang="ts">
import { reactive, ref } from '@nuxtjs/composition-api'

const fields = reactive({
  name: '',
  companyName: '',
  mail: '',
  mailConfirm: '',
  content: '',
})

const submit = async () => {
  const formData = new FormData()

  formData.append('name', fields.name)
  formData.append('company-name', fields.companyName)
  formData.append('mail', fields.mail)
  formData.append('mail-confirm', fields.mailConfirm)
  formData.append('content', fields.content)
  formData.append('form-name', 'contact')

  const data = await $fetch('/', {
    method: 'POST',
    body: formData,
  })
}
</script>

<template>
  <!-- netlifyにformを認識させる:
    <form netlify name="hoge">
      <input name="form-name" value="hoge" />
  -->
  <form name="contact" netlify class="fl-col-nowrap fl-start-center-center">
    <input type="hidden" name="form-name" value="contact" />
    {{ fields }}
    <input v-model="fields.name" placeholder="name" name="name" class="mt-3" />
    <input v-model="fields.companyName" placeholder="company-name" name="company-name" class="mt-3" />
    <input v-model="fields.mail" placeholder="mail" name="mail" class="mt-3" />
    <input v-model="fields.mailConfirm" placeholder="mail-confirm" name="mail-confirm" class="mt-3" />
    <textarea v-model="fields.content" placeholder="content" name="content" class="mt-3" />

    <div type="submit" @click="submit">OK</div>
  </form>
</template>