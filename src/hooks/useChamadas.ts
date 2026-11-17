// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Busca todas as chamadas públicas. O filtro (abertas, por prefeitura) é feito
// na página, como estado derivado: uma requisição só e nenhuma espera ao filtrar.
import { useEffect, useState } from 'react'
import { getChamadas } from '@/services/chamadas'
import type { ChamadaPublica } from '@/types/chamada'

interface UseChamadasResult {
  chamadas: ChamadaPublica[]
  loading: boolean
  error: string | null
}

export function useChamadas(): UseChamadasResult {
  const [chamadas, setChamadas] = useState<ChamadaPublica[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    getChamadas()
      .then((todas) => {
        if (!active) return
        // As que encerram mais tarde (as mais recentes) aparecem primeiro
        setChamadas([...todas].sort((a, b) => b.dataEncerramento.localeCompare(a.dataEncerramento)))
      })
      .catch(() => active && setError('Não foi possível carregar as chamadas.'))
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [])

  return { chamadas, loading, error }
}
