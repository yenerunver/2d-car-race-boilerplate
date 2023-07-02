/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FPS: string;
  readonly VITE_DEV_TOOLS: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
