import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) return "vendor-react";
            if (id.includes("lodash")) return "vendor-lodash";
            return "vendor"; // Move third-party libraries to a separate chunk
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Optional: Increase chunk warning limit
  },
});

