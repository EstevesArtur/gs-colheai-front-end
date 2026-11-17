// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Busca a chamada pública aberta mais próxima de encerrar e os itens dela.
// É o que a Home mostra na "barraca" de preços.
import { useEffect, useState } from 'react'
import { getChamadas, getItensDaChamada } from '@/services/chamadas'
import type { ChamadaPublica, ItemChamada } from '@/types/chamada'

interface UseChamadaAbertaResult {
  // null quando nenhuma chamada está aberta
  chamada: ChamadaPublica | null
  itens: ItemChamada[]
  loading: boolean
  error: string | null
}

export function useChamadaAberta(): UseChamadaAbertaResult {
  const [chamada, setChamada] = useState<ChamadaPublica | null>(null)
  const [itens, setItens] = useState<ItemChamada[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    getChamadas('ABERTA')
      .then((abertas) => {
        if (abertas.length === 0) return null
        // A que encerra primeiro é a mais urgente para o agricultor
        const [primeira] = [...abertas].sort((a, b) =>
          a.dataEncerramento.localeCompare(b.dataEncerramento),
        )
        // Segunda requisição: os itens dessa chamada
        return getItensDaChamada(primeira.id).then((itensDaChamada) => {
          if (!active) return
          setChamada(primeira)
          setItens(itensDaChamada)
        })
      })
      // Sem esse catch, a API fora do ar deixaria a tela carregando para sempre
      .catch(() => active && setError('Não foi possível carregar a chamada aberta.'))
      .finally(() => active && setLoading(false))

    // Cleanup: evita setState em componente desmontado
    return () => {
      active = false
    }
  }, [])

  return { chamada, itens, loading, error }
}
