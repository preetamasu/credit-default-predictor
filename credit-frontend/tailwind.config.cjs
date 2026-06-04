/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  // Safelist common utilities to ensure they are emitted during dev
  safelist: [
    'p-4',
    'mb-4',
    'rounded',
    'shadow',
    'bg-sky-50',
    'bg-indigo-600',
    'text-white',
    'text-gray-500',
    'dark:bg-gray-800',
    'dark:text-gray-100',
    { pattern: /^bg-/ },
    { pattern: /^text-/ },
    { pattern: /^p-/ },
    { pattern: /^m-/ },
    { pattern: /^grid-/ },
    { pattern: /^gap-/ },
  ],
  plugins: [],
}
