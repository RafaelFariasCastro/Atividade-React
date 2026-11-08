import { useId, useState } from 'react';
import './Accordion.css';

/**
 * Acordeão: seções expansíveis/colapsáveis.
 *
 * Props:
 *  - items: [{ id, title, content }]  títulos e conteúdos dos itens
 *  - allowMultiple: se true, permite vários itens abertos ao mesmo tempo
 *  - defaultOpenId: id do item aberto inicialmente (opcional)
 */
function Accordion({ items, allowMultiple = false, defaultOpenId = null }) {
  // Estado: lista com os ids dos itens abertos
  const [openIds, setOpenIds] = useState(defaultOpenId ? [defaultOpenId] : []);
  const baseId = useId();

  const toggleItem = (id) => {
    setOpenIds((current) => {
      const isOpen = current.includes(id);
      if (isOpen) return current.filter((openId) => openId !== id);
      // Modo padrão: apenas um item aberto por vez
      return allowMultiple ? [...current, id] : [id];
    });
  };

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const buttonId = `${baseId}-botao-${item.id}`;
        const panelId = `${baseId}-painel-${item.id}`;

        return (
          <div key={item.id} className={`accordion__item ${isOpen ? 'is-open' : ''}`}>
            <h3 className="accordion__heading">
              <button
                type="button"
                id={buttonId}
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
              >
                <span>{item.title}</span>
                <span className="accordion__icon" aria-hidden="true" />
              </button>
            </h3>
            {/* O painel usa grid-template-rows para animar a altura suavemente */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="accordion__panel"
              inert={isOpen ? undefined : ''}
            >
              <div className="accordion__content">
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
