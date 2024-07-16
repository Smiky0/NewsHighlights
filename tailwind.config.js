/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                display: ["Josefin Slab"],
            },
        },
    },
    plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
    daisyui: {
        themes: [
            {
                dark: {
                    primary: "#e88367",
                    secondary: "#f39c84",
                    "base-100": "#1b2226",
                },
            },
        ],
    },
};
