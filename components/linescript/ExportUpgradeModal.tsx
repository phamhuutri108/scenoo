'use client';

import { useRouter } from 'next/navigation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  exportType?: 'pdf' | 'csv' | 'sheets' | null;
}

const CONTENT = {
  pdf: {
    title: "Export PDF",
    message: "Your current plan includes PDF exports with a Scenoo watermark. Upgrade to a Pro or Max plan to remove watermarks and unlock high-resolution exports.",
    icon: "workspace_premium",
    secondaryLabel: "Export with Watermark",
    secondaryIcon: "download"
  },
  csv: {
    title: "Export CSV",
    message: "Exporting to local CSV is a premium feature. Upgrade your plan to unlock full data portability.",
    icon: "lock",
    secondaryLabel: "Cancel",
    secondaryIcon: "close"
  },
  sheets: {
    title: "Sync to Google Sheets",
    message: "Real-time 1-way sync to your Google Drive account is available on premium plans. Upgrade to seamlessly edit your shotlist in Google Sheets.",
    icon: "lock",
    secondaryLabel: "Cancel",
    secondaryIcon: "close"
  }
};

export default function ExportUpgradeModal({ isOpen, onClose, exportType = 'pdf' }: Props) {
  const router = useRouter();

  if (!isOpen) return null;

  const type = exportType || 'pdf';
  const config = CONTENT[type];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl max-w-md w-full flex flex-col p-6 animate-in fade-in duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-h3 text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">{config.icon}</span>
            {config.title}
          </h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-body-md text-on-surface-variant mb-6">
          {config.message}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push('/settings/plans')}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 text-label-md font-bold uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            Upgrade Plan
          </button>
          <button
            onClick={() => {
              if (type === 'pdf') {
                console.log("Generating PDF with watermark...");
                // TODO: Wire up actual PDF generation logic here
              }
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-surface-container-low border border-outline-variant text-on-surface text-label-md font-bold uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">{config.secondaryIcon}</span>
            {config.secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
