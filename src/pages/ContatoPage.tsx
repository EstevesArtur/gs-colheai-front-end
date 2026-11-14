// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Página de contato, com React Hook Form (Aula 6).
// A API do ColheAí não tem rota de contato, então o envio é SIMULADO e a tela
// diz isso com todas as letras. O e-mail do grupo fica visível para contato real.
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CampoErro } from '@/components/CampoErro'
import { Mensagem } from '@/components/Mensagem'

interface ContatoForm {
  nome: string
  email: string
  assunto: string
  mensagem: string
}

const EMAIL_DO_GRUPO = 'arturbianchini21@gmail.com'

export function ContatoPage() {
  // Guarda o nome de quem enviou, para a mensagem de sucesso
  const [enviadoPor, setEnviadoPor] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContatoForm>()

  async function onSubmit(data: ContatoForm) {
    // Simula o tempo de uma requisição. Nenhum dado sai do navegador.
    await new Promise((resolve) => setTimeout(resolve, 600))
    setEnviadoPor(data.nome)
    reset()
  }

  return (
    <>
      <section className="bg-mata text-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 lg:pb-14 lg:pt-12">
          <h1 className="font-display text-[2.1rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-5xl">
            Fale com a gente
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            Dúvida, sugestão ou erro no site? Escreva para a Since Young.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12 lg:py-14">
        <div>
          {enviadoPor && (
            <div className="mb-6">
              <Mensagem tipo="sucesso" titulo={`Mensagem registrada. Obrigado, ${enviadoPor}!`}>
                Este formulário é uma demonstração e não envia e-mail de verdade. Para falar com o
                grupo, escreva para {EMAIL_DO_GRUPO}.
              </Mensagem>
            </div>
          )}

          {/* noValidate: quem valida e mostra as mensagens é o React Hook Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div>
              <label htmlFor="nome" className="block font-semibold">
                Nome
              </label>
              <input
                id="nome"
                autoComplete="name"
                aria-invalid={errors.nome ? true : undefined}
                aria-describedby="erro-nome"
                {...register('nome', {
                  required: 'Informe seu nome.',
                  minLength: { value: 3, message: 'O nome precisa de pelo menos 3 letras.' },
                })}
                className="field mt-1.5"
              />
              <CampoErro id="erro-nome" mensagem={errors.nome?.message} />
            </div>

            <div>
              <label htmlFor="email" className="block font-semibold">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby="erro-email"
                {...register('email', {
                  required: 'Informe seu e-mail.',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'E-mail inválido. Exemplo: nome@email.com' },
                })}
                className="field mt-1.5"
              />
              <CampoErro id="erro-email" mensagem={errors.email?.message} />
            </div>

            <div>
              <label htmlFor="assunto" className="block font-semibold">
                Assunto
              </label>
              <select
                id="assunto"
                aria-invalid={errors.assunto ? true : undefined}
                aria-describedby="erro-assunto"
                {...register('assunto', { required: 'Escolha um assunto.' })}
                className="field mt-1.5"
              >
                <option value="">Escolha um assunto</option>
                <option value="agricultor">Sou agricultor e tenho uma dúvida</option>
                <option value="prefeitura">Sou de uma prefeitura</option>
                <option value="erro">Encontrei um erro no site</option>
                <option value="outro">Outro assunto</option>
              </select>
              <CampoErro id="erro-assunto" mensagem={errors.assunto?.message} />
            </div>

            <div>
              <label htmlFor="mensagem" className="block font-semibold">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                rows={5}
                aria-invalid={errors.mensagem ? true : undefined}
                aria-describedby="erro-mensagem"
                {...register('mensagem', {
                  required: 'Escreva sua mensagem.',
                  minLength: { value: 10, message: 'Escreva pelo menos 10 letras.' },
                })}
                className="field mt-1.5 py-3"
              />
              <CampoErro id="erro-mensagem" mensagem={errors.mensagem?.message} />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
              {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
            </button>
          </form>
        </div>

        <aside className="card h-fit p-5 sm:p-6">
          <h2 className="font-display text-xl font-bold">Contato direto</h2>
          <p className="mt-3 text-sm text-grafite">E-mail do grupo</p>
          <a
            href={`mailto:${EMAIL_DO_GRUPO}`}
            className="break-all font-semibold text-horta underline underline-offset-4"
          >
            {EMAIL_DO_GRUPO}
          </a>
          <p className="mt-4 text-sm text-grafite">Grupo</p>
          <p className="font-semibold">Since Young · FIAP · 1TDSPV-2026</p>
          <p className="mt-4 text-sm leading-relaxed text-grafite">
            O formulário desta página é uma demonstração: a mensagem não é enviada nem guardada.
          </p>
        </aside>
      </section>
    </>
  )
}
