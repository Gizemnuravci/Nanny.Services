import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Nanny.Services/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/firebase")) return "vendor-firebase";
          if (id.includes("node_modules/react-router-dom") || id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) return "vendor-react";
          if (id.includes("node_modules/@reduxjs") || id.includes("node_modules/react-redux") || id.includes("node_modules/redux-persist")) return "vendor-redux";
          if (id.includes("node_modules/lucide-react") || id.includes("node_modules/react-icons")) return "vendor-icons";
          if (id.includes("node_modules/formik") || id.includes("node_modules/react-hook-form") || id.includes("node_modules/@hookform") || id.includes("node_modules/yup")) return "vendor-forms";
        },
      },
    },
  },
});
