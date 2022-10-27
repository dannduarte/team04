/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        "./src/components/Games/*.{html,js,vue}",
        "./src/components/Auth/*.{html,js,vue}",
        "./src/components/Board/*.{html,js,vue}",
        "./src/components/*.{html,js,vue}",
        "./src/App.vue"],

  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
    daisyui: {
        themes: ["night"],
    },
}
