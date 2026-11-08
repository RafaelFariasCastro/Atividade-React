import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext.jsx';
import './Pages.css';

const recursos = [
  { to: '/produtos', icone: '🛍️', titulo: 'Produtos', texto: 'Menu Suspenso para filtrar e ordenar, e Paginação da listagem.' },
  { to: '/upload', icone: '📤', titulo: 'Upload', texto: 'Barra de Progresso acompanhando o envio simulado de arquivos.' },
  { to: '/perfil', icone: '👤', titulo: 'Perfil', texto: 'Abas organizando dados do usuário, carrinho e configurações.' },
  { to: '/faq', icone: '❓', titulo: 'FAQ', texto: 'Acordeão com as perguntas frequentes da loja.' },
];

function Home() {
  const { showToast } = useToast();

  return (
    <>
      <section className="hero" aria-labelledby="titulo-home">
        <h1 id="titulo-home">Componentes React na prática</h1>
        <p>
          Uma loja fictícia que demonstra seis componentes visuais feitos do zero em React:
          Acordeão, Paginação, Barra de Progresso, Abas, Menu Suspenso e Notificação Toast.
        </p>
        <Link to="/produtos" className="btn">
          Ver produtos
        </Link>
      </section>

      <section className="section" aria-labelledby="titulo-recursos">
        <h2 id="titulo-recursos">Páginas da aplicação</h2>
        <div className="grid">
          {recursos.map((recurso) => (
            <Link key={recurso.to} to={recurso.to} className="card feature-card">
              <span className="feature-card__icon" aria-hidden="true">
                {recurso.icone}
              </span>
              <h3>{recurso.titulo}</h3>
              <p className="muted">{recurso.texto}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section card" aria-labelledby="titulo-toasts">
        <h2 id="titulo-toasts">Teste as notificações</h2>
        <p className="muted">
          Os toasts usam um contexto global, por isso qualquer página pode exibi-los.
        </p>
        <div className="btn-group">
          <button type="button" className="btn btn--success" onClick={() => showToast('Operação concluída com sucesso!', 'success')}>
            Sucesso
          </button>
          <button type="button" className="btn btn--danger" onClick={() => showToast('Erro ao salvar. Tente novamente.', 'error')}>
            Erro
          </button>
          <button type="button" className="btn" onClick={() => showToast('Há uma nova versão disponível.', 'info')}>
            Informação
          </button>
          <button type="button" className="btn btn--warning" onClick={() => showToast('Sua sessão expira em 5 minutos.', 'warning')}>
            Aviso
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;
