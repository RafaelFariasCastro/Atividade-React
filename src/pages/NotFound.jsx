import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="page-header">
      <h1>Página não encontrada</h1>
      <p>
        O endereço acessado não existe. <Link to="/">Voltar para o início</Link>
      </p>
    </section>
  );
}

export default NotFound;
