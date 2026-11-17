// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Formato de TODO erro devolvido pela API Java do ColheAí.
// Exemplo (409): { "erro": "Regra de negócio violada", "detalhe": "Limite do PNAE excedido..." }
export interface ErroApi {
  erro: string
  detalhe: string
  // Só vem no 400 de validação: nome do campo -> mensagem
  campos?: Record<string, string>
}
