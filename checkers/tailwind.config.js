/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    purge: ["./src/components/Games/*.{html,js,vue}",
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
