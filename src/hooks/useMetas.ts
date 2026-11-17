// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Busca a situação da meta de 45% de todas as prefeituras cadastradas.
// A API não tem uma rota com todas as metas, então listamos as prefeituras e
// pedimos a meta de cada uma ao mesmo tempo (Promise.all).
import { useEffect, useState } from 'react'
import { getEntidades, getMetaDaEntidade } from '@/services/entidades'
import type { MetaEntidade } from '@/types/meta'

interface UseMetasResult {
  metas: MetaEntidade[]
  loading: boolean
  error: string | null
}

export function useMetas(): UseMetasResult {
  const [metas, setMetas] = useState<MetaEntidade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    getEntidades()
      .then((entidades) => Promise.all(entidades.map((entidade) => getMetaDaEntidade(entidade.id))))
      .then((todas) => {
        if (!active) return
        // Quem está mais perto da meta aparece primeiro
        setMetas([...todas].sort((a, b) => b.percentualContratado - a.percentualContratado))
      })
      .catch(() => active && setError('Não foi possível carregar a meta das prefeituras.'))
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [])

  return { metas, loading, error }
}
