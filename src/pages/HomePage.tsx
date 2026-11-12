// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Página inicial. Fala primeiro com o agricultor familiar (quem usa no celular)
// e, no fim, com a prefeitura (a meta de 45%).
// Dados da API: chamada aberta com seus itens e a meta de cada prefeitura.
import { Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BarraMeta } from '@/components/BarraMeta'
import { IlustracaoPasso } from '@/components/IlustracaoPasso'
import { Mensagem } from '@/components/Mensagem'
import { Plaquinha } from '@/components/Plaquinha'
import { Skeleton } from '@/components/Skeleton'
import { Toldo } from '@/components/Toldo'
import { useChamadaAberta } from '@/hooks/useChamadaAberta'
import { useMetas } from '@/hooks/useMetas'
import { formatarData, nomeCurtoDaEntidade, textoDoPrazo } from '@/utils/format'

// Os três passos são uma sequência de verdade, por isso a lista é numerada (<ol>)
const PASSOS = [
  {
    tipo: 'caf',
    titulo: 'Entre com seu CAF',
    texto: 'O número do Cadastro da Agricultura Familiar. Não tem senha para decorar.',
  },
  {
    tipo: 'cesta',
    titulo: 'Escolha o que vai entregar',
    texto: 'Toque no produto e diga a quantidade. O valor aparece na hora.',
  },
  {
    tipo: 'envio',
    titulo: 'Envie a proposta',
    texto: 'O ColheAí confere seu limite e manda para a prefeitura.',
  },
] as const

