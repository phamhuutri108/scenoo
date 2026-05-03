'use client';

interface Props {
  viewMode: 'single' | 'scroll';
  currentPage: number;
  totalPages: number;
}

function MockScriptPage({ pageNum }: { pageNum: number }) {
  return (
    <div
      data-scroll-page="true"
      data-page-num={pageNum}
      className="bg-white border border-outline-variant shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col relative shrink-0"
      style={{ width: '794px', height: '1123px' }}
    >
      <div className="absolute top-8 right-12 text-outline-variant font-mono text-[12px]">
        PAGE {pageNum}
      </div>
      <div className="p-16 flex-1 flex flex-col items-center justify-center text-outline-variant border-2 border-dashed border-outline-variant/30 m-8 rounded-lg">
        <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">description</span>
        <p className="font-mono text-sm">Line Script Content (Page {pageNum})</p>
      </div>
    </div>
  );
}

export default function LineScriptExportPreview({ viewMode, currentPage, totalPages }: Props) {
  if (viewMode === 'scroll') {
    return (
      <div className="flex flex-col gap-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <MockScriptPage key={i} pageNum={i + 1} />
        ))}
        <div className="text-center text-on-surface-variant py-8 font-mono text-sm">
          ... {totalPages - 5} more pages ...
        </div>
      </div>
    );
  }

  return (
    <div>
      <MockScriptPage pageNum={currentPage} />
    </div>
  );
}
