import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "dist",
		rollupOptions: {
			input: "index.html", // Ensure this points to your actual index.html
		},
	},
	server: {
		open: true, // Automatically open the app in the browser on server start
	},
});