export function HomePage() {
  const { chamada, itens, loading, error } = useChamadaAberta()
  const { metas, loading: loadingMetas, error: errorMetas } = useMetas()

  return (
    <>
      {/* Abertura: a promessa e a "barraca" com os preços reais da chamada aberta */}
      <section className="bg-mata text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-12 pt-8 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:gap-16 lg:pb-20 lg:pt-16">
          <div>
            <h1 className="font-display text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[3.4rem]">
              A merenda da escola quer comprar a sua colheita.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">
              A prefeitura publica o preço, você diz quanto consegue entregar. Tudo pelo celular,
              direto com quem compra.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/chamadas" className="btn-primary">
                Ver chamadas abertas
              </Link>
              <a
                href="#como-funciona"
                className="btn-secondary border-white/40 bg-transparent text-white hover:bg-white/10"
              >
                Como funciona
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <Toldo />
            <div className="rounded-b-2xl bg-horta px-4 pb-5 pt-4 sm:px-5">
              {/* Ordem da Aula 9: primeiro o erro, depois o carregamento, por último o conteúdo */}
              {error ? (
                <Mensagem tipo="erro" titulo={error}>
                  Verifique sua conexão e recarregue a página.
                </Mensagem>
              ) : loading ? (
                <div aria-label="Carregando a chamada aberta" role="status">
                  <Skeleton className="h-12 w-3/4 bg-white/25" />
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                    {Array.from({ length: 4 }).map((_, indice) => (
                      <Skeleton key={indice} className="h-[8.25rem] bg-milho-vivo/60" />
                    ))}
                  </div>
                  <Skeleton className="mt-4 h-5 w-2/3 bg-white/25" />
                </div>
              ) : !chamada ? (
                <Mensagem tipo="vazio" titulo="Nenhuma chamada aberta agora.">
                  Quando uma prefeitura abrir uma chamada, os preços aparecem aqui.{' '}
                  <Link to="/chamadas" className="font-bold underline">
                    Ver chamadas anteriores
                  </Link>
                </Mensagem>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-white/80">Chamada {chamada.numeroEdital}</p>
                      <h2 className="font-display text-xl font-bold leading-tight">
                        {nomeCurtoDaEntidade(chamada.entidade.nome)} paga
                      </h2>
                    </div>
                    <span className="flex shrink-0 items-center gap-1.5 rounded-md bg-mata px-2 py-1 text-sm font-bold">
                      <span className="h-2 w-2 rounded-full bg-milho-vivo" />
                      Aberta
                    </span>
                  </div>

                  {itens.length === 0 ? (
                    <p className="mt-4">Esta chamada ainda não tem itens publicados.</p>
                  ) : (
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                      {itens.map((item, indice) => (
                        <Plaquinha
                          key={item.id}
                          item={item}
                          indice={indice}
                          para={`/chamadas/${chamada.id}`}
                        />
                      ))}
                    </div>
                  )}

                  <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/90">
                    <Clock size={18} aria-hidden="true" />
                    Recebe propostas até {formatarData(chamada.dataEncerramento)}
                    <span className="font-bold text-white">
                      ({textoDoPrazo(chamada.dataEncerramento)})
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section
        id="como-funciona"
        aria-labelledby="titulo-passos"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 lg:py-20"
      >
        <h2
          id="titulo-passos"
          className="font-display text-3xl font-extrabold tracking-[-0.015em] sm:text-4xl"
        >
          Vender leva três passos
        </h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
          {PASSOS.map((passo, indice) => (
            <li key={passo.tipo} className="flex gap-4 border-t border-concreto pt-5">
              <IlustracaoPasso tipo={passo.tipo} />
              <div>
                <h3 className="font-display text-xl font-bold">
                  <span className="text-grafite">{indice + 1}.</span> {passo.titulo}
                </h3>
                <p className="mt-1 leading-relaxed text-grafite">{passo.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* A regra dos R$ 40 mil explicada antes de virar erro no formulário */}
      <section aria-labelledby="titulo-limite" className="bg-nevoa">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
          <div>
            <h2
              id="titulo-limite"
              className="font-display text-3xl font-extrabold tracking-[-0.015em] sm:text-4xl"
            >
              Cada família vende até R$ 40 mil por ano para cada prefeitura
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-grafite">
              É regra do PNAE, o programa da merenda. O ColheAí faz a conta para você e avisa antes
              de a proposta passar do limite.
            </p>
          </div>

          <div className="card p-5 sm:p-6">
            <p className="text-sm text-grafite">
              Exemplo: uma agricultora que já vendeu R$ 27.800 para uma prefeitura este ano
            </p>
            <div
              role="img"
              aria-label="R$ 27.800 já vendidos de um limite de R$ 40.000; ainda pode vender R$ 12.200"
              className="mt-4 h-3 overflow-hidden rounded-full bg-concreto"
            >
              <div className="h-3 w-[69.5%] rounded-full bg-mata" />
            </div>
            <div className="mt-3 flex justify-between gap-4 text-sm text-grafite">
              <p>
                <span className="block font-display text-2xl font-extrabold text-tinta">R$ 27.800</span>
                já vendidos
              </p>
              <p className="text-right">
                <span className="block font-display text-2xl font-extrabold text-horta">R$ 12.200</span>
                ainda pode vender
              </p>
            </div>
            <div className="mt-6 border-t border-concreto pt-5">
              <p className="font-semibold">Quer saber quanto você ainda pode vender?</p>
              <Link to="/entrar" className="btn-primary mt-3 w-full sm:w-auto">
                Entrar com meu CAF
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Para a prefeitura: a meta de 45% */}
      <section
        aria-labelledby="titulo-meta"
        className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:py-20"
      >
        <div>
          <h2
            id="titulo-meta"
            className="font-display text-3xl font-extrabold tracking-[-0.015em] sm:text-4xl"
          >
            Para a prefeitura: a meta dos 45%
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-grafite">
            Desde 2026, pelo menos 45% do dinheiro federal da merenda tem de ir para a agricultura
            familiar (Lei 15.226/2025). Cada barra enche até a meta.
          </p>
          <Link to="/painel" className="btn-secondary mt-6">
            Abrir o painel da meta
          </Link>
        </div>

        <div className="card divide-y divide-concreto px-5 sm:px-6">
          {errorMetas ? (
            <div className="py-5">
              <Mensagem tipo="erro" titulo={errorMetas}>
                Verifique sua conexão e recarregue a página.
              </Mensagem>
            </div>
          ) : loadingMetas ? (
            Array.from({ length: 3 }).map((_, indice) => (
              <div key={indice} className="py-5" aria-hidden="true">
                <Skeleton className="h-7 w-2/3" />
                <Skeleton className="mt-3 h-2.5 w-full" />
                <Skeleton className="mt-3 h-4 w-1/2" />
              </div>
            ))
          ) : metas.length === 0 ? (
            <div className="py-5">
              <Mensagem tipo="vazio" titulo="Nenhuma prefeitura cadastrada ainda." />
            </div>
          ) : (
            metas.map((meta) => <BarraMeta key={meta.entidade.id} meta={meta} />)
          )}
          <p className="py-3 text-sm text-grafite">
            Repasses e contratos simulados para a demonstração.
          </p>
        </div>
      </section>
    </>
  )
}
