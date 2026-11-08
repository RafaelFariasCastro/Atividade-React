import { useToast } from '../../context/ToastContext.jsx';
import Toast from './Toast.jsx';

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <section className="toast-container" aria-live="polite" aria-label="Notificações">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </section>
  );
}

export default ToastContainer;
