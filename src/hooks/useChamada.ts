// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Busca uma chamada pública e os itens dela, pelo id que vem da URL.
import { useEffect, useState } from 'react'
import { getChamada, getItensDaChamada } from '@/services/chamadas'
import { HttpError } from '@/services/http'
import type { ChamadaPublica, ItemChamada } from '@/types/chamada'

interface UseChamadaResult {
  chamada: ChamadaPublica | null
  itens: ItemChamada[]
  loading: boolean
  error: string | null
  // true quando o id não existe (404): é diferente de erro de conexão
  notFound: boolean
}

export function useChamada(id: number): UseChamadaResult {
  const [chamada, setChamada] = useState<ChamadaPublica | null>(null)
  const [itens, setItens] = useState<ItemChamada[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let active = true

    // As duas requisições saem juntas; o then só roda quando as duas chegam
    Promise.all([getChamada(id), getItensDaChamada(id)])
      .then(([chamadaDaApi, itensDaApi]) => {
        if (!active) return
        setChamada(chamadaDaApi)
        setItens(itensDaApi)
      })
      .catch((falha) => {
        if (!active) return
        // 404 (id inexistente) e 400 (id que não é número) viram "não existe"
        if (falha instanceof HttpError && (falha.status === 404 || falha.status === 400)) {
          setNotFound(true)
        } else {
          setError('Não foi possível carregar esta chamada.')
        }
      })
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
    // [id]: se a URL mudar de /chamadas/3 para /chamadas/5, busca de novo
  }, [id])

  return { chamada, itens, loading, error, notFound }
}
