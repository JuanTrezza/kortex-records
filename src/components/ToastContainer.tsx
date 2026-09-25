import type { ToastMessage } from '../hooks/useToast';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-24 right-4 z-50 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-label="Notificaciones"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#1C1B1B] text-[#E5E2E1] px-5 py-3.5 shadow-2xl flex items-center gap-3 border border-[#353534] border-l-4 border-l-[#FF5722] animate-in slide-in-from-right-4 duration-200"
        >
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${
              toast.type === 'error'
                ? 'bg-[#E53935]'
                : toast.type === 'info'
                ? 'bg-[#2196F3]'
                : 'bg-[#76FF03]'
            }`}
          />
          <span className="font-mono text-xs uppercase tracking-wide">
            {toast.message}
          </span>
          <button
            type="button"
            onClick={() => onRemove(toast.id)}
            className="text-[#C7C6C6] hover:text-white ml-2"
            aria-label="Cerrar notificación"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
}
