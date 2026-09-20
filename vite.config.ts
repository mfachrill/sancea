import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    plugins: [
        tanstackRouter({
            target: "react",
            routesDirectory: "./resources/js/routes",
            generatedRouteTree: "./resources/js/routeTree.gen.ts",
            autoCodeSplitting: true,
        }),
        laravel({
            input: ["resources/css/app.css", "resources/js/app.tsx"],
            refresh: ["routes/**", "resources/views/**", "app/Http/Controllers/**"],
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: { "@": fileURLToPath(new URL("./resources/js", import.meta.url)) },
    },
    server: { host: "127.0.0.1", port: 5173, strictPort: true },
});
