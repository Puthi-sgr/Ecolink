import React from 'react';

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface SeasonalityHighlightsProps {
  rangeStartMonth?: number;
  rangeEndMonth?: number;
  peakStartMonth?: number;
  peakEndMonth?: number;
  title?: string;
  peakLabel?: string;
  bestSeasonNote?: string;
  wetSeasonNote?: string;
}

const normalizeMonth = (value: number | undefined, fallback: number) => {
  if (!value || Number.isNaN(value)) return fallback;
  const rounded = Math.round(value);
  if (rounded < 1) return 1;
  if (rounded > 12) return 12;
  return rounded;
};

const buildRange = (startMonth: number, endMonth: number) => {
  const months: number[] = [];
  let current = startMonth;
  for (let i = 0; i < 12; i += 1) {
    months.push(current);
    if (current === endMonth) break;
    current = current === 12 ? 1 : current + 1;
  }
  return months;
};

export const SeasonalityHighlights: React.FC<SeasonalityHighlightsProps> = ({
  rangeStartMonth = 11,
  rangeEndMonth = 5,
  peakStartMonth = 12,
  peakEndMonth = 3,
  title = 'Best Season & Changes',
  peakLabel = 'Peak Season',
  bestSeasonNote,
  wetSeasonNote
}) => {
  const start = normalizeMonth(rangeStartMonth, 11);
  const end = normalizeMonth(rangeEndMonth, 5);
  const peakStart = normalizeMonth(peakStartMonth, start);
  const peakEnd = normalizeMonth(peakEndMonth, end);

  const months = buildRange(start, end);
  const peakStartIndex = months.indexOf(peakStart);
  const peakEndIndex = months.indexOf(peakEnd);
  const safePeakStart = peakStartIndex === -1 ? 0 : peakStartIndex;
  const safePeakEnd = peakEndIndex === -1 ? months.length - 1 : peakEndIndex;
  const peakLeftIndex = Math.min(safePeakStart, safePeakEnd);
  const peakRightIndex = Math.max(safePeakStart, safePeakEnd);
  const segmentCount = Math.max(months.length - 1, 1);
  const leftPercent = (peakLeftIndex / segmentCount) * 100;
  const rightPercent = 100 - (peakRightIndex / segmentCount) * 100;
  const peakWidthPercent = 100 - rightPercent - leftPercent;
  const peakCenterPercent = leftPercent + peakWidthPercent / 2;

  const gridStyle = {
    gridTemplateColumns: `repeat(${months.length}, minmax(0, 1fr))`
  };

  return (
    <section className="space-y-5 rounded-[32px] border border-border/70 bg-white/96 px-5 py-7 shadow-sm md:px-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Season window</p>
        <h4 className="mt-2 text-2xl font-bold font-serif text-text">{title}</h4>
      </div>

      <div className="space-y-4">
        <div className="grid text-[11px] font-semibold text-text-muted" style={gridStyle}>
          {months.map((month) => (
            <div key={`top-${month}`} className="text-center">
              {MONTH_LABELS[month - 1]}
            </div>
          ))}
        </div>

        <div className="relative h-14">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 rounded-full bg-primary/15"></div>
          <div
            className="absolute top-1/2 -translate-y-1/2 h-6 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center px-4"
            style={{ left: `${leftPercent}%`, right: `${rightPercent}%` }}
          >

          </div>
          <div
            className="absolute top-2 -translate-y-1/2"
            style={{ left: `${peakCenterPercent}%` }}
          >
            <div className="relative -translate-x-1/2 bg-white border border-border text-text text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-2xl shadow-sm whitespace-nowrap">
              {peakLabel}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-border"></span>
              <span className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-t-[9px] border-l-transparent border-r-transparent border-t-white"></span>
            </div>
          </div>
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 grid" style={gridStyle}>
            {months.map((month, index) => {
              const isPeak = index >= peakLeftIndex && index <= peakRightIndex;
              return (
                <div key={`dot-${month}`} className="flex items-center justify-center">
                  <span
                    className={`h-2.5 w-2.5 rounded-full border ${isPeak ? 'bg-white border-white' : 'bg-surface border-primary/30'}`}
                  ></span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid text-[11px] font-semibold text-text-muted" style={gridStyle}>
          {months.map((month) => (
            <div key={`bottom-${month}`} className="text-center">
              {MONTH_LABELS[month - 1]}
            </div>
          ))}
        </div>

        {(bestSeasonNote || wetSeasonNote) && (
          <div className="grid gap-4 border-t border-border/55 pt-5 text-sm sm:grid-cols-2">
            {bestSeasonNote && (
              <div className="border-l border-primary-200 pl-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Best months</p>
                <p className="mt-1 text-sm leading-relaxed text-text">{bestSeasonNote}</p>
              </div>
            )}
            {wetSeasonNote && (
              <div className="border-l border-border pl-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Wet season</p>
                <p className="mt-1 text-sm leading-relaxed text-text">{wetSeasonNote}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
