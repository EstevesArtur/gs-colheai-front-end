// Since Young · ColheAí · GS 2026/2 · Front-End Design Engineering
// Página de perguntas frequentes, escrita para o agricultor familiar.
import { Link } from 'react-router-dom'
import { PerguntaFaq } from '@/components/PerguntaFaq'

const PERGUNTAS = [
  {
    pergunta: 'O que é o PNAE?',
    resposta:
      'É o Programa Nacional de Alimentação Escolar, a merenda. O governo federal manda dinheiro para prefeituras e estados comprarem a comida das escolas públicas.',
  },
  {
    pergunta: 'O que é uma chamada pública?',
    resposta:
      'É o jeito que a prefeitura usa para comprar direto da agricultura familiar, sem licitação comum. Ela publica os produtos que quer e o preço que paga, e o agricultor apresenta sua proposta.',
  },
  {
    pergunta: 'O que é o CAF?',
    resposta:
      'É o Cadastro Nacional da Agricultura Familiar. Funciona como a identidade do agricultor familiar e substituiu a antiga DAP. Sem CAF não dá para vender para a merenda.',
  },
  {
    pergunta: 'Quem define o preço dos produtos?',
    resposta:
      'A prefeitura. O preço de cada item é publicado na chamada e é o mesmo para todos. Na proposta, você só informa a quantidade que consegue entregar.',
  },
  {
    pergunta: 'Por que existe um limite de R$ 40 mil?',
    resposta:
      'É regra do PNAE: cada CAF pode vender até R$ 40 mil por ano para cada prefeitura. Assim mais famílias conseguem participar. Cooperativas e associações têm um limite maior, de R$ 40 mil por família cadastrada no CAF do grupo.',
  },
  {
    pergunta: 'O que acontece se a minha proposta passar do limite?',
    resposta:
      'O ColheAí avisa antes de enviar, mostra quanto você ainda pode vender e sugere a maior quantidade que cabe no seu limite.',
  },
  {
    pergunta: 'O que é a meta dos 45%?',
    resposta:
      'Desde janeiro de 2026, pelo menos 45% do dinheiro federal da merenda tem de ser usado em compras diretas da agricultura familiar (Lei 15.226/2025). O painel da meta mostra como cada prefeitura está.',
  },
  {
    pergunta: 'Preciso pagar para usar o ColheAí?',
    resposta:
      'Não. Para agricultores e cooperativas o uso é gratuito. Na proposta de negócio do ColheAí, quem paga pelo serviço é a prefeitura.',
  },
  {
    pergunta: 'Os dados deste site são reais?',
    resposta:
      'As regras e os nomes das prefeituras são reais. Agricultores, chamadas, repasses e propostas são simulados, porque este é um projeto acadêmico da FIAP.',
  },
]

export function FaqPage() {
  return (
    <>
      <section className="bg-mata text-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 lg:pb-14 lg:pt-12">
          <h1 className="font-display text-[2.1rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-5xl">
            Perguntas frequentes
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            O que você precisa saber para vender sua produção para a merenda escolar.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 lg:py-14">
        <div className="border-t border-concreto">
          {PERGUNTAS.map((item, indice) => (
            <PerguntaFaq
              key={item.pergunta}
              id={indice}
              pergunta={item.pergunta}
              resposta={item.resposta}
            />
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-nevoa p-6">
          <h2 className="font-display text-xl font-bold">Não achou sua dúvida?</h2>
          <p className="mt-1 text-grafite">Mande uma mensagem para o grupo.</p>
          <Link to="/contato" className="btn-primary mt-4">
            Falar com a gente
          </Link>
        </div>
      </section>
    </>
  )
}
