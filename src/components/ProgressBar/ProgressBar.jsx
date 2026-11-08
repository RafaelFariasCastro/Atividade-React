import './ProgressBar.css';

function ProgressBar({ value, label, showPercentage = true, variant = 'primary' }) {
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
