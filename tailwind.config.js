/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      fontFamily: {
        'jakarta': ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        'gray-motive': '#f0f0f2',
        'text-black': '#15171a',
        'text-gray': '#a6aab3',
        'text-gray-2': '#6b7280',
        'line-dark': '#565b66',
        'gray-stroke': '#e1e3e6',
        'text-primary': '#256bfd',
        'button-disabled': '#9ebdfe',
        'bg-white': '#fbfbfb',
        'bg-gray': '#f3f3f3',
        'text-dark': '#303237',
      },
      borderRadius: {
        'button': '11px',
        'card': '12.373px',
        'switcher': '11px',
        'select': '7.874px',
      },
      fontSize: {
        'xs': ['12px', '22.496px'],
        'sm': ['15.747px', '26.995px'],
        'base': ['15.75px', '26.995px'],
        'lg': ['17.997px', '29.244px'],
        'xl': ['37px', '69.737px'],
      },
      spacing: {
        '2.25': '2.25px',
        '4.5': '4.499px',
        '6.75': '6.749px',
        '9': '8.998px',
        '13.5': '13.497px',
        '18': '17.997px',
        '27': '26.995px',
        '36': '35.993px',
      },
    },
  },
  plugins: [],
}
