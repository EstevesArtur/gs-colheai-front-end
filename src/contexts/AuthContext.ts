// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Context da identificação do agricultor (Aula 10). Este arquivo só cria o
// "canal"; quem guarda o estado é o AuthProvider e quem lê é o hook useAuth.
// Ficam em arquivos separados porque o Fast Refresh do Vite pede que um
// arquivo .tsx exporte apenas componentes.
import { createContext } from 'react'
import type { Agricultor } from '@/types/agricultor'

export interface AuthContextValue {
  // null = ninguém identificado
  agricultor: Agricultor | null
  // Procura o CAF na API; lança Error com mensagem pronta se não encontrar
  entrar: (caf: string) => Promise<void>
  sair: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
