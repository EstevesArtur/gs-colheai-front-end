// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Guarda quem é o agricultor identificado e entrega para a árvore inteira.
//
// Limitação assumida: é uma identificação SIMULADA. Não tem senha nem token,
// porque o CAF não é segredo e a API do projeto não tem autenticação.
// Num produto real, a entrada seria pelo login gov.br.
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import type { AuthContextValue } from '@/contexts/AuthContext'
import { buscarAgricultorPorCaf } from '@/services/agricultores'
import type { Agricultor } from '@/types/agricultor'

const CHAVE = 'colheai:agricultor'

// Lê a sessão salva. O try/catch cobre navegador sem localStorage e JSON corrompido.
function lerSessao(): Agricultor | null {
  try {
    const salvo = localStorage.getItem(CHAVE)
    return salvo ? (JSON.parse(salvo) as Agricultor) : null
  } catch {
    return null
  }
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Função no useState: lê o localStorage só na primeira renderização.
  // É isso que mantém o agricultor identificado depois do F5.
  const [agricultor, setAgricultor] = useState<Agricultor | null>(lerSessao)

  // useMemo: o objeto só muda quando o agricultor muda, e assim quem usa o
  // Context não renderiza de novo à toa
  const value = useMemo<AuthContextValue>(() => {
    async function entrar(caf: string) {
      const encontrado = await buscarAgricultorPorCaf(caf)
      if (!encontrado) {
        throw new Error('Não encontramos esse CAF. Confira o número e tente de novo.')
      }
      try {
        localStorage.setItem(CHAVE, JSON.stringify(encontrado))
      } catch {
        // sem localStorage a sessão vale só até fechar a aba
      }
      setAgricultor(encontrado)
    }

    function sair() {
      try {
        localStorage.removeItem(CHAVE)
      } catch {
        // nada a limpar
      }
      setAgricultor(null)
    }

    return { agricultor, entrar, sair }
  }, [agricultor])

  return <AuthContext value={value}>{children}</AuthContext>
}
