/* eslint-disable */
import type { Config } from "tailwindcss";
import svgToDataUri from "mini-svg-data-uri";
import colors from "tailwindcss/colors";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        black: {
          DEFAULT: "#000",
          100: "#000319",
          200: "rgba(17, 25, 40, 0.75)",
          300: "rgba(255, 255, 255, 0.125)",
        },
        white: {
          DEFAULT: "#FFF",
          100: "#BEC1DD",
          200: "#C1C2D3",
        },
        blue: {
          "100": "#E4ECFF",
        },
        purple: "#CBACF9",
        ...generateColorVariants([
          "border",
          "input",
          "ring",
          "background",
          "foreground",
          "primary",
          "secondary",
          "destructive",
          "muted",
          "accent",
          "popover",
          "card",
        ]),
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: generateKeyframes(),
      animation: generateAnimations(),
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    gridAndDotBackgrounds,
  ],
};

// Helper Functions
function generateColorVariants(keys: string[]) {
  const variants: Record<string, unknown> = {};
  keys.forEach((key) => {
    variants[key] = {
      DEFAULT: `hsl(var(--${key}))`,
      foreground: `hsl(var(--${key}-foreground))`,
    };
  });
  return variants;
}

function generateKeyframes() {
  return {
    "accordion-down": {
      from: { height: "0" },
      to: { height: "var(--radix-accordion-content-height)" },
    },
    "accordion-up": {
      from: { height: "var(--radix-accordion-content-height)" },
      to: { height: "0" },
    },
    shimmer: {
      from: { backgroundPosition: "0 0" },
      to: { backgroundPosition: "-200% 0" },
    },
    spotlight: {
      "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
      "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" },
    },
    moveVertical: {
      "0%": { transform: "translateY(-50%)" },
      "50%": { transform: "translateY(50%)" },
      "100%": { transform: "translateY(-50%)" },
    },
    scroll: { to: { transform: "translate(calc(-50% - 0.5rem))" } },
  };
}

function generateAnimations() {
  return {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
    spotlight: "spotlight 2s ease .75s 1 forwards",
    shimmer: "shimmer 2s linear infinite",
    moveVertical: "moveVertical 30s ease infinite",
    scroll: "scroll var(--animation-duration, 40s) linear infinite",
  };
}

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({ ":root": newVars });
}

function gridAndDotBackgrounds({ matchUtilities, theme }: any) {
  matchUtilities(
    {
      "bg-grid": (value: string) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100" height="100" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-grid-small": (value: string) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      "bg-dot": (value: string) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
        )}")`,
      }),
    },
    { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
  );
}

export default config;
