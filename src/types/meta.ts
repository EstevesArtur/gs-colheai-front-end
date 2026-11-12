// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
import type { EntidadeExecutora } from '@/types/chamada'

// GET /entidades/{id}/meta: quanto do repasse federal a prefeitura já comprou
// da agricultura familiar. A meta é 45% do repasse (Lei 15.226/2025).
export interface MetaEntidade {
  entidade: EntidadeExecutora
  ano: number
  repasse: number
  meta: number
  contratado: number
  // Porcentagem do REPASSE (0 a 100), não da meta
  percentualContratado: number
  falta: number
  metaAtingida: boolean
}
