import {
  ref,
  useRoute,
  useRouter,
  computed,
  provide,
  InjectionKey,
  ComponentInstance,
  onMounted,
  onUnmounted,
  nextTick,
} from '#app'
import { Route } from 'vue-router'
import getScrollbarWidth from '~/assets/js/getScrollbarWidth'
import myGlobal from '~/assets/js/myGlobal'
import TurnBox from '~/components/widgets/TurnBox.vue'
import useMediaQuery from '~/composables/useMediaQuery'

type TurnBoxProps = InstanceType<typeof TurnBox>['$props']
type Face = TurnBoxProps['value']
type RouteName = Route['name']
type Handle = (prev?: Face, next?: Face, lastFace?: Face) => void
type PageInstance = ComponentInstance

const startRotationHandles: Handle[] = []
const completeRotationHandles: Handle[] = []
const completeRotateForwardHandles: Handle[] = []
const completeRotateBackwardHandles: Handle[] = []

export const addStartRotationHandle: InjectionKey<(Handle) => void> = Symbol('addHandle:completeRotation')
export const addCompleteRotationHandle: InjectionKey<(Handle) => void> = Symbol('addHandle:completeRotation')
export const addCompleteForwardRotationHandle: InjectionKey<(Handle) => void> = Symbol(
  'addHandle:completeForwardRotation',
)
export const addCompleteBackwardRotationHandle: InjectionKey<(Handle) => void> = Symbol(
  'addHandle:completeBackwardRotation',
)

let windowResizingTimer = null

export default () => {
  const { isTablet } = useMediaQuery()
  const route = useRoute()
  const router = useRouter()

  const routeToFace: { [key in RouteName]: Face } = {
    index: 1,
    about: 2,
    contact: 3,
  }

  const $el = ref<HTMLElement>(null)
  const $index = ref<PageInstance>(null)
  const $about = ref<PageInstance>(null)
  const $contact = ref<PageInstance>(null)
  const reservedRoute = ref<RouteName>(null)
  const shouldMobileNaviOpened = ref(false)
  const isMobileNaviOpened = computed(() => shouldMobileNaviOpened.value && isTablet.value)
  const currentFace = computed((): Face => (isMobileNaviOpened.value ? 4 : routeToFace[route.name]))
  const rotatingFaces = ref<Face[]>([])
  const isRotating = computed(() => rotatingFaces.value.length !== 0)
  const lastFace = ref<Face>(currentFace.value)
  const lastRoute = ref<RouteName>(route.name)
  const isWindowResizing = ref(false)
  const tmpScrollTop = ref(0)
  const duration = computed((): TurnBoxProps['duration'] => {
    if (isWindowResizing.value) {
      return 0
    }
    return isTablet.value ? 500 : 1000
  })
  const isReversed = computed((): TurnBoxProps['isReversed'] => {
    if (lastFace.value === 4 && lastRoute.value !== route.name) {
      return false
    }

    return currentFace.value < lastFace.value
  })

  const faceToPage = computed((): { [key in Face]: PageInstance } => ({
    1: $index.value,
    2: $about.value,
    3: $contact.value,
  }))

  const handleResizeWindow = async () => {
    clearTimeout(windowResizingTimer)
    isWindowResizing.value = true
    windowResizingTimer = setTimeout(() => (isWindowResizing.value = false), 200)
  }

  onMounted(() => {
    myGlobal.addEventListener('resize', handleResizeWindow)
  })

  onUnmounted(() => {
    myGlobal.removeEventListener('resize', handleResizeWindow)
  })

  const openMobileNavi = () => (shouldMobileNaviOpened.value = true)
  const closeMobileNavi = () => (shouldMobileNaviOpened.value = false)

  const startRotation: Handle = (prev, next) => {
    rotatingFaces.value = [prev, next]

    tmpScrollTop.value = $el.value.scrollTop
    const $prev = faceToPage.value[prev]?.$el as HTMLElement

    if (!$prev) {
      return
    }

    $prev.style.transform = `translateY(-${tmpScrollTop.value}px)`
    $prev.style.height = `100vh`
    $el.value.style.overflow = 'hidden'
    $el.value.style.height = '100vh'
    $el.value.style.width = `${$el.value.clientWidth - getScrollbarWidth()}px`
    $el.value.scrollTop = 0

    startRotationHandles.forEach((handle: Handle) => handle(prev, next))
  }

  const completeRotation: Handle = async (prev, next) => {
    rotatingFaces.value = []

    $el.value.style.overflow = ''
    $el.value.style.height = ''
    $el.value.style.width = ''

    Object.keys(faceToPage.value).forEach((face) => {
      faceToPage.value[face].$el.style.transform = ''
      faceToPage.value[face].$el.style.height = ''
    })

    tmpScrollTop.value = 0

    if (reservedRoute.value !== route.name) {
      router.replace({ name: reservedRoute.value }).catch(() => {})
    }

    completeRotationHandles.forEach((handle: Handle) => handle(prev, next))
  }

  const completeRotateForward: Handle = async (prev, next) => {
    completeRotateForwardHandles.forEach((handle: Handle) => handle(prev, next))
    lastFace.value = next
    lastRoute.value = route.name
  }

  const completeRotateBackward: Handle = async (prev, next) => {
    $el.value.scrollTop = tmpScrollTop.value

    completeRotateBackwardHandles.forEach((handle: Handle) => handle(prev, next))
  }

  router.beforeEach((to, from, next) => {
    if (shouldMobileNaviOpened.value) {
      closeMobileNavi()
      next()
      return
    }

    if (isRotating.value && !rotatingFaces.value.includes(routeToFace[to.name])) {
      reservedRoute.value = to.name
      return
    }

    reservedRoute.value = null

    next()
  })

  provide(addStartRotationHandle, (handle: Handle) => startRotationHandles.push(handle))
  provide(addCompleteRotationHandle, (handle: Handle) => completeRotationHandles.push(handle))
  provide(addCompleteForwardRotationHandle, (handle: Handle) => completeRotateForwardHandles.push(handle))
  provide(addCompleteBackwardRotationHandle, (handle: Handle) => completeRotateBackwardHandles.push(handle))

  return {
    $index,
    $about,
    $contact,
    $navi,
    isRotating,
    perspective,
    duration,
    isReversed,
    currentFace,
    startRotation,
    completeRotation,
    completeRotateForward,
    completeRotateBackward,
    openMobileNavi,
    closeMobileNavi,
  }
}
