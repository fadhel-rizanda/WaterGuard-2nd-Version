/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "1px 1px 10px rgba(0, 0, 0, 0.2)",
      },
      backgroundColor: {
        custom: "#408ead",
      },
      backgroundImage: {
        "no-data":
          "url('/ASSET/image-background/woman-looking-through-binoculars.jpg')",
        bgHomeFirst: "url('/ASSET/image-background/bgHomeFirst.jpg')",
        bgFAQ:
          "url('/ASSET/image-background/view-transparent-crystal-water.jpg')",
        bgAbout:
          "url('/ASSET/image-background/digital-art-with-planet-earth.jpg')",
        bgLogin: "url('/ASSET/image-background/2151587958.jpg')",
      },
      height: {
        custom: "450px",
      },
      transitionProperty: {
        padding: "padding",
      },
      padding: {
        transition: "0.3s ease-out",
      },
      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".text-shadow": {
            textShadow: "7px 7px 10px rgba(0, 0, 0, 0.5)",
          },
          ".no-scrollbar": {
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          },
          ".no-scrollbar::-webkit-scrollbar": {
            display: "none",
          },
        },
        {
          variants: ["responsive", "hover"],
        }
      );
    },
  ],
};
