'use client';

import { useMemo } from 'react';

interface Props { data: Record<string, string>[]; }

export default function BreakdownExportReport({ data }: Props) {
  const stats = useMemo(() => {
    const countFreq = (arr: string[]) => {
      const counts: Record<string, number> = {};
      arr.forEach(a => { const key = a?.trim(); if (key) counts[key] = (counts[key] || 0) + 1; });
      return Object.entries(counts).sort((a, b) => b[1] - a[1]);
    };
    const splitCount = (arr: string[]) => {
      const split = arr.flatMap(a => a.split(',').map(s => s.trim()).filter(Boolean));
      return countFreq(split);
    };

    const uniqueScenes = new Set(data.map(r => r['SCENE']).filter(Boolean));

    return {
      totalScenes: uniqueScenes.size,
      ieStats: countFreq(data.map(r => r['I/E'])),
      dnStats: countFreq(data.map(r => r['D/N'])),
      locStats: countFreq(data.map(r => r['LOCATION NAME'])),
      castStats: splitCount(data.map(r => r['CAST'])),
    };
  }, [data]);

  const renderCard = (title: string, entries: [string, number][]) => (
    <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm flex flex-col h-64">
      <h3 className="text-label-md font-bold text-on-surface uppercase mb-4 pb-2 border-b border-outline-variant/50 shrink-0">{title}</h3>
      <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2 flex-1">
        {entries.map(([k, v]) => (
          <div key={k} className="flex justify-between items-center">
            <span className="text-body-md text-on-surface-variant truncate pr-4" title={k}>{k}</span>
            <span className="font-mono text-label-sm bg-surface-container px-2 py-0.5 rounded text-secondary shrink-0">{v}</span>
          </div>
        ))}
        {entries.length === 0 && <div className="text-body-md text-outline italic">No data</div>}
      </div>
    </div>
  );

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar bg-[#f9f9ff] p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-h1 text-on-surface">Breakdown Report</h1>
          <div className="bg-white border border-outline-variant rounded-lg px-4 py-2 text-center shadow-sm min-w-32">
            <div className="text-[10px] uppercase font-bold text-outline">Total Scenes</div>
            <div className="text-h2 text-primary">{stats.totalScenes}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {renderCard('Locations', stats.locStats)}
          {renderCard('Cast Frequency', stats.castStats)}
          {renderCard('INT / EXT', stats.ieStats)}
          {renderCard('Day / Night', stats.dnStats)}
        </div>
      </div>
    </div>
  );
}
