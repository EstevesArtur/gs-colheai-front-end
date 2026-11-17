// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Detalhe de uma chamada pública: rota com parâmetro /chamadas/:id.
// Mostra os itens (GET) e, para o agricultor identificado, o formulário de
// proposta (POST) com a conta do limite de R$ 40 mil.
import { useState } from 'react'
import { ArrowLeft, CircleCheck } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { AvisoServidor } from '@/components/AvisoServidor'
import { FormProposta } from '@/components/FormProposta'
import { Mensagem } from '@/components/Mensagem'
import { Plaquinha } from '@/components/Plaquinha'
import { SaldoCaf } from '@/components/SaldoCaf'
import { Skeleton } from '@/components/Skeleton'
import { Toldo } from '@/components/Toldo'
import { useAuth } from '@/hooks/useAuth'
import { useChamada } from '@/hooks/useChamada'
import { useChamadas } from '@/hooks/useChamadas'
import { usePropostasDoAgricultor } from '@/hooks/usePropostasDoAgricultor'
import type { Proposta } from '@/types/proposta'
import {
  formatarDiaMes,
  formatarMoeda,
  formatarNumero,
  nomeCurtoDaEntidade,
  rotuloUnidade,
  textoDoPrazo,
} from '@/utils/format'
import { ANO_ATUAL, comprometidoNaEntidade, tetoDoAgricultor } from '@/utils/limite'

