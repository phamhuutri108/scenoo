"use client";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteProjectModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteProjectModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl max-w-sm w-full flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
          <h2 className="text-title-md text-on-surface">Delete Project</h2>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6">
          <p className="text-body-md text-on-surface-variant">
            This project will be kept in the Trash tab for 30 days before being
            permanently deleted.
          </p>
        </div>

        <div className="p-4 border-t border-outline-variant flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-label-md text-on-surface border border-outline-variant hover:bg-surface-container transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-label-md bg-error text-on-error hover:opacity-90 transition-opacity cursor-pointer"
          >
            Move to Trash
          </button>
        </div>
      </div>
    </div>
  );
}
