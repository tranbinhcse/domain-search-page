/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[arco-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#15a984',
        // 'page-background': '#F8FCFF',
        // 'white': '#ffffff',
        // 'black': '#181C32',
        // 'gray': '#666666',
        // 'gray-300': '#A3A3A3',
        // 'gray-50': '#F0F0F0',
        // 'green-500': '#24695C',
        // 'green-300': '#50CD89',
        // 'green-200': '#E7F6EE',
        // 'green-100': '#F2FDF7',
        // 'red-500': '#F1416C',
        // 'red-200': '#FCDDEC',
        // 'blue-500': '#009EF7',
        // 'purple-500': '#7239EA',
        // 'purple-200': '#DCCBFF',
      }
    },
  },
  plugins: [],
}