export function ChamadaPage() {
  // O parâmetro da URL sempre chega como texto
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const { agricultor } = useAuth()

  const { chamada, itens, loading, error, notFound } = useChamada(Number(id))
  // A lista de chamadas diz de qual prefeitura é cada proposta antiga (conta do limite)
  const { chamadas } = useChamadas()
  const { propostas, recarregar } = usePropostasDoAgricultor(agricultor?.id ?? null)

  const [itemId, setItemId] = useState<number | null>(null)
  const [valorDaProposta, setValorDaProposta] = useState(0)
  const [enviada, setEnviada] = useState<Proposta | null>(null)

  // Ordem da Aula 9: erro, carregando e só então o conteúdo
  if (notFound) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16">
        <Mensagem tipo="vazio" titulo="Esta chamada não existe.">
          O endereço pode estar errado ou a chamada foi removida.{' '}
          <Link to="/chamadas" className="font-bold text-horta underline underline-offset-4">
            Ver todas as chamadas
          </Link>
        </Mensagem>
      </section>
    )
  }

  if (error) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16">
        <Mensagem tipo="erro" titulo={error}>
          Verifique sua conexão e recarregue a página.
        </Mensagem>
      </section>
    )
  }

  if (loading || !chamada) {
    return (
      <div role="status" aria-label="Carregando a chamada">
        <div className="bg-mata">
          <div className="mx-auto max-w-6xl px-4 pb-8 pt-6">
            <Skeleton className="h-5 w-40 bg-white/25" />
            <Skeleton className="mt-3 h-12 w-3/4 bg-white/25" />
            <Skeleton className="mt-3 h-5 w-1/2 bg-white/25" />
          </div>
        </div>
        <div className="mx-auto max-w-6xl space-y-4 px-4 py-8">
          <AvisoServidor carregando={loading} />
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      </div>
    )
  }

  const aberta = chamada.status === 'ABERTA'
  const nomeDaPrefeitura = nomeCurtoDaEntidade(chamada.entidade.nome)
  const itemSelecionado = itens.find((item) => item.id === itemId) ?? null

  // Conta do limite (só com agricultor identificado)
  const teto = agricultor ? tetoDoAgricultor(agricultor) : 0
  const comprometido = comprometidoNaEntidade(
    propostas,
    chamadas,
    chamada.entidade.id,
    ANO_ATUAL,
  )
  const livre = Math.max(teto - comprometido, 0)

  // O agricultor já tem proposta ativa para o produto escolhido?
  const jaOfertou =
    itemSelecionado !== null &&
    propostas.some(
      (proposta) => proposta.item.id === itemSelecionado.id && proposta.status !== 'RECUSADA',
    )

  function selecionar(novoItemId: number) {
    setItemId(novoItemId)
    setValorDaProposta(0)
    setEnviada(null)
  }

  function aoEnviar(proposta: Proposta) {
    setEnviada(proposta)
    setValorDaProposta(0)
    // Busca as propostas de novo: o saldo já desconta a que acabou de entrar
    recarregar()
  }

  return (
    <>
      <section className="bg-mata text-white">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-4">
          <Link
            to="/chamadas"
            className="inline-flex min-h-11 items-center gap-1.5 text-[0.95rem] font-semibold text-white/80 hover:text-white"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Todas as chamadas
          </Link>
          <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-white/70">Chamada {chamada.numeroEdital}</p>
              <h1 className="font-display text-[2.1rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-5xl">
                {nomeDaPrefeitura}
              </h1>
              <p className="mt-2 text-white/80">{chamada.objeto}</p>
            </div>
            <p className="flex items-center gap-2 rounded-xl border border-white/25 px-3.5 py-2 text-[0.95rem]">
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full ${aberta ? 'bg-milho-vivo' : 'bg-white/50'}`}
              />
              {aberta ? (
                <span>
                  <strong>Aberta até {formatarDiaMes(chamada.dataEncerramento)}</strong> ·{' '}
                  {textoDoPrazo(chamada.dataEncerramento)}
                </span>
              ) : (
                <strong>Não recebe mais propostas</strong>
              )}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-12 lg:py-10">
        <div>
          {/* Passo 1: os itens da chamada */}
          <section aria-labelledby="titulo-itens">
            <h2
              id="titulo-itens"
              className="font-display text-2xl font-extrabold tracking-[-0.01em] sm:text-3xl"
            >
              {aberta ? (
                <>
                  <span className="text-grafite">1.</span> O que você vai entregar?
                </>
              ) : (
                'O que a prefeitura comprou'
              )}
            </h2>
            <p className="mt-1 text-grafite">
              {aberta
                ? 'Toque no produto. O preço é o que a prefeitura paga e não muda.'
                : 'Preços publicados nesta chamada.'}
            </p>

            {itens.length === 0 ? (
              <div className="mt-5">
                <Mensagem tipo="vazio" titulo="Esta chamada ainda não tem itens publicados." />
              </div>
            ) : (
              <div className="mt-5">
                <Toldo variante="escuro" />
                <div className="rounded-b-2xl bg-horta p-4 sm:p-5">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-2">
                    {itens.map((item, indice) => (
                      <Plaquinha
                        key={item.id}
                        item={item}
                        indice={indice}
                        onSelecionar={aberta ? () => selecionar(item.id) : undefined}
                        selecionada={item.id === itemId}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Passo 2: a quantidade e o envio */}
          {aberta && itens.length > 0 && (
            <section className="mt-10" aria-labelledby="titulo-quantidade">
              <h2
                id="titulo-quantidade"
                className="font-display text-2xl font-extrabold tracking-[-0.01em] sm:text-3xl"
              >
                <span className="text-grafite">2.</span>{' '}
                {itemSelecionado
                  ? `Quanto de ${itemSelecionado.produto.nome.toLowerCase()}?`
                  : 'Quanto você consegue entregar?'}
              </h2>

              {!itemSelecionado ? (
                <p className="mt-1 text-grafite">Escolha um produto acima para continuar.</p>
              ) : (
                <>
                  <p className="mt-1 text-grafite">
                    A prefeitura quer {formatarNumero(itemSelecionado.quantidadeDemandada)}{' '}
                    {rotuloUnidade(
                      itemSelecionado.produto.unidadeMedida,
                      itemSelecionado.quantidadeDemandada,
                    )}{' '}
                    no total. Você entrega a parte que conseguir.
                  </p>

                  {enviada ? (
                    <div role="status" className="mt-5 rounded-2xl border border-horta bg-salvia/50 p-6">
                      <p className="flex items-center gap-3 font-display text-2xl font-extrabold">
                        <CircleCheck size={32} aria-hidden="true" className="shrink-0 text-horta" />
                        Proposta enviada
                      </p>
                      <p className="mt-3">
                        {formatarNumero(enviada.quantidade)}{' '}
                        {rotuloUnidade(enviada.item.produto.unidadeMedida, enviada.quantidade)} de{' '}
                        {enviada.item.produto.nome.toLowerCase()} por{' '}
                        <strong>{formatarMoeda(enviada.valor)}</strong>. A prefeitura responde depois
                        do encerramento da chamada.
                      </p>
                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <Link to="/minhas-propostas" className="btn-primary">
                          Ver minhas propostas
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setItemId(null)
                            setEnviada(null)
                          }}
                          className="btn-secondary"
                        >
                          Ofertar outro produto
                        </button>
                      </div>
                    </div>
                  ) : !agricultor ? (
                    <div className="mt-5">
                      <Mensagem tipo="vazio" titulo="Para enviar proposta, entre com seu CAF.">
                        <Link
                          to="/entrar"
                          // Guarda esta página para voltar aqui depois da identificação
                          state={{ from: location.pathname }}
                          className="btn-primary mt-2"
                        >
                          Entrar com meu CAF
                        </Link>
                      </Mensagem>
                    </div>
                  ) : jaOfertou ? (
                    <div className="mt-5">
                      <Mensagem tipo="vazio" titulo="Você já enviou proposta para este produto.">
                        Para mudar a quantidade, retire a proposta em{' '}
                        <Link
                          to="/minhas-propostas"
                          className="font-bold text-horta underline underline-offset-4"
                        >
                          Minhas propostas
                        </Link>{' '}
                        e envie de novo.
                      </Mensagem>
                    </div>
                  ) : (
                    <FormProposta
                      // key: trocar de produto recomeça o formulário do zero
                      key={itemSelecionado.id}
                      item={itemSelecionado}
                      agricultor={agricultor}
                      nomeDaPrefeitura={nomeDaPrefeitura}
                      livre={livre}
                      onValorMudar={setValorDaProposta}
                      onEnviada={aoEnviar}
                    />
                  )}
                </>
              )}
            </section>
          )}

          {!aberta && (
            <div className="mt-8">
              <Mensagem tipo="vazio" titulo="Esta chamada já encerrou.">
                <Link to="/chamadas" className="font-bold text-horta underline underline-offset-4">
                  Ver as chamadas abertas
                </Link>
              </Mensagem>
            </div>
          )}
        </div>

        {/* Coluna do saldo: primeiro bloco no celular, fixa à direita no desktop */}
        <div className="order-first lg:sticky lg:top-24 lg:order-none">
          {agricultor ? (
            <SaldoCaf
              agricultor={agricultor}
              nomeDaPrefeitura={nomeDaPrefeitura}
              ano={ANO_ATUAL}
              teto={teto}
              comprometido={comprometido}
              estaProposta={valorDaProposta}
            />
          ) : (
            <aside className="card p-5 sm:p-6">
              <h2 className="font-display text-xl font-bold">Quanto você pode vender?</h2>
              <p className="mt-2 leading-relaxed text-grafite">
                Cada família vende até R$ 40 mil por ano para cada prefeitura. Entre com seu CAF
                para ver o seu saldo e enviar proposta.
              </p>
              <Link
                to="/entrar"
                state={{ from: location.pathname }}
                className="btn-primary mt-4 w-full"
              >
                Entrar com meu CAF
              </Link>
            </aside>
          )}
        </div>
      </div>
    </>
  )
}
