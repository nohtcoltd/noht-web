import { useRoute, ref, inject, onMounted, computed, ComponentInstance, onUnmounted } from '#app'
import { addCompleteForwardRotationHandle } from '~/composables/useTurnPage'
import useMediaQuery from '~/composables/useMediaQuery'

export default () => {
  const route = useRoute()
  const currentFace = ref(1)
  const $box = ref<ComponentInstance>(null)
  const isRotating = ref(false)
  const isRotationEnabled = ref(true)
  const pointerMovingDistance = ref<{ x: number; y: number } | null>(null)
  const { isRetina } = useMediaQuery()

  const resetPoint = () => {
    isRotationEnabled.value = true
    pointerMovingDistance.value = null
  }

  const inIndex = computed(() => route.name === 'index')

  const changeCurrentFace = (val) => {
    if (!isRotating.value && isRotationEnabled.value && inIndex.value) {
      currentFace.value = val
    }

    resetPoint()
  }

  const handlePointerDown = () => (pointerMovingDistance.value = { x: 0, y: 0 })

  const handlePointerMove = ({ movementX, movementY }: PointerEvent) => {
    if (!pointerMovingDistance.value || !isRotationEnabled.value) {
      return
    }

    pointerMovingDistance.value = {
      x: pointerMovingDistance.value.x + Math.abs(movementX),
      y: pointerMovingDistance.value.y + Math.abs(movementY),
    }

    if (pointerMovingDistance.value.x + pointerMovingDistance.value.y > 50) {
      isRotationEnabled.value = false
    }
  }

  const handlePointerup = async ({ target }: PointerEvent) => {
    if (isRotationEnabled.value) {
      return
    }

    if (!(target instanceof HTMLElement)) {
      return
    }

    if ($box.value && $box.value.$el.contains(target)) {
      return
    }

    resetPoint()
  }

  onMounted(() => {
    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    })
    window.addEventListener('pointerup', handlePointerup, {
      passive: true,
    })
  })

  onUnmounted(() => {
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerup)
  })

  const startRotation = () => (isRotating.value = true)
  const completeRotation = () => (isRotating.value = false)

  const addHandle = inject(addCompleteForwardRotationHandle)

  const duration = computed(() => (inIndex.value ? 500 : 0))

  addHandle(() => {
    currentFace.value = 1
  })

  return {
    $box,
    currentFace,
    duration,
    isRotating,
    changeCurrentFace,
    startRotation,
    completeRotation,
    handlePointerDown,
    retinaUrl: computed(() => (imageUrl) => isRetina ? imageUrl.replace(/(.*)\.(.*)$/g, '$1@2x.$2') : imageUrl),
  }
}
