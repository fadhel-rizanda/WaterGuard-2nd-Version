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
          "url('/ASSET/image-background/woman-looking-through-binoculars.jpg')", // Perhatikan path dan ekstensi gambar
      },
    },
  },
  plugins: [],
};
