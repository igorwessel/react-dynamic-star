import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig((env) => ({
	define:
		env.command === "build"
			? { "process.env.NODE_ENV": "'production'" }
			: undefined,
	plugins: [
		react(),
		dts({
			include: ["lib/main.tsx"],
			beforeWriteFile: (filePath, content) => ({
				filePath: filePath.replace(/(\/|\\)lib/, "").replace("main", "rds"),
				content,
			}),
		}),
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, "lib/main.tsx"),
			name: "ReactDynamicStar",
			fileName: (format) => `rds.${format}.js`,
		},
		rollupOptions: {
			external: ["react", "react/jsx-runtime", "react-dom"],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					react: "react",
					"react-dom": "ReactDOM",
					"react/jsx-runtime": "react/jsx-runtime",
				},
			},
		},
	},
}));
