// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Chamadas à API sobre agricultores.
import { API, http } from '@/services/http'
import type { Agricultor } from '@/types/agricultor'

export const getAgricultores = () => http<Agricultor[]>(`${API}/agricultores`)

// A API não tem busca por CAF, então pedimos a lista e procuramos aqui.
// Devolve null quando o CAF não está cadastrado.
export async function buscarAgricultorPorCaf(caf: string): Promise<Agricultor | null> {
  const procurado = caf.trim().toUpperCase()
  const agricultores = await getAgricultores()
  return agricultores.find((agricultor) => agricultor.caf.toUpperCase() === procurado) ?? null
}
