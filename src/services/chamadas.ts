// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Chamadas à API sobre chamadas públicas. As páginas não conhecem nenhuma URL:
// só usam estas funções tipadas.
import { API, http } from '@/services/http'
import type { ChamadaPublica, ItemChamada, StatusChamada } from '@/types/chamada'

export const getChamadas = (status?: StatusChamada) =>
  http<ChamadaPublica[]>(`${API}/chamadas${status ? `?status=${status}` : ''}`)

export const getChamada = (id: number) => http<ChamadaPublica>(`${API}/chamadas/${id}`)

export const getItensDaChamada = (id: number) =>
  http<ItemChamada[]>(`${API}/chamadas/${id}/itens`)
