import { useEffect, useId, useRef, useState } from 'react';
import './Dropdown.css';

/**
 * Menu Suspenso: seleção de uma opção a partir de uma lista.
 *
 * Props:
 *  - label: rótulo do menu (ex.: "Categoria")
 *  - options: [{ value, label, onSelect? }]  cada opção pode ter um callback próprio
 *  - value: valor atualmente selecionado
 *  - onChange: callback geral chamado com a opção escolhida
 *  - placeholder: texto exibido quando nada foi selecionado
 */
function Dropdown({ label, options, value, onChange, placeholder = 'Selecione...' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const baseId = useId();

  const selected = options.find((option) => option.value === value);

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Ao abrir, destaca a opção selecionada e move o foco para a lista
  useEffect(() => {
    if (isOpen) {
      const index = options.findIndex((option) => option.value === value);
      setHighlighted(index >= 0 ? index : 0);
      listRef.current?.focus();
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const close = () => {
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const selectOption = (option) => {
    option.onSelect?.(option);
    onChange?.(option);
    close();
  };

  const handleListKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlighted((i) => (i + 1) % options.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlighted((i) => (i - 1 + options.length) % options.length);
        break;
      case 'Home':
        event.preventDefault();
        setHighlighted(0);
        break;
      case 'End':
        event.preventDefault();
        setHighlighted(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        selectOption(options[highlighted]);
        break;
      case 'Escape':
      case 'Tab':
        close();
        break;
      default:
    }
  };

  const handleButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const labelId = `${baseId}-rotulo`;
  const listId = `${baseId}-lista`;

  return (
    <div className="dropdown" ref={containerRef}>
      {label && (
        <span id={labelId} className="dropdown__label">
          {label}
        </span>
      )}
      <button
        ref={buttonRef}
        type="button"
        className={`dropdown__button ${isOpen ? 'is-open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-labelledby={label ? `${labelId} ${baseId}-botao` : undefined}
        id={`${baseId}-botao`}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleButtonKeyDown}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <span className="dropdown__arrow" aria-hidden="true" />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          className="dropdown__menu"
          aria-labelledby={label ? labelId : undefined}
          aria-activedescendant={`${baseId}-opcao-${highlighted}`}
          onKeyDown={handleListKeyDown}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${baseId}-opcao-${index}`}
              role="option"
              aria-selected={option.value === value}
              className={`dropdown__option ${index === highlighted ? 'is-highlighted' : ''} ${
                option.value === value ? 'is-selected' : ''
              }`}
              onMouseEnter={() => setHighlighted(index)}
              onClick={() => selectOption(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
