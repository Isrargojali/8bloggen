// tailwind.config.js
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}", // adjust if needed
    ],
    theme: {
      extend: {},
    },
    plugins: [
      // eslint-disable-next-line no-undef
      require('@tailwindcss/typography'), // 👈 Add this line
    ],
  };
  