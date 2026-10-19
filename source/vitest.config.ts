import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.{mjs,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/App.tsx", "src/answerEvaluation.ts"],
      reporter: ["text", "json-summary", "html"],
    },
  },
});
