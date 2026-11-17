// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Interfaces que espelham o JSON da API Java (conferido em 11/11/2026).

// EEx (Entidade Executora): a prefeitura que recebe o repasse e compra os alimentos
export interface EntidadeExecutora {
  id: number
  nome: string
  municipio: string
  uf: string
  codigoIbge: number
  repasseAnual: number
  anoRepasse: number
}

export type StatusChamada = 'ABERTA' | 'HOMOLOGADA' | 'FRACASSADA'

// GET /chamadas e GET /chamadas/{id}
export interface ChamadaPublica {
  id: number
  numeroEdital: string
  objeto: string
  dataAbertura: string // AAAA-MM-DD
  dataEncerramento: string // AAAA-MM-DD
  status: StatusChamada
  entidade: EntidadeExecutora
}

export type UnidadeMedida = 'KG' | 'UNIDADE' | 'MACO' | 'DUZIA'

export type CategoriaProduto = 'HORTALICA' | 'FRUTA' | 'RAIZ_TUBERCULO' | 'GRAO' | 'ORIGEM_ANIMAL'

export interface Produto {
  id: number
  nome: string
  categoria: CategoriaProduto
  unidadeMedida: UnidadeMedida
}

// GET /chamadas/{id}/itens: o que a prefeitura quer comprar e por quanto
export interface ItemChamada {
  id: number
  quantidadeDemandada: number
  precoUnitario: number
  chamada: { id: number }
  produto: Produto
}
