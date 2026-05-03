'use client';

/**
 * ShotlistTableHeader — Presentational
 * Renders the single sticky header row for the 18-column shotlist.
 * Column layout mirrors ShotlistTableRow exactly; width changes must be
 * kept in sync between both files.
 */

const FROZEN_HEADERS = [
  { label: '#',   className: 'w-12 sticky left-0 z-20 flex items-center justify-center border-r border-[#E5E7EB]' },
  { label: 'SC#', className: 'w-16 sticky left-12 z-20 flex items-center justify-center border-r border-[#E5E7EB]' },
  { label: 'SH#', className: 'w-16 sticky left-[112px] z-20 flex items-center justify-center border-r border-[#E5E7EB]' },
] as const;

const SCROLLABLE_HEADERS = [
  { label: 'LOCATION',    className: 'w-36' },
  { label: 'INT/EXT',     className: 'w-20' },
  { label: 'D/N',         className: 'w-20' },
  { label: 'STORYBOARD',  className: 'w-24' },
  { label: 'DESCRIPTION', className: 'w-48' },
  { label: 'DIALOGUE',    className: 'w-48' },
  { label: 'SUBJECTS',    className: 'w-32' },
  { label: 'SCRIPT TIME', className: 'w-24' },
  { label: 'SHOT SIZE',   className: 'w-32' },
  { label: 'SHOT TYPE',   className: 'w-32' },
  { label: 'SIDE',        className: 'w-16' },
  { label: 'ANGLE',       className: 'w-28' },
  { label: 'MOVEMENT',    className: 'w-28' },
  { label: 'LENS',        className: 'w-20' },
  { label: 'NOTE',        className: 'w-48' },
] as const;

export default function ShotlistTableHeader() {
  return (
    <div className="flex h-10 sticky top-0 z-20 bg-gray-50 border-b border-[#E5E7EB]">
      {FROZEN_HEADERS.map((col) => (
        <div
          key={col.label}
          className={`${col.className} bg-gray-50 shrink-0 text-[11px] font-medium tracking-[0.02em] text-[#424754] uppercase`}
        >
          {col.label}
        </div>
      ))}

      {SCROLLABLE_HEADERS.map((col) => (
        <div
          key={col.label}
          className={`${col.className} shrink-0 flex items-center px-3 border-r border-[#E5E7EB] text-[11px] font-medium tracking-[0.02em] text-[#424754] uppercase`}
        >
          {col.label}
        </div>
      ))}
    </div>
  );
}
