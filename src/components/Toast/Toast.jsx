import { useEffect, useState } from 'react';
import './Toast.css';

const icons = { success: '✔', error: '✖', info: 'ℹ', warning: '⚠' };
const titles = { success: 'Sucesso', error: 'Erro', info: 'Informação', warning: 'Atenção' };

/**
 * Notificação Toast: mensagem temporária de feedback.
 *
 * Props:
 *  - id: identificador do toast
 *  - type: 'success' | 'error' | 'info' | 'warning'
 *  - message: texto da notificação
 *  - duration: tempo em ms até desaparecer sozinho
 *  - onClose: callback chamado com o id quando o toast deve ser removido
 */
function Toast({ id, type = 'info', message, duration = 4000, onClose }) {
  // Estado local que controla a animação de saída
  const [isLeaving, setIsLeaving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Fecha automaticamente após "duration" ms (pausa com o mouse em cima)
  useEffect(() => {
    if (isPaused || isLeaving) return undefined;
    const timer = setTimeout(() => setIsLeaving(true), duration);
    return () => clearTimeout(timer);
  }, [duration, isPaused, isLeaving]);

  // Aguarda a animação de saída antes de remover
  useEffect(() => {
    if (!isLeaving) return undefined;
    const timer = setTimeout(() => onClose(id), 250);
    return () => clearTimeout(timer);
  }, [isLeaving, onClose, id]);

  return (
    <div
      className={`toast toast--${type} ${isLeaving ? 'is-leaving' : ''}`}
      role={type === 'error' ? 'alert' : 'status'}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <span className="toast__icon" aria-hidden="true">
        {icons[type]}
      </span>
      <div className="toast__body">
        <strong className="toast__title">{titles[type]}</strong>
        <p className="toast__message">{message}</p>
      </div>
      <button
        type="button"
        className="toast__close"
        aria-label="Fechar notificação"
        onClick={() => setIsLeaving(true)}
      >
        ×
      </button>
      <span
        className="toast__timer"
        style={{ animationDuration: `${duration}ms`, animationPlayState: isPaused ? 'paused' : 'running' }}
        aria-hidden="true"
      />
    </div>
  );
}

export default Toast;
