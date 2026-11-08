# Atividade React: Componentes Visuais

Aplicação web responsiva em **React.js** (Vite) que implementa, do zero, seis componentes visuais:
**Acordeão, Paginação, Barra de Progresso, Abas, Menu Suspenso e Notificação Toast**.

O tema é uma loja fictícia ("Loja Tech"). Cada componente aparece num contexto de uso real.

> Universidade Católica do Salvador · Engenharia de Software · Prof. Elton Figueiredo da Silva

## Como executar

### GitHub Codespaces (ambiente indicado)
1. No repositório, clique em **Code → Codespaces → Create codespace on main**.
2. O `devcontainer` já roda `npm install` e instala o pacote de idioma Português (Brasil).
3. No terminal, rode:
   ```bash
   npm run dev
   ```
4. Abra a porta **5173** quando o Codespaces sugerir.

### Localmente
Requer Node.js 18 ou superior.
```bash
npm install
npm run dev      # servidor de desenvolvimento em http://localhost:5173
npm run build    # build de produção na pasta dist/
```

## Onde cada componente aparece

| Componente | Arquivo | Uso na aplicação |
|---|---|---|
| Acordeão | `src/components/Accordion` | Página **FAQ**: perguntas frequentes, um item aberto por vez, com transição suave |
| Paginação | `src/components/Pagination` | Página **Produtos**: anterior/próxima, páginas numeradas, página atual destacada e botões desabilitados nas pontas |
| Barra de Progresso | `src/components/ProgressBar` | Página **Upload**: progresso de cada arquivo e espaço usado. Página **Perfil**: perfil completo |
| Abas | `src/components/Tabs` | Página **Perfil**: Visão geral, Carrinho e Configurações |
| Menu Suspenso | `src/components/Dropdown` | **Produtos**: filtro de categoria e ordenação. **Perfil**: idioma e e-mails. Fecha ao selecionar, ao clicar fora ou com Esc |
| Notificação Toast | `src/components/Toast` | Em todas as páginas: sucesso, erro, informação e aviso. Some sozinha após alguns segundos ou ao clicar no ×, e pausa com o mouse em cima |

## Conceitos de React demonstrados

- **Componentes funcionais** organizados por pasta (`components/`, `pages/`, `context/`, `data/`).
- **Props**: `Accordion` recebe `items`; `Pagination` recebe `totalPages`, `currentPage` e `onPageChange`; `ProgressBar` recebe `value` (0 a 100); `Tabs` recebe `tabs`; `Dropdown` recebe `options` (cada uma pode ter seu callback `onSelect`); `Toast` recebe `type` e `message`.
- **State local** com `useState`: item aberto do acordeão, aba ativa, visibilidade do menu, página atual, fila de uploads.
- **Hooks**: `useState`, `useEffect` (timer do toast, clique fora do menu, simulação do upload), `useMemo`, `useCallback`, `useRef`, `useId` e hooks próprios (`useToast`, `useCart`).
- **Eventos**: cliques, teclado (setas, Home, End, Esc, Enter), mouse, `onChange` de arquivo e `onSubmit` de formulário.

## Desafio extra (feito com os dois recursos)

- **React Router** (`react-router-dom`): rotas `/`, `/produtos`, `/upload`, `/perfil`, `/faq`, mais uma página 404. A navegação fica no `Header` com `NavLink`.
- **Context API** (estado global):
  - `ToastContext`: qualquer componente chama `showToast(mensagem, tipo)` e o `ToastContainer` exibe as notificações empilhadas.
  - `CartContext`: a página **Produtos** adiciona itens e o **Header** (componente não relacionado) mostra a quantidade no ícone do carrinho. A aba Carrinho do Perfil lista os itens.

## Responsividade

- Layout fluido com CSS Grid e Flexbox (`auto-fill`, `minmax`, `clamp`).
- Breakpoints em **768px** (menu vira hambúrguer), **900px** (upload em uma coluna) e **600px/480px** (filtros empilhados, paginação compacta e toasts na parte de baixo da tela).
- Tema claro/escuro automático (`prefers-color-scheme`) e respeito a `prefers-reduced-motion`.

## Acessibilidade

- Tags semânticas: `header`, `nav`, `main`, `section`, `article`, `footer`, `table`, `dl`.
- Link "Pular para o conteúdo".
- ARIA:
  - Acordeão: `aria-expanded`, `aria-controls`, `role="region"`.
  - Abas: `role="tablist"`, `tab` e `tabpanel`, com `aria-selected`.
  - Menu: `aria-haspopup`, `listbox`/`option` e `aria-activedescendant`.
  - Barra de progresso: `role="progressbar"` com `aria-valuenow`.
  - Paginação: `aria-current="page"`.
  - Toasts: `aria-live`, com `role="alert"` para erros.
- Navegação completa pelo teclado e foco visível.

## Estrutura

```
src/
├── App.jsx                 # componente principal: provedores + layout + rotas
├── main.jsx                # ponto de entrada (BrowserRouter)
├── index.css               # variáveis de tema e estilos globais
├── context/                # ToastContext e CartContext (estado global)
├── components/
│   ├── Accordion/  Pagination/  ProgressBar/
│   ├── Tabs/  Dropdown/  Toast/
│   └── Layout/             # Header e Footer
├── pages/                  # Home, Produtos, Upload, Perfil, Faq, NotFound
└── data/                   # dados fictícios (produtos e FAQ)
```
