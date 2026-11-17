// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Lista de chamadas públicas (GET /chamadas), com filtro por situação e por
// prefeitura. Os filtros são estado derivado (Aula 5): a lista completa fica
// num estado só e a lista filtrada é calculada a cada render.
import { useState } from 'react'
import { AvisoServidor } from '@/components/AvisoServidor'
import { ChamadaCard } from '@/components/ChamadaCard'
import { Mensagem } from '@/components/Mensagem'
import { Skeleton } from '@/components/Skeleton'
import { useChamadas } from '@/hooks/useChamadas'
import { nomeCurtoDaEntidade } from '@/utils/format'

type Filtro = 'abertas' | 'todas'

const filtroClass = (ativo: boolean) =>
  `min-h-11 rounded-lg px-4 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-horta ${
    ativo ? 'bg-mata text-white' : 'border border-concreto bg-white text-tinta hover:bg-nevoa'
  }`

export function ChamadasPage() {
  const { chamadas, loading, error } = useChamadas()
  const [filtro, setFiltro] = useState<Filtro>('abertas')
  // 0 = todas as prefeituras
  const [entidadeId, setEntidadeId] = useState(0)

  // Prefeituras que aparecem nas chamadas, sem repetir, para montar o select
  const entidades = chamadas
    .map((chamada) => chamada.entidade)
    .filter((entidade, indice, lista) => lista.findIndex((e) => e.id === entidade.id) === indice)

  // Estado derivado: nada de useState para a lista filtrada
  const visiveis = chamadas.filter(
    (chamada) =>
      (filtro === 'todas' || chamada.status === 'ABERTA') &&
      (entidadeId === 0 || chamada.entidade.id === entidadeId),
  )

  return (
    <>
      <section className="bg-mata text-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 lg:pb-14 lg:pt-12">
          <h1 className="font-display text-[2.1rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-5xl">
            Chamadas públicas
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            É por aqui que as prefeituras compram da agricultura familiar para a merenda. Abra uma
            chamada para ver os produtos e os preços.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 lg:py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div role="group" aria-label="Filtrar por situação" className="flex gap-2">
            <button
              type="button"
              onClick={() => setFiltro('abertas')}
              aria-pressed={filtro === 'abertas'}
              className={filtroClass(filtro === 'abertas')}
            >
              Abertas
            </button>
            <button
              type="button"
              onClick={() => setFiltro('todas')}
              aria-pressed={filtro === 'todas'}
              className={filtroClass(filtro === 'todas')}
            >
              Todas
            </button>
          </div>

          <div className="sm:w-64">
            <label htmlFor="prefeitura" className="block text-sm font-semibold">
              Prefeitura
            </label>
            <select
              id="prefeitura"
              value={entidadeId}
              onChange={(e) => setEntidadeId(Number(e.target.value))}
              className="field mt-1"
            >
              <option value={0}>Todas as prefeituras</option>
              {entidades.map((entidade) => (
                <option key={entidade.id} value={entidade.id}>
                  {nomeCurtoDaEntidade(entidade.nome)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          {/* Ordem da Aula 9: erro, depois carregando, depois vazio ou conteúdo */}
          {error ? (
            <Mensagem tipo="erro" titulo={error}>
              Verifique sua conexão e recarregue a página.
            </Mensagem>
          ) : loading ? (
            <div role="status" aria-label="Carregando as chamadas" className="space-y-3">
              <AvisoServidor carregando={loading} />
              {Array.from({ length: 3 }).map((_, indice) => (
                <Skeleton key={indice} className="h-36 rounded-2xl" />
              ))}
            </div>
          ) : visiveis.length === 0 ? (
            <Mensagem tipo="vazio" titulo="Nenhuma chamada encontrada com esses filtros.">
              {filtro === 'abertas' ? (
                <button
                  type="button"
                  onClick={() => setFiltro('todas')}
                  className="font-bold text-horta underline underline-offset-4"
                >
                  Ver também as chamadas encerradas
                </button>
              ) : (
                'Escolha outra prefeitura.'
              )}
            </Mensagem>
          ) : (
            <ul className="space-y-3">
              {visiveis.map((chamada) => (
                <li key={chamada.id}>
                  <ChamadaCard chamada={chamada} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {!loading && !error && (
          <p className="mt-4 text-sm text-grafite" aria-live="polite">
            {visiveis.length === 1
              ? '1 chamada na lista.'
              : `${visiveis.length} chamadas na lista.`}{' '}
            Dados simulados para a demonstração.
          </p>
        )}
      </section>
    </>
  )
}
