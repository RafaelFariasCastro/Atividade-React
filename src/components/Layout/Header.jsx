import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import './Layout.css';

const links = [
  { to: '/', label: 'Início' },
  { to: '/produtos', label: 'Produtos' },
  { to: '/upload', label: 'Upload' },
  { to: '/perfil', label: 'Perfil' },
  { to: '/faq', label: 'FAQ' },
];

/**
 * Cabeçalho com navegação (React Router) e menu "hambúrguer" no celular.
 * Lê a quantidade de itens do carrinho direto do contexto global.
 */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  // Fecha o menu mobile sempre que a rota mudar
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="container header__inner">
        <NavLink to="/" className="header__logo">
          <span aria-hidden="true">⚡</span> Loja Tech
        </NavLink>

        <button
          type="button"
          className={`header__toggle ${menuOpen ? 'is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="menu-principal"
          className={`header__nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Navegação principal"
        >
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} className="header__link">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink
          to="/perfil"
          className="header__cart"
          aria-label={`Carrinho com ${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`}
        >
          <span aria-hidden="true">🛒</span>
          <span className="header__badge" aria-hidden="true">
            {totalItems}
          </span>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
