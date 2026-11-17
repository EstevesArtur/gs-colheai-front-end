// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Propostas do agricultor identificado (GET /agricultores/{id}/propostas).
// Página protegida: só abre para quem entrou com o CAF (ver ProtectedRoute).
// A proposta ainda "Enviada" pode ser retirada (DELETE /propostas/{id}).
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AvisoServidor } from '@/components/AvisoServidor'
import { Mensagem } from '@/components/Mensagem'
import { Skeleton } from '@/components/Skeleton'
import { StatusBadge } from '@/components/StatusBadge'
import { useAuth } from '@/hooks/useAuth'
import { useChamadas } from '@/hooks/useChamadas'
import { usePropostasDoAgricultor } from '@/hooks/usePropostasDoAgricultor'
import { HttpError } from '@/services/http'
import { retirarProposta } from '@/services/propostas'
import type { Proposta } from '@/types/proposta'
import {
  formatarData,
  formatarMoeda,
  formatarNumero,
  nomeCurtoDaEntidade,
  rotuloUnidade,
} from '@/utils/format'

export function MinhasPropostasPage() {
  const { agricultor } = useAuth()
  const { propostas, loading, error, recarregar } = usePropostasDoAgricultor(agricultor?.id ?? null)
  // Só para mostrar o nome da prefeitura e o número da chamada de cada proposta
  const { chamadas } = useChamadas()

  // Retirar pede confirmação: primeiro clique marca, segundo confirma
  const [confirmandoId, setConfirmandoId] = useState<number | null>(null)
  const [retirandoId, setRetirandoId] = useState<number | null>(null)
  const [aviso, setAviso] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null)

  async function retirar(proposta: Proposta) {
    setRetirandoId(proposta.id)
    setAviso(null)

    try {
      await retirarProposta(proposta.id)
      setAviso({
        tipo: 'sucesso',
        texto: `Proposta de ${proposta.item.produto.nome.toLowerCase()} retirada.`,
      })
      recarregar()
    } catch (falha) {
      // Se a API explicou o motivo (ex.: proposta já contratada), mostra a explicação dela
      setAviso({
        tipo: 'erro',
        texto:
          falha instanceof HttpError && falha.dados
            ? falha.dados.detalhe
            : 'Não foi possível retirar a proposta. Tente de novo.',
      })
    } finally {
      setRetirandoId(null)
      setConfirmandoId(null)
    }
  }

  // Mais recentes primeiro
  const ordenadas = [...propostas].sort((a, b) => b.dataEnvio.localeCompare(a.dataEnvio))
  const totalAtivo = propostas
    .filter((proposta) => proposta.status !== 'RECUSADA')
    .reduce((total, proposta) => total + proposta.valor, 0)

  return (
    <>
      <section className="bg-mata text-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 lg:pb-14 lg:pt-12">
          <h1 className="font-display text-[2.1rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-5xl">
            Minhas propostas
          </h1>
          {agricultor && (
            <p className="mt-4 text-lg text-white/80">
              {agricultor.nome} · CAF {agricultor.caf}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 lg:py-12">
        {aviso && (
          <div className="mb-5">
            <Mensagem tipo={aviso.tipo} titulo={aviso.texto} />
          </div>
        )}

        {error ? (
          <Mensagem tipo="erro" titulo={error}>
            Verifique sua conexão e recarregue a página.
          </Mensagem>
        ) : loading ? (
          <div role="status" aria-label="Carregando suas propostas" className="space-y-3">
            <AvisoServidor carregando={loading} />
            {Array.from({ length: 3 }).map((_, indice) => (
              <Skeleton key={indice} className="h-32 rounded-2xl" />
            ))}
          </div>
        ) : ordenadas.length === 0 ? (
          <Mensagem tipo="vazio" titulo="Você ainda não enviou nenhuma proposta.">
            Veja as chamadas abertas e escolha o que consegue entregar.
            <Link to="/chamadas" className="btn-primary mt-3">
              Ver chamadas abertas
            </Link>
          </Mensagem>
        ) : (
          <>
            <p className="text-grafite">
              {ordenadas.length === 1 ? '1 proposta' : `${ordenadas.length} propostas`} · enviadas
              e contratadas somam <strong className="text-tinta">{formatarMoeda(totalAtivo)}</strong>
            </p>

            <ul className="mt-4 space-y-3">
              {ordenadas.map((proposta) => {
                const chamada = chamadas.find((c) => c.id === proposta.item.chamada.id)
                const unidade = proposta.item.produto.unidadeMedida

                return (
                  <li key={proposta.id} className="card p-5">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                      <div>
                        <StatusBadge status={proposta.status} />
                        <h2 className="mt-2 font-display text-xl font-bold">
                          {proposta.item.produto.nome}
                        </h2>
                        <p className="text-grafite">
                          {formatarNumero(proposta.quantidade)}{' '}
                          {rotuloUnidade(unidade, proposta.quantidade)} ×{' '}
                          {formatarMoeda(proposta.item.precoUnitario)}
                        </p>
                      </div>
                      <p className="font-display text-2xl font-extrabold">
                        {formatarMoeda(proposta.valor)}
                      </p>
                    </div>

                    <p className="mt-3 text-sm text-grafite">
                      {chamada && (
                        <>
                          <Link
                            to={`/chamadas/${chamada.id}`}
                            className="font-semibold text-horta underline underline-offset-4"
                          >
                            Chamada {chamada.numeroEdital}, {nomeCurtoDaEntidade(chamada.entidade.nome)}
                          </Link>{' '}
                          ·{' '}
                        </>
                      )}
                      enviada em {formatarData(proposta.dataEnvio)}
                      {proposta.dataContrato &&
                        ` · contratada em ${formatarData(proposta.dataContrato)}`}
                    </p>

                    {/* Só dá para retirar o que a prefeitura ainda não respondeu */}
                    {proposta.status === 'ENVIADA' && (
                      <div className="mt-4 border-t border-concreto pt-4">
                        {confirmandoId === proposta.id ? (
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <p className="font-semibold sm:mr-auto">Retirar esta proposta?</p>
                            <button
                              type="button"
                              onClick={() => retirar(proposta)}
                              disabled={retirandoId === proposta.id}
                              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-terra px-5 font-bold text-white transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra focus-visible:ring-offset-2 disabled:opacity-60"
                            >
                              {retirandoId === proposta.id ? 'Retirando...' : 'Sim, retirar'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmandoId(null)}
                              className="btn-secondary min-h-11"
                            >
                              Manter proposta
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmandoId(proposta.id)}
                            className="min-h-11 font-semibold text-terra underline underline-offset-4"
                          >
                            Retirar proposta
                          </button>
                        )}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </section>
    </>
  )
}
