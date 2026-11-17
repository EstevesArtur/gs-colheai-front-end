// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Agricultor familiar (ou grupo) como a API devolve em GET /agricultores.

export type TipoFornecedor = 'INDIVIDUAL' | 'GRUPO_INFORMAL' | 'GRUPO_FORMAL'

export interface Agricultor {
  id: number
  nome: string
  // CAF: Cadastro Nacional da Agricultura Familiar, a "identidade" do agricultor
  caf: string
  tipoFornecedor: TipoFornecedor
  // Famílias no CAF: 1 para individual; N para cooperativa (o limite é N × R$ 40 mil)
  quantidadeFamilias: number
  municipio: string
  uf: string
  distrito?: string
  organico: boolean
  telefone?: string
  dataCadastro: string
}
