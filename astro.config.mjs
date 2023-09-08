import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import deno from "@astrojs/deno";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs()],
  output: "server",
  adapter: deno()
});