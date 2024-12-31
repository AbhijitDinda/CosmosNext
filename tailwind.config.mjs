/** @type {import('tailwindcss').Config} */


export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
				Primary: "#0f766e",
				Secondary: "#0f766e",
				Third: "#f97316",
				Fourth: "#f5f5f5",
				Error: "#ef4444",
				Success: "#10b981",
				Primary_Text: "#1f2937",
				Secondary_Text: "#6b7280",
				Lines: "#d1d5db",
				label: "#0369a1",
				Label_Background: "#e0f2fe",
				White: "#ffffff",
				TEXT_P: "#1F2937",
			},
			fontFamily: {
				OpenSans: ["Open Sans", "serif"],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};


// export default {
// 	darkMode: ["class"],
// 	content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
// 	theme: {
// 	  extend: {
// 		borderRadius: {
// 		  lg: "var(--radius)",
// 		  md: "calc(var(--radius) - 2px)",
// 		  sm: "calc(var(--radius) - 4px)",
// 		},
// 		colors: {
// 		  background: "hsl(var(--background))",
// 		  foreground: "hsl(var(--foreground))",
// 		  card: {
// 			DEFAULT: "hsl(var(--card))",
// 			foreground: "hsl(var(--card-foreground))",
// 		  },
// 		  popover: {
// 			DEFAULT: "hsl(var(--popover))",
// 			foreground: "hsl(var(--popover-foreground))",
// 		  },
// 		  primary: {
// 			DEFAULT: "hsl(var(--primary))",
// 			foreground: "hsl(var(--primary-foreground))",
// 		  },
// 		  secondary: {
// 			DEFAULT: "hsl(var(--secondary))",
// 			foreground: "hsl(var(--secondary-foreground))",
// 		  },
// 		  muted: {
// 			DEFAULT: "hsl(var(--muted))",
// 			foreground: "hsl(var(--muted-foreground))",
// 		  },
// 		  accent: {
// 			DEFAULT: "hsl(var(--accent))",
// 			foreground: "hsl(var(--accent-foreground))",
// 		  },
// 		  destructive: {
// 			DEFAULT: "hsl(var(--destructive))",
// 			foreground: "hsl(var(--destructive-foreground))",
// 		  },
// 		  border: "hsl(var(--border))",
// 		  input: "hsl(var(--input))",
// 		  ring: "hsl(var(--ring))",
// 		  chart: {
// 			1: "hsl(var(--chart-1))",
// 			2: "hsl(var(--chart-2))",
// 			3: "hsl(var(--chart-3))",
// 			4: "hsl(var(--chart-4))",
// 			5: "hsl(var(--chart-5))",
// 		  },
// 		  Primary: "#0f766e",
// 		  Secondary: "#0f766e",
// 		  Third: "#f97316",
// 		  Fourth: "#f5f5f5",
// 		  Error: "#ef4444",
// 		  Success: "#10b981",
// 		  Primary_Text: "#1f2937",
// 		  Secondary_Text: "#6b7280",
// 		  Lines: "#d1d5db",
// 		  label: "#0369a1",
// 		  Label_Background: "#e0f2fe",
// 		  White: "#ffffff",
// 		  TEXT_P: "#1F2937",
// 		},
// 		fontFamily: {
// 		  OpenSans: ["Open Sans", "serif"],
// 		},
// 	  },
// 	},
// 	plugins: [tailwindcssAnimate],
//   };