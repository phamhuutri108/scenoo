"use client";

interface DeleteForeverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteForeverModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteForeverModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl max-w-sm w-full flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
          <h2 className="text-title-md text-on-surface">Delete Forever?</h2>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6">
          <p className="text-body-md text-on-surface-variant">
            This project and all its scripts will be permanently deleted. This
            action cannot be undone.
          </p>
        </div>

        <div className="p-4 border-t border-outline-variant flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-label-md text-on-surface border border-outline-variant hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-label-md bg-error text-on-error hover:opacity-90 transition-opacity"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
