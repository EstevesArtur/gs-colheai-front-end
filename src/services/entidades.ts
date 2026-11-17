// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Chamadas à API sobre as prefeituras (EEx) e a meta de 45%.
import { API, http } from '@/services/http'
import type { EntidadeExecutora } from '@/types/chamada'
import type { MetaEntidade } from '@/types/meta'

export const getEntidades = () => http<EntidadeExecutora[]>(`${API}/entidades`)

export const getMetaDaEntidade = (id: number) => http<MetaEntidade>(`${API}/entidades/${id}/meta`)
