// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Funções de formatação usadas em várias telas.
import type { CategoriaProduto, UnidadeMedida } from '@/types/chamada'

// 7.5 -> "R$ 7,50"
export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// 7.5 -> "7,50" (sem o R$, para a plaquinha de preço)
export function formatarPreco(valor: number): string {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// 25000 -> "25.000"
export function formatarNumero(valor: number): string {
  return valor.toLocaleString('pt-BR', { maximumFractionDigits: 2 })
}

// 42627200 -> "R$ 42,6 milhões"; 30650 -> "R$ 30.650"
export function formatarMoedaCurta(valor: number): string {
  if (valor >= 1_000_000) {
    const milhoes = (valor / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })
    return `R$ ${milhoes} ${valor >= 2_000_000 ? 'milhões' : 'milhão'}`
  }
  return `R$ ${valor.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`
}

// 46.07 -> "46,07%"
export function formatarPercentual(valor: number): string {
  return `${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
}

// A API manda "2026-11-27". Montamos a data com hora local para o dia não
// "voltar um" por causa do fuso horário.
function paraData(dataIso: string): Date {
  const [ano, mes, dia] = dataIso.split('-').map(Number)
  return new Date(ano, mes - 1, dia)
}

// "2026-11-27" -> "27/11/2026"
export function formatarData(dataIso: string): string {
  return paraData(dataIso).toLocaleDateString('pt-BR')
}

// "2026-11-27" -> "27/11"
export function formatarDiaMes(dataIso: string): string {
  return paraData(dataIso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

// Quantos dias faltam até a data (0 = é hoje; negativo = já passou)
export function diasAte(dataIso: string): number {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const umDia = 24 * 60 * 60 * 1000
  return Math.round((paraData(dataIso).getTime() - hoje.getTime()) / umDia)
}

// 16 -> "faltam 16 dias"; 1 -> "falta 1 dia"; 0 -> "termina hoje"
export function textoDoPrazo(dataIso: string): string {
  const dias = diasAte(dataIso)
  if (dias < 0) return 'prazo encerrado'
  if (dias === 0) return 'termina hoje'
  if (dias === 1) return 'falta 1 dia'
  return `faltam ${dias} dias`
}

// Como o preço é lido na plaquinha: "por kg", "por dúzia"...
const UNIDADE_NO_PRECO: Record<UnidadeMedida, string> = {
  KG: 'por kg',
  UNIDADE: 'por unidade',
  MACO: 'por maço',
  DUZIA: 'por dúzia',
}

export function unidadeNoPreco(unidade: UnidadeMedida): string {
  return UNIDADE_NO_PRECO[unidade]
}

const CATEGORIAS: Record<CategoriaProduto, string> = {
  HORTALICA: 'Hortaliça',
  FRUTA: 'Fruta',
  RAIZ_TUBERCULO: 'Raiz e tubérculo',
  GRAO: 'Grão',
  ORIGEM_ANIMAL: 'Origem animal',
}

export function rotuloCategoria(categoria: CategoriaProduto): string {
  return CATEGORIAS[categoria]
}

// "Prefeitura de São Paulo - SME/CODAE" -> "Prefeitura de São Paulo"
export function nomeCurtoDaEntidade(nome: string): string {
  return nome.split(' - ')[0]
}
