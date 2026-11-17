// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Chamadas à API sobre propostas: consulta (GET), envio (POST) e retirada (DELETE).
import { API, http } from '@/services/http'
import type { NovaProposta, Proposta } from '@/types/proposta'

export const getPropostasDoAgricultor = (agricultorId: number) =>
  http<Proposta[]>(`${API}/agricultores/${agricultorId}/propostas`)

// Respostas possíveis: 201 (criada), 400 (dado inválido), 404 (item ou agricultor
// não existe) e 409 (regra de negócio: passou do limite de R$ 40 mil, chamada
// fechada ou proposta repetida para o mesmo item).
export function enviarProposta(itemId: number, agricultorId: number, quantidade: number) {
  const corpo: NovaProposta = { agricultor: { id: agricultorId }, quantidade }

  return http<Proposta>(`${API}/itens/${itemId}/propostas`, {
    method: 'POST',
    body: JSON.stringify(corpo),
  })
}

// 204 sem corpo: por isso o tipo é void
export const retirarProposta = (propostaId: number) =>
  http<void>(`${API}/propostas/${propostaId}`, { method: 'DELETE' })
