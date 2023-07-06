import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@layouts", replacement: path.resolve(__dirname, "src/layouts") },
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
      { find: "@styles", replacement: path.resolve(__dirname, "src/styles") },
      { find: "@states", replacement: path.resolve(__dirname, "src/states") },

    ],
  },
});
