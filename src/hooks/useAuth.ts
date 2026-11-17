// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Atalho para ler o Context de autenticação, com o use() do React 19 (Aula 10).
import { use } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export function useAuth() {
  const contexto = use(AuthContext)

  // Erro claro para quem esquecer o Provider em volta do componente
  if (!contexto) {
    throw new Error('useAuth precisa estar dentro de <AuthProvider>.')
  }

  return contexto
}
