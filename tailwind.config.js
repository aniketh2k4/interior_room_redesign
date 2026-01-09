/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

    // shadcn/ui components
    "./node_modules/@shadcn/ui/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
  DEFAULT: "oklch(var(--primary) / <alpha-value>)",
  foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
},
primary: {
  DEFAULT: "oklch(var(--primary) / <alpha-value>)",
  foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
},
secondary: {
  DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
  foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
},
destructive: {
  DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
  foreground: "oklch(var(--destructive-foreground) / <alpha-value>)",
},
muted: {
  DEFAULT: "oklch(var(--muted) / <alpha-value>)",
  foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
},
accent: {
  DEFAULT: "oklch(var(--accent) / <alpha-value>)",
  foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
},
popover: {
  DEFAULT: "oklch(var(--popover) / <alpha-value>)",
  foreground: "oklch(var(--popover-foreground) / <alpha-value>)",
},
card: {
  DEFAULT: "oklch(var(--card) / <alpha-value>)",
  foreground: "oklch(var(--card-foreground) / <alpha-value>)",
},
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
  },
  plugins: [require("tailwindcss-animate")],
};
