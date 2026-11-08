import './ProgressBar.css';

/**
 * Barra de Progresso: indicador visual do andamento de uma tarefa.
 *
 * Props:
 *  - value: progresso de 0 a 100
 *  - label: texto descritivo (usado também como nome acessível)
 *  - showPercentage: exibe o valor percentual (padrão: true)
 *  - variant: 'primary' | 'success' | 'warning' | 'danger'
 */
function ProgressBar({ value, label, showPercentage = true, variant = 'primary' }) {
  // Garante que o valor fique entre 0 e 100
  const progress = Math.min(100, Math.max(0, Math.round(Number(value) || 0)));

  return (
    <div className="progress">
      {(label || showPercentage) && (
        <div className="progress__header">
          {label && <span className="progress__label">{label}</span>}
          {showPercentage && <span className="progress__value">{progress}%</span>}
        </div>
      )}
      <div
        className="progress__track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`progress__fill progress__fill--${variant}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
