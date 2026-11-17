// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Único lugar do projeto que chama fetch(). É o wrapper http<T> da Aula 10,
// adaptado para a API do ColheAí em dois pontos:
//   1. a API sempre explica o erro em JSON ({ erro, detalhe, campos }), então
//      guardamos essa explicação no HttpError para a tela mostrar ao agricultor;
//   2. o DELETE responde 204 sem corpo, e chamar response.json() ali daria erro.
import type { ErroApi } from '@/types/erro'

// A URL vem do .env (VITE_API_URL). O valor reserva deixa o projeto rodar com
// "npm install" + "npm run dev" mesmo sem .env. A URL é pública: URL pode, senha nunca.
export const API = import.meta.env.VITE_API_URL ?? 'https://colheai-api.onrender.com'

export class HttpError extends Error {
  status: number
  // Corpo do erro da API, quando ela mandou um
  dados: ErroApi | null

  constructor(status: number, message: string, dados: ErroApi | null = null) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.dados = dados
  }
}

export async function http<T>(url: string, options: RequestInit = {}): Promise<T> {
  const { headers, ...rest } = options

  const response = await fetch(url, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })

  // O fetch NÃO rejeita em 4xx/5xx: a checagem é nossa
  if (!response.ok) {
    let dados: ErroApi | null = null
    try {
      dados = (await response.json()) as ErroApi
    } catch {
      // o corpo não era JSON: segue com a mensagem genérica
    }
    throw new HttpError(
      response.status,
      dados?.detalhe ?? `Falha na requisição: ${response.status}`,
      dados,
    )
  }

  // 204 No Content: não há corpo para ler
  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}
