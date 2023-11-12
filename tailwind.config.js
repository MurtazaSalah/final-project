/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{html,js}",
      "./src/*.{html,js}",
      "./*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
      require("daisyui"),
  ],
    // daisyUI config (optional)
  daisyui: {
      styled: true,
      themes: [ "cupcake","dracula"],
      base: true,
      utils: true,
      logs: true,
      rtl: false,
      prefix: "",
      darkTheme: "dark",
  },
}
