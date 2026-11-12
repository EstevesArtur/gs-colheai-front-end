/// <reference types="vite/client" />

// Tipagem das variáveis de ambiente (Aula 10). Tudo com VITE_ é público:
// URL pode, senha nunca.
interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_IA_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
