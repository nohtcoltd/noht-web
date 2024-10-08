import { InjectionKey } from 'vue'
import { ComponentInstance } from '@vue/devtools-api'
import { RouteRecordName } from 'vue-router'
import TurnBox from '~/components/widgets/TurnBox.vue'
import useMediaQuery from '~/composables/useMediaQuery'

type TurnBoxProps = InstanceType<typeof TurnBox>['$props']
type Face = TurnBoxProps['currentFace']
type RouteName = RouteRecordName
type Handle = (prev?: Face, next?: Face) => void
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

  const $index = ref<PageInstance>(null)
  const $about = ref<PageInstance>(null)
  const $contact = ref<PageInstance>(null)
  const $navi = ref<HTMLElement>(null)
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
  const $scrollContainer = computed(() => globalThis.document.documentElement)
  const duration = computed((): TurnBoxProps['duration'] => {
    if (isWindowResizing.value) {
      return 0
    }

    return isTablet.value ? 600 : 900
  })
  const isReversed = computed((): TurnBoxProps['isReversed'] => {
    if (lastFace.value === 4 && lastRoute.value !== route.name) {
      return false
    }

    return currentFace.value < lastFace.value
  })
  const perspective = computed(() => (isTablet.value ? 2000 : 5000))
  const faceToDom = computed((): { [key in Face]: HTMLElement } => ({
    1: $index.value.$el as HTMLElement,
    2: $about.value.$el as HTMLElement,
    3: $contact.value.$el as HTMLElement,
    4: $navi.value,
  }))

  const handleResizeWindow = async () => {
    clearTimeout(windowResizingTimer)
    isWindowResizing.value = true

    if (!isTablet.value) {
      closeMobileNavi()
    }
    windowResizingTimer = setTimeout(() => (isWindowResizing.value = false), 200)
  }

  onMounted(() => {
    globalThis.addEventListener('resize', handleResizeWindow)
  })

  onUnmounted(() => {
    globalThis.removeEventListener('resize', handleResizeWindow)
  })

  const openMobileNavi = () => {
    if (isRotating.value) {
      return
    }

    shouldMobileNaviOpened.value = true
    $scrollContainer.value.style.overflow = 'hidden'
  }
  const closeMobileNavi = () => {
    shouldMobileNaviOpened.value = false
    $scrollContainer.value.style.overflow = ''
  }

  const startRotation: Handle = async (prev, next) => {
    rotatingFaces.value = [prev, next]

    tmpScrollTop.value = globalThis.scrollY

    const height = globalThis.innerHeight
    const $prev = faceToDom.value[prev]

    $prev.style.height = `${height}px`

    await nextTick()
    $prev.scroll(0, tmpScrollTop.value)

    startRotationHandles.forEach((handle: Handle) => handle(prev, next))
  }

  const completeRotation: Handle = async (prev, next) => {
    rotatingFaces.value = []

    Object.keys(faceToDom.value).forEach((face) => {
      faceToDom.value[face].style.transform = ''
      faceToDom.value[face].style.height = ''
    })

    if (reservedRoute.value !== route.name) {
      router.replace({ name: reservedRoute.value }).catch(() => {})
    }

    completeRotationHandles.forEach((handle: Handle) => handle(prev, next))
  }

  const completeRotateForward: Handle = async (prev, next) => {
    faceToDom.value[prev].scroll(0, 0)

    tmpScrollTop.value = 0

    completeRotateForwardHandles.forEach((handle: Handle) => handle(prev, next))
    lastFace.value = next
    lastRoute.value = route.name
  }

  const completeRotateBackward: Handle = async (prev, next) => {
    const scrollY = tmpScrollTop.value
    await nextTick()
    globalThis.scrollTo(0, scrollY)
    completeRotateBackwardHandles.forEach((handle: Handle) => handle(prev, next))
  }

  router.afterEach((to, from) => {
    if (to.name !== from.name && shouldMobileNaviOpened.value) {
      closeMobileNavi()
      return
    }
  })

  router.beforeEach(async (to, from, next) => {
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
