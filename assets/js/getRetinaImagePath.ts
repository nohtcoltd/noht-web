import isRetinaDisplay from '~/assets/js/isRetinaDisplay'

export default (path) => (isRetinaDisplay ? path.replace(/(.*)\.(.*)$/g, '$1@2x.$2') : path)
