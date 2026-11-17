// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Busca as propostas do agricultor identificado. Serve para a conta do limite
// de R$ 40 mil e para a página Minhas propostas.
import { useEffect, useState } from 'react'
import { getPropostasDoAgricultor } from '@/services/propostas'
import type { Proposta } from '@/types/proposta'

interface UsePropostasResult {
  propostas: Proposta[]
  loading: boolean
  error: string | null
  // Busca de novo, depois de enviar ou retirar uma proposta
  recarregar: () => void
}

// agricultorId null = ninguém identificado: não busca nada
export function usePropostasDoAgricultor(agricultorId: number | null): UsePropostasResult {
  const [propostas, setPropostas] = useState<Proposta[]>([])
  const [loading, setLoading] = useState(agricultorId !== null)
  const [error, setError] = useState<string | null>(null)
  // Mudar este número faz o useEffect rodar de novo
  const [versao, setVersao] = useState(0)

  useEffect(() => {
    if (agricultorId === null) return

    let active = true

    getPropostasDoAgricultor(agricultorId)
      .then((lista) => {
        if (!active) return
        setPropostas(lista)
        setError(null)
      })
      .catch(() => active && setError('Não foi possível carregar suas propostas.'))
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [agricultorId, versao])

  return {
    // Se a pessoa saiu, a lista antiga não pode continuar aparecendo
    propostas: agricultorId === null ? [] : propostas,
    loading: agricultorId === null ? false : loading,
    error,
    recarregar: () => setVersao((atual) => atual + 1),
  }
}
