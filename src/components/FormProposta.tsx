// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Formulário de proposta (POST /itens/{id}/propostas), com React Hook Form.
// O agricultor informa só a quantidade: o preço é o da chamada e não muda.
//
// A conta aparece enquanto ele digita ("Você recebe R$ ..."), e se o valor
// passar do saldo livre a tela avisa antes do envio. Mesmo assim o botão
// continua funcionando, porque quem dá a palavra final é a API: se ela
// recusar (409), a resposta dela aparece aqui embaixo.
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { CampoErro } from '@/components/CampoErro'
import { HttpError } from '@/services/http'
import { enviarProposta } from '@/services/propostas'
import type { Agricultor } from '@/types/agricultor'
import type { ItemChamada } from '@/types/chamada'
import type { ErroApi } from '@/types/erro'
import type { Proposta } from '@/types/proposta'
import { formatarMoeda, formatarNumero, rotuloUnidade } from '@/utils/format'
import { quantidadeMaxima } from '@/utils/limite'

interface FormPropostaProps {
  item: ItemChamada
  agricultor: Agricultor
  nomeDaPrefeitura: string
  // Quanto o agricultor ainda pode vender para esta prefeitura no ano
  livre: number
  // Avisa a página do valor digitado, para o cartão do saldo acompanhar
  onValorMudar: (valor: number) => void
  onEnviada: (proposta: Proposta) => void
}

interface PropostaForm {
  quantidade: number
}

// Quanto os botões − e + somam ou tiram
const PASSO = 100
const ATALHOS = [100, 500, 1000]

const botaoRedondo =
  'grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-grafite text-2xl font-bold leading-none transition hover:bg-nevoa focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-horta'

