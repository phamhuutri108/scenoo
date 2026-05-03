"use client";

import { useRouter } from 'next/navigation';

interface ExportUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  exportType: 'pdf' | 'csv' | 'sheets' | null;
}

const CONTENT: Record<
  'pdf' | 'csv' | 'sheets',
  { title: string; message: string; secondaryLabel: string }
> = {
  pdf: {
    title: 'Export PDF',
    message:
      'Your PDF will include a Scenoo watermark. Upgrade your plan to export clean, watermark-free documents.',
    secondaryLabel: 'Export with Watermark',
  },
  csv: {
    title: 'Export CSV',
    message:
      'Exporting to local CSV is a premium feature. Upgrade your plan to unlock full data portability.',
    secondaryLabel: 'Cancel',
  },
  sheets: {
    title: 'Sync to Google Sheets',
    message:
      'Real-time 1-way sync to your Google Drive account is available on premium plans. Upgrade to seamlessly edit your shotlist in Google Sheets.',
    secondaryLabel: 'Cancel',
  },
};

export default function ExportUpgradeModal({
  isOpen,
  onClose,
  exportType,
}: ExportUpgradeModalProps) {
  const router = useRouter();

  if (!isOpen || !exportType) return null;

  const { title, message, secondaryLabel } = CONTENT[exportType];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl max-w-sm w-full p-6">
        <h2 className="text-[18px] font-semibold text-on-surface mb-2">{title}</h2>
        <p className="text-[14px] text-on-surface-variant leading-relaxed mb-6">{message}</p>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => router.push('/settings/plans')}
            className="w-full bg-primary text-white text-[14px] font-medium px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Upgrade Plan
          </button>
          <button
            onClick={onClose}
            className="w-full bg-surface-container-low border border-outline-variant text-on-surface text-[14px] font-medium px-4 py-2.5 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
          >
            {secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
