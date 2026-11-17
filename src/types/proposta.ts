// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Proposta: o agricultor oferece uma quantidade de um item da chamada.
import type { Agricultor } from '@/types/agricultor'
import type { ItemChamada } from '@/types/chamada'

export type StatusProposta = 'ENVIADA' | 'CONTRATADA' | 'RECUSADA'

// Resposta de POST /itens/{id}/propostas e de GET /agricultores/{id}/propostas
export interface Proposta {
  id: number
  quantidade: number
  // Calculado pela API: quantidade × preço do item
  valor: number
  dataEnvio: string
  status: StatusProposta
  dataContrato: string | null
  item: ItemChamada
  agricultor: Agricultor
}

// Corpo do POST. A API recebe o agricultor como objeto aninhado, só com o id.
export interface NovaProposta {
  agricultor: { id: number }
  quantidade: number
}
