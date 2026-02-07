/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Change 'tailwindcss' to '@tailwindcss/postcss' 👇
    '@tailwindcss/postcss': {}, 
    autoprefixer: {},
  },
};

export default config;