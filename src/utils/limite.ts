// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Conta do limite do PNAE: cada CAF vende até R$ 40 mil por ano para cada
// prefeitura (EEx). Em cooperativa, o teto é R$ 40 mil por família do CAF.
//
// Esta conta serve para AVISAR o agricultor antes do envio. Quem decide de
// verdade é a API: se a proposta passar do teto, ela responde 409.
import type { Agricultor } from '@/types/agricultor'
import type { ChamadaPublica } from '@/types/chamada'
import type { Proposta } from '@/types/proposta'

export const TETO_POR_FAMILIA = 40000

// O limite vale por ano civil. Calculado uma vez, quando o app abre.
export const ANO_ATUAL = new Date().getFullYear()

export function tetoDoAgricultor(agricultor: Agricultor): number {
  return TETO_POR_FAMILIA * agricultor.quantidadeFamilias
}

// Soma o que o agricultor já comprometeu com UMA prefeitura no ano.
// Entram as propostas enviadas e as contratadas; as recusadas não contam.
// A proposta só traz o id da chamada, então a lista de chamadas diz de qual
// prefeitura é cada uma.
export function comprometidoNaEntidade(
  propostas: Proposta[],
  chamadas: ChamadaPublica[],
  entidadeId: number,
  ano: number,
): number {
  return propostas
    .filter((proposta) => proposta.status === 'ENVIADA' || proposta.status === 'CONTRATADA')
    .filter((proposta) => Number(proposta.dataEnvio.slice(0, 4)) === ano)
    .filter((proposta) => {
      const chamada = chamadas.find((c) => c.id === proposta.item.chamada.id)
      return chamada?.entidade.id === entidadeId
    })
    .reduce((total, proposta) => total + proposta.valor, 0)
}

// Maior quantidade inteira que ainda cabe no saldo livre
export function quantidadeMaxima(livre: number, precoUnitario: number): number {
  if (livre <= 0 || precoUnitario <= 0) return 0
  return Math.floor(livre / precoUnitario)
}
