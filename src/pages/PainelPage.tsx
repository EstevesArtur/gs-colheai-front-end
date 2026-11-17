// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Painel da meta de 45%: para cada prefeitura, quanto do repasse federal da
// merenda já foi contratado da agricultura familiar (GET /entidades/{id}/meta).
// É a tela do gestor da prefeitura, mas qualquer cidadão pode acompanhar.
import { Sparkles } from 'lucide-react'
import { AvisoServidor } from '@/components/AvisoServidor'
import { BarraMeta } from '@/components/BarraMeta'
import { Mensagem } from '@/components/Mensagem'
import { Skeleton } from '@/components/Skeleton'
import { useMetas } from '@/hooks/useMetas'
import { formatarMoeda } from '@/utils/format'

// A API de IA (Flask) é uma integração opcional. Enquanto a URL não estiver
// no .env, o card de risco simplesmente não aparece.
const IA_URL = import.meta.env.VITE_IA_URL

export function PainelPage() {
  const { metas, loading, error } = useMetas()

  const atingiram = metas.filter((meta) => meta.metaAtingida).length

  return (
    <>
      <section className="bg-mata text-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 lg:pb-14 lg:pt-12">
          <h1 className="font-display text-[2.1rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-5xl">
            Painel da meta de 45%
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            Desde janeiro de 2026, pelo menos 45% do repasse federal da merenda tem de ir para
            compras diretas da agricultura familiar (Lei 15.226/2025).
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 lg:py-12">
        {error ? (
          <Mensagem tipo="erro" titulo={error}>
            Verifique sua conexão e recarregue a página.
          </Mensagem>
        ) : loading ? (
          <div role="status" aria-label="Carregando o painel" className="space-y-4">
            <AvisoServidor carregando={loading} />
            <div className="grid gap-4 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, indice) => (
                <Skeleton key={indice} className="h-80 rounded-2xl" />
              ))}
            </div>
          </div>
        ) : metas.length === 0 ? (
          <Mensagem tipo="vazio" titulo="Nenhuma prefeitura cadastrada ainda." />
        ) : (
          <>
            <p className="text-lg">
              <strong>
                {atingiram} de {metas.length}
              </strong>{' '}
              {metas.length === 1 ? 'prefeitura atingiu' : 'prefeituras atingiram'} a meta em{' '}
              {metas[0].ano}.
            </p>

            <ul className="mt-5 grid gap-4 lg:grid-cols-3">
              {metas.map((meta) => (
                <li key={meta.entidade.id} className="card flex flex-col px-5 pb-5 sm:px-6">
                  {/* Mesma barra da Home */}
                  <BarraMeta meta={meta} />

                  <dl className="grid grid-cols-2 gap-x-4 gap-y-4 border-t border-concreto pt-4 text-sm">
                    <div>
                      <dt className="text-grafite">Repasse federal</dt>
                      <dd className="font-display text-lg font-bold">
                        {formatarMoeda(meta.repasse)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-grafite">Meta (45%)</dt>
                      <dd className="font-display text-lg font-bold">{formatarMoeda(meta.meta)}</dd>
                    </div>
                    <div>
                      <dt className="text-grafite">Já contratado</dt>
                      <dd className="font-display text-lg font-bold text-horta">
                        {formatarMoeda(meta.contratado)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-grafite">Falta contratar</dt>
                      <dd className="font-display text-lg font-bold">{formatarMoeda(meta.falta)}</dd>
                    </div>
                  </dl>

                  <p className="mt-4 text-sm text-grafite">
                    {meta.entidade.nome} · código IBGE {meta.entidade.codigoIbge}
                  </p>

                  {/* Lugar reservado para o risco calculado pela IA */}
                  {IA_URL && (
                    <p className="mt-4 flex items-start gap-2 rounded-xl bg-concreto p-3 text-sm">
                      <Sparkles size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-grafite" />
                      <span>
                        <strong>Risco de não cumprir a meta (IA):</strong> integração com o modelo
                        de classificação em andamento.
                      </span>
                    </p>
                  )}
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-grafite">
              Repasses e contratos são simulados para a demonstração. Nomes e códigos IBGE das
              prefeituras são reais.
            </p>
          </>
        )}
      </section>
    </>
  )
}
