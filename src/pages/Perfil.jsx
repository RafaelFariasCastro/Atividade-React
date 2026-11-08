import { useState } from 'react';
import { Link } from 'react-router-dom';
import Tabs from '../components/Tabs/Tabs.jsx';
import Dropdown from '../components/Dropdown/Dropdown.jsx';
import ProgressBar from '../components/ProgressBar/ProgressBar.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { formatarPreco } from '../data/produtos.js';
import './Pages.css';

const idiomas = [
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'es-ES', label: 'Español' },
];

const frequencias = [
  { value: 'sempre', label: 'Todas as novidades' },
  { value: 'semanal', label: 'Resumo semanal' },
  { value: 'nunca', label: 'Não receber' },
];

function VisaoGeral() {
  return (
    <div className="profile-overview">
      <div className="avatar" aria-hidden="true">MS</div>
      <dl className="profile-data">
        <div><dt>Nome</dt><dd>Maria Silva</dd></div>
        <div><dt>E-mail</dt><dd>maria.silva@exemplo.com</dd></div>
        <div><dt>Cidade</dt><dd>Salvador - BA</dd></div>
        <div><dt>Cliente desde</dt><dd>Março de 2024</dd></div>
      </dl>
      <div className="profile-progress">
        <ProgressBar label="Perfil completo" value={75} variant="success" />
        <p className="muted">Adicione um telefone para completar seu cadastro.</p>
      </div>
    </div>
  );
}

function Carrinho() {
  const { items, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();

  if (items.length === 0) {
    return (
      <p className="muted">
        Seu carrinho está vazio. <Link to="/produtos">Ver produtos</Link>
      </p>
    );
  }

  const finalizar = () => {
    clearCart();
    showToast('Pedido realizado com sucesso!', 'success');
  };

  return (
    <>
      <table className="cart-table">
        <caption className="visually-hidden">Itens do carrinho</caption>
        <thead>
          <tr>
            <th scope="col">Produto</th>
            <th scope="col">Qtd.</th>
            <th scope="col">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>{item.quantity}</td>
              <td>{formatarPreco(item.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colSpan={2}>Total</th>
            <td><strong>{formatarPreco(totalPrice)}</strong></td>
          </tr>
        </tfoot>
      </table>
      <div className="btn-group cart-actions">
        <button type="button" className="btn btn--success" onClick={finalizar}>Finalizar pedido</button>
        <button
          type="button"
          className="btn btn--outline"
          onClick={() => {
            clearCart();
            showToast('Carrinho esvaziado.', 'info');
          }}
        >
          Esvaziar
        </button>
      </div>
    </>
  );
}

function Configuracoes() {
  const [idioma, setIdioma] = useState('pt-BR');
  const [frequencia, setFrequencia] = useState('semanal');
  const { showToast } = useToast();

  const opcoesIdioma = idiomas.map((opcao) => ({
    ...opcao,
    onSelect: () => showToast(`Idioma alterado para ${opcao.label}.`, 'info'),
  }));

  const salvar = (event) => {
    event.preventDefault();
    showToast('Preferências salvas com sucesso!', 'success');
  };

  return (
    <form className="settings-form" onSubmit={salvar}>
      <Dropdown label="Idioma" options={opcoesIdioma} value={idioma} onChange={(o) => setIdioma(o.value)} />
      <Dropdown
        label="E-mails promocionais"
        options={frequencias}
        value={frequencia}
        onChange={(o) => setFrequencia(o.value)}
      />
      <div className="btn-group">
        <button type="submit" className="btn">Salvar</button>
        <button
          type="button"
          className="btn btn--danger"
          onClick={() => showToast('Erro ao excluir conta: operação não permitida na demonstração.', 'error')}
        >
          Excluir conta
        </button>
      </div>
    </form>
  );
}

function Perfil() {
  const { totalItems } = useCart();

  const abas = [
    { id: 'visao-geral', label: 'Visão geral', content: <VisaoGeral /> },
    { id: 'carrinho', label: `Carrinho (${totalItems})`, content: <Carrinho /> },
    { id: 'configuracoes', label: 'Configurações', content: <Configuracoes /> },
  ];

  return (
    <>
      <header className="page-header">
        <h1>Meu perfil</h1>
        <p>As abas organizam as seções do perfil do usuário.</p>
      </header>
      <Tabs tabs={abas} defaultTabId={totalItems > 0 ? 'carrinho' : 'visao-geral'} />
    </>
  );
}

export default Perfil;
