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
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".no-scrollbar": {
            "-ms-overflow-style": "none" /* For Internet Explorer and Edge */,
            "scrollbar-width": "none" /* For Firefox */,
          },
          ".no-scrollbar::-webkit-scrollbar": {
            display: "none" /* For Chrome, Safari, and Opera */,
          },
        },
        ["responsive", "hover"]
      ); // Optionally add variants like responsive and hover
    },
  ],
};
