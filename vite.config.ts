import path from "node:path";
import { defineConfig } from "vite";
import tsConfigpaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsConfigpaths(),
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
			external: ["react"],
		},
	},
});
