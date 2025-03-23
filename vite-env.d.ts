/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />


interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_OTHER_KEY?: string; // Agrega todas tus variables aquí
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
