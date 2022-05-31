import resolveConfig from 'tailwindcss/resolveConfig.js'
import tailwindConfig from '~/tailwind.config.js'
import { computed, ref, onMounted, onUnmounted, nextTick } from '#app'
import myGlobal from '~/assets/js/myGlobal'

const {
  theme: { screens },
} = resolveConfig(tailwindConfig)

const breakPoints = {
  large: parseFloat(screens['pc-l'].max),
  small: parseFloat(screens['pc-s'].max),
  tablet: parseFloat(screens['tablet'].max),
  mobile: parseFloat(screens['mb'].max),
  mobileSmall: parseFloat(screens['mb-s'].max),
} as const

export default () => {
  const getWidth = (): number => myGlobal.innerWidth
  const getHeight = (): number => myGlobal.innerHeight
  const width = ref(getWidth())
  const height = ref(getHeight())

  const handleChange = async () => {
    width.value = getWidth()
    height.value = getHeight()
  }

  onMounted(() => {
    myGlobal.addEventListener('resize', handleChange)
  })

  onUnmounted(() => {
    myGlobal.removeEventListener('resize', handleChange)
  })

  const getIsMediaTo = computed(() => (breakPoint: number) => width.value <= breakPoint)

  const isMediaTo = computed(() => {
    return Object.keys(breakPoints).reduce((acc, key) => {
      acc[key] = getIsMediaTo.value(breakPoints[key])

      return acc
    }, {} as { [key in keyof typeof breakPoints]: boolean })
  })

  return {
    breakPoints,
    getIsMediaTo,
    isMediaTo,
    isRetina: myGlobal && myGlobal.devicePixelRatio > 1,
    isMobile: computed(() => getIsMediaTo.value(breakPoints.mobile)),
    isTablet: computed(() => getIsMediaTo.value(breakPoints.tablet)),
  }
}
