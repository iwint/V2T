/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.{js,jsx,ts,tsx}',
    './src/**/**/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      primary_color: '#DE2121',
    },
    extend: {},
  },
  plugins: ['nativewind/babel'],
};
