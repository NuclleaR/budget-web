/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PARSE_SERVER: string;
  readonly VITE_PARSE_SERVER_DEV: string;
  readonly VITE_LIVE_SERVER: string;
  readonly VITE_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
