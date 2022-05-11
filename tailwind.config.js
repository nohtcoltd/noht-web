const plugin = require('tailwindcss/plugin.js')

module.exports = {
  content: () => [
    './components/**/*.{js,jsx,ts,tsx,vue}',
    './pages/**/*.{js,jsx,ts,tsx,vue}',
    './layouts/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {},
    screens: {
      'pc-l': { max: '1400px' },
      'pc-m': { max: '1200px' },
      'pc-s': { max: '1024px' },
      pc: { min: '751px' },
      mb: { max: '750px' },
      'mb-s': { max: '520px' },
    },
  },

  variants: {
    extend: {},
  },

  plugins: [
    plugin(({ addVariant, addBase, e, addUtilities }) => {
      addVariant('my-hover', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `
            html.no-touch .my-hover${e(`${separator}${className}`)}:hover,
            html.touch .my-hover${e(`${separator}${className}`)}:active`
        })
      })

      addBase({
        h1: {
          fontWeight: 600,
        },
        h2: {
          fontWeight: 600,
        },
        h3: {
          fontWeight: 600,
        },
        h4: {
          fontWeight: 600,
        },
        h5: {
          fontWeight: 600,
        },
        h6: {
          fontWeight: 600,
        },
        h7: {
          fontWeight: 600,
        },
        h8: {
          fontWeight: 600,
        },
        video: {
          filter: 'drop-shadow(0 0 #000000)',
        },
      })

      const flex = {
        'flex-direction': ['column', 'row', 'column-reverse', 'row-reverse'],
        'flex-wrap': ['wrap', 'nowrap'],
        'justify-content': [
          'flex-start',
          'flex-end',
          'center',
          'space-between',
          'space-arround',
          'space-evenry',
          'stretch',
        ],
        'align-items': ['flex-start', 'flex-end', 'center', 'stretch'],
        'align-content': [
          'flex-start',
          'flex-end',
          'center',
          'space-between',
          'space-arround',
          'space-evenry',
          'stretch',
        ],
      }

      const flexClassName = (value) => {
        const map = {
          column: 'col',
          'column-reverse': 'col-reverse',
          'flex-start': 'start',
          'flex-end': 'end',
          'space-between': 'between',
          'space-arround': 'arround',
          'space-evenry': 'evenry',
        }

        return map[value] || value
      }

      const combine = (list, n = 0, result = [], current = []) => {
        if (n === list.length) {
          result.push(current)
        } else {
          list[n].forEach((item) => combine(list, n + 1, result, [...current, item]))
        }

        return result
      }

      const flexFlow = combine([flex['flex-direction'], flex['flex-wrap']]).reduce((acc, values) => {
        acc[`.fl-${values.map(flexClassName).join('-')}`] = {
          display: 'flex',
          'flex-direction': values[0],
          'flex-wrap': values[1],
        }

        return acc
      }, {})

      const flexPlace = combine([flex['justify-content'], flex['align-items'], flex['align-content']]).reduce(
        (acc, values) => {
          acc[`.fl-${values.map(flexClassName).join('-')}`] = {
            'justify-content': values[0],
            'align-items': values[1],
            'align-content': values[2],
          }

          return acc
        },
        {},
      )

      const breakKeepAll = {
        '.break-keep-all': { 'word-break': 'keep-all' },
      }

      addUtilities({ ...flexFlow, ...flexPlace, ...breakKeepAll })
    }),
  ],
}