export function FormProposta({
  item,
  agricultor,
  nomeDaPrefeitura,
  livre,
  onValorMudar,
  onEnviada,
}: FormPropostaProps) {
  // Erro devolvido pela API (409, 404...) ou falha de conexão
  const [erroApi, setErroApi] = useState<ErroApi | null>(null)

  const maximo = quantidadeMaxima(livre, item.precoUnitario)
  const unidade = item.produto.unidadeMedida

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PropostaForm>({
    // Começa numa quantidade que cabe no limite
    defaultValues: { quantidade: Math.min(1000, maximo) },
  })

  // useWatch: lê o campo a cada tecla, para a conta aparecer na hora.
  // A aula mostrou register e handleSubmit; o useWatch é da mesma biblioteca.
  const digitado = useWatch({ control, name: 'quantidade' })
  const quantidade = Number.isFinite(digitado) && digitado > 0 ? digitado : 0
  const valor = quantidade * item.precoUnitario
  const passou = valor > livre

  // Conta para a página quanto vale a proposta em edição
  useEffect(() => {
    onValorMudar(valor)
  }, [valor, onValorMudar])

  function mudarQuantidade(nova: number) {
    setErroApi(null)
    setValue('quantidade', Math.max(nova, 0), { shouldValidate: true })
  }

  async function onSubmit(dados: PropostaForm) {
    setErroApi(null)

    try {
      const proposta = await enviarProposta(item.id, agricultor.id, dados.quantidade)
      onEnviada(proposta)
    } catch (falha) {
      if (falha instanceof HttpError && falha.dados?.campos?.quantidade) {
        // 400: a API apontou o campo. A mensagem dela vai para baixo do campo.
        setError('quantidade', { message: falha.dados.campos.quantidade })
      } else if (falha instanceof HttpError && falha.dados) {
        // 409 e 404: regra de negócio ou registro que não existe
        setErroApi(falha.dados)
      } else {
        setErroApi({
          erro: 'Sem resposta do servidor',
          detalhe: 'Não foi possível enviar a proposta. Verifique sua conexão e tente de novo.',
        })
      }
    }
  }

  const repetida = erroApi?.erro === 'Registro duplicado'
  const foraDoLimite = erroApi?.detalhe.includes('Limite') ?? false

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5">
      <label htmlFor="quantidade" className="block font-semibold">
        Quantidade ({rotuloUnidade(unidade, 2)})
      </label>
      <div className="mt-1.5 flex items-center gap-2 sm:max-w-md">
        <button
          type="button"
          onClick={() => mudarQuantidade(quantidade - PASSO)}
          aria-label={`Diminuir ${PASSO}`}
          className={botaoRedondo}
        >
          −
        </button>
        <input
          id="quantidade"
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          aria-invalid={errors.quantidade ? true : undefined}
          aria-describedby="erro-quantidade"
          {...register('quantidade', {
            valueAsNumber: true,
            required: 'Informe a quantidade.',
            validate: (v) =>
              (Number.isFinite(v) && v > 0) || 'A quantidade precisa ser maior que zero.',
            onChange: () => setErroApi(null),
          })}
          className="field h-14 min-w-0 flex-1 text-center font-display text-3xl font-extrabold"
        />
        <button
          type="button"
          onClick={() => mudarQuantidade(quantidade + PASSO)}
          aria-label={`Aumentar ${PASSO}`}
          className={botaoRedondo}
        >
          +
        </button>
      </div>
      <CampoErro id="erro-quantidade" mensagem={errors.quantidade?.message} />

      <div className="mt-3 flex flex-wrap gap-2">
        {ATALHOS.filter((atalho) => atalho < maximo).map((atalho) => (
          <button
            key={atalho}
            type="button"
            onClick={() => mudarQuantidade(atalho)}
            className="min-h-11 rounded-lg border border-concreto px-4 font-semibold transition hover:bg-nevoa focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-horta"
          >
            {formatarNumero(atalho)}
          </button>
        ))}
        {maximo > 0 && (
          <button
            type="button"
            onClick={() => mudarQuantidade(maximo)}
            className="min-h-11 rounded-lg border border-horta px-4 font-semibold text-horta transition hover:bg-salvia/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-horta"
          >
            O máximo que eu posso: {formatarNumero(maximo)}
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-1 border-y border-concreto py-5">
        <div>
          <p className="text-grafite">Você recebe</p>
          <p
            aria-live="polite"
            className="font-display text-[2.6rem] font-extrabold leading-none tracking-tight sm:text-5xl"
          >
            {formatarMoeda(valor)}
          </p>
        </div>
        <p className="text-grafite">
          {formatarNumero(quantidade)} {rotuloUnidade(unidade, quantidade)} ×{' '}
          {formatarMoeda(item.precoUnitario)}
        </p>
      </div>

      {/* Aviso ANTES do envio, calculado aqui no front */}
      {passou && !erroApi && (
        <div role="alert" className="mt-4 rounded-xl border border-terra/30 bg-terra-clara p-5">
          <p className="font-display text-xl font-extrabold text-terra">
            Passa do seu limite em {formatarMoeda(valor - livre)}
          </p>
          {maximo > 0 ? (
            <>
              <p className="mt-1">
                Você ainda pode vender <strong>{formatarMoeda(livre)}</strong> para a{' '}
                {nomeDaPrefeitura} este ano. Isso dá até{' '}
                <strong>
                  {formatarNumero(maximo)} {rotuloUnidade(unidade, maximo)}
                </strong>{' '}
                de {item.produto.nome.toLowerCase()}.
              </p>
              <button
                type="button"
                onClick={() => mudarQuantidade(maximo)}
                className="btn-secondary mt-4 w-full sm:w-auto"
              >
                Mudar para {formatarNumero(maximo)} {rotuloUnidade(unidade, maximo)}
              </button>
            </>
          ) : (
            <p className="mt-1">
              Você já usou todo o seu limite com a {nomeDaPrefeitura} este ano.
            </p>
          )}
        </div>
      )}

      {/* Resposta da API quando ela recusa a proposta */}
      {erroApi && (
        <div role="alert" className="mt-4 rounded-xl border border-terra/30 bg-terra-clara p-5">
          <p className="font-display text-xl font-extrabold text-terra">
            {repetida
              ? 'Você já enviou proposta para este produto.'
              : foraDoLimite
                ? 'A proposta não foi aceita: passa do seu limite.'
                : 'A proposta não foi enviada.'}
          </p>
          {repetida ? (
            <p className="mt-1">
              Para mudar a quantidade, retire a proposta anterior em{' '}
              <Link to="/minhas-propostas" className="font-bold underline underline-offset-4">
                Minhas propostas
              </Link>{' '}
              e envie de novo.
            </p>
          ) : (
            <p className="mt-1">{erroApi.detalhe}</p>
          )}
          {foraDoLimite && maximo > 0 && (
            <button
              type="button"
              onClick={() => mudarQuantidade(maximo)}
              className="btn-secondary mt-4 w-full sm:w-auto"
            >
              Mudar para {formatarNumero(maximo)} {rotuloUnidade(unidade, maximo)}
            </button>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary mt-6 w-full sm:w-auto sm:min-w-80"
      >
        {isSubmitting
          ? 'Enviando...'
          : valor > 0
            ? `Enviar proposta de ${formatarMoeda(valor)}`
            : 'Enviar proposta'}
      </button>
      <p className="mt-3 text-sm text-grafite">
        Você pode retirar a proposta depois, em Minhas propostas.
      </p>
    </form>
  )
}
