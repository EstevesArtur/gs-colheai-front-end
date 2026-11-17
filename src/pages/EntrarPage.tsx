// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Identificação do agricultor pelo CAF. Formulário controlado com useState,
// como o login da Aula 10: um campo só não precisa de biblioteca.
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AvisoServidor } from '@/components/AvisoServidor'
import { CampoErro } from '@/components/CampoErro'
import { useAuth } from '@/hooks/useAuth'

type Status = 'idle' | 'sending' | 'error'

export function EntrarPage() {
  const { agricultor, entrar, sair } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [caf, setCaf] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [erro, setErro] = useState('')

  // Página de onde a pessoa veio (o ProtectedRoute e a tela da chamada mandam isso)
  const destino = (location.state as { from?: string } | null)?.from ?? '/chamadas'

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (caf.trim() === '') {
      setStatus('error')
      setErro('Digite o número do seu CAF.')
      return
    }

    setStatus('sending')
    setErro('')

    try {
      await entrar(caf)
      // replace: o botão Voltar não devolve a pessoa para a tela de entrada
      navigate(destino, { replace: true })
    } catch (falha) {
      setStatus('error')
      // CAF não encontrado tem mensagem própria; qualquer outra falha é de conexão
      setErro(
        falha instanceof Error && falha.name === 'Error'
          ? falha.message
          : 'Não foi possível consultar o CAF agora. Tente de novo em instantes.',
      )
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-10 lg:py-16">
      <h1 className="font-display text-[2.1rem] font-extrabold leading-tight tracking-[-0.02em]">
        Entrar com meu CAF
      </h1>

      {agricultor ? (
        <div className="card mt-6 p-5">
          <p className="text-grafite">Você entrou como</p>
          <p className="font-display text-xl font-bold">{agricultor.nome}</p>
          <p className="text-sm text-grafite">CAF {agricultor.caf}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link to="/chamadas" className="btn-primary">
              Ver chamadas
            </Link>
            <button type="button" onClick={sair} className="btn-secondary">
              Sair
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-3 leading-relaxed text-grafite">
            O CAF é o Cadastro Nacional da Agricultura Familiar. Com ele o ColheAí sabe quem você é
            e quanto ainda pode vender. Não tem senha.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-6">
            <label htmlFor="caf" className="block font-semibold">
              Número do CAF
            </label>
            <input
              id="caf"
              value={caf}
              onChange={(e) => setCaf(e.target.value)}
              autoComplete="off"
              autoCapitalize="characters"
              aria-invalid={status === 'error' ? true : undefined}
              aria-describedby="erro-caf ajuda-caf"
              className="field mt-1.5 uppercase"
            />
            <CampoErro id="erro-caf" mensagem={status === 'error' ? erro : undefined} />
            <p id="ajuda-caf" className="mt-2 text-sm text-grafite">
              Para testar a demonstração, use <strong className="text-tinta">SIM-CAF-PF-0001</strong>
              .
            </p>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary mt-5 w-full"
            >
              {status === 'sending' ? 'Procurando seu cadastro...' : 'Entrar'}
            </button>

            <div className="mt-4">
              <AvisoServidor carregando={status === 'sending'} />
            </div>
          </form>

          <p className="mt-8 border-t border-concreto pt-5 text-sm leading-relaxed text-grafite">
            Esta entrada é uma simulação para a demonstração: os agricultores são fictícios e não há
            senha. Num produto real, a identificação seria pelo login gov.br.
          </p>
        </>
      )}
    </section>
  )
}
