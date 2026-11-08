import { useMemo, useState } from 'react';
import Dropdown from '../components/Dropdown/Dropdown.jsx';
import Pagination from '../components/Pagination/Pagination.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { categorias, formatarPreco, icones, ordenacoes, produtos } from '../data/produtos.js';
import './Pages.css';

const ITENS_POR_PAGINA = 6;

function Produtos() {
  const [categoria, setCategoria] = useState('todas');
  const [ordem, setOrdem] = useState('relevancia');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const { addItem } = useCart();
  const { showToast } = useToast();

  // Filtra e ordena os produtos sempre que os filtros mudarem
  const listaFiltrada = useMemo(() => {
    const filtrados =
      categoria === 'todas' ? produtos : produtos.filter((p) => p.categoria === categoria);
    const ordenados = [...filtrados];
    if (ordem === 'menor-preco') ordenados.sort((a, b) => a.price - b.price);
    if (ordem === 'maior-preco') ordenados.sort((a, b) => b.price - a.price);
    if (ordem === 'nome') ordenados.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    return ordenados;
  }, [categoria, ordem]);

  const totalPaginas = Math.ceil(listaFiltrada.length / ITENS_POR_PAGINA);
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const produtosDaPagina = listaFiltrada.slice(inicio, inicio + ITENS_POR_PAGINA);

  const handleCategoria = (opcao) => {
    setCategoria(opcao.value);
    setPaginaAtual(1); // volta para a primeira página ao trocar o filtro
  };

  const handleOrdem = (opcao) => {
    setOrdem(opcao.value);
    setPaginaAtual(1);
  };

  const handlePagina = (pagina) => {
    setPaginaAtual(pagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const adicionarAoCarrinho = (produto) => {
    addItem(produto);
    showToast(`${produto.nome} foi adicionado ao carrinho.`, 'success', 3000);
  };

  return (
    <>
      <header className="page-header">
        <h1>Produtos</h1>
        <p>Use os menus suspensos para filtrar e ordenar. A listagem é paginada.</p>
      </header>

      <div className="toolbar" role="search" aria-label="Filtros de produtos">
        <Dropdown label="Categoria" options={categorias} value={categoria} onChange={handleCategoria} />
        <Dropdown label="Ordenar por" options={ordenacoes} value={ordem} onChange={handleOrdem} />
        <p className="toolbar__count muted" aria-live="polite">
          {listaFiltrada.length} produto(s) · página {paginaAtual} de {totalPaginas}
        </p>
      </div>

      <ul className="grid product-list" aria-label="Lista de produtos">
        {produtosDaPagina.map((produto) => (
          <li key={produto.id}>
            <article className="card product-card">
              <div className="product-card__image" aria-hidden="true">
                {icones[produto.categoria]}
              </div>
              <h2 className="product-card__title">{produto.nome}</h2>
              <p className="muted product-card__desc">{produto.descricao}</p>
              <div className="product-card__footer">
                <strong className="product-card__price">{formatarPreco(produto.price)}</strong>
                <button
                  type="button"
                  className="btn"
                  onClick={() => adicionarAoCarrinho(produto)}
                  aria-label={`Adicionar ${produto.nome} ao carrinho`}
                >
                  Adicionar
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Pagination totalPages={totalPaginas} currentPage={paginaAtual} onPageChange={handlePagina} />
    </>
  );
}

export default Produtos;
