export default defineNuxtPlugin(async (nuxtApp) => {
  const isFontLoaded = ref(false)
  nuxtApp.provide('isFontLoaded', isFontLoaded)

  const poppinsSemiBold = new FontFace(
    'Poppins',
    `url('/fonts/Poppins-SemiBold.ttf') format('woff2')`,
    {
      style: 'normal',
      weight: '600',
      display: 'block'
    }
  )

  const poppinsBold = new FontFace(
    'Poppins',
    `url('/fonts/Poppins-Bold.ttf') format('woff2')`,
    {
      style: 'normal',
      weight: '700',
      display: 'block'
    }
  )

  const fontFaces = await Promise.all([poppinsSemiBold.load(), poppinsBold.load()])

  fontFaces.forEach((fontFace) => document.fonts.add(fontFace))

  isFontLoaded.value = true
})