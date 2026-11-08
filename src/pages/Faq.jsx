import Accordion from '../components/Accordion/Accordion.jsx';
import { perguntasFrequentes } from '../data/faq.js';
import { useToast } from '../context/ToastContext.jsx';
import './Pages.css';

function Faq() {
  const { showToast } = useToast();

  return (
    <>
      <header className="page-header">
        <h1>Perguntas frequentes</h1>
        <p>Clique em uma pergunta para ver a resposta. Apenas uma fica aberta por vez.</p>
      </header>

      <section className="section" aria-label="Lista de perguntas">
        <Accordion items={perguntasFrequentes} defaultOpenId="prazo" />
      </section>

      <section className="card faq-contact" aria-labelledby="titulo-contato">
        <div>
          <h2 id="titulo-contato">Não encontrou sua resposta?</h2>
          <p className="muted">Nossa equipe responde em até 24 horas.</p>
        </div>
        <button
          type="button"
          className="btn"
          onClick={() => showToast('Mensagem enviada! Em breve entraremos em contato.', 'success')}
        >
          Falar com o suporte
        </button>
      </section>
    </>
  );
}

export default Faq;
