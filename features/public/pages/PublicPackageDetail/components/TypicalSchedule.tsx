import React from 'react';
import { ClipboardList, Leaf } from 'lucide-react';
import { CldImage } from '../../../../../shared/atoms/CldImage';
import { ImagePreviewLightbox } from '../../../../../shared/components/ImagePreviewLightbox';
import { CldAssetKey } from '../../../../../shared/utils/cld/cldAssets';

interface TypicalScheduleProps {
  schedule: string[];
}

const SCHEDULE_IMAGES: CldAssetKey[] = [
  'cbet.package.veunsaisiampang.hero',
  'cbet.package.veunsaisiampang.community.story',
  'cbet.package.veunsaisiampang.snapshot',
  'cbet.package.veunsaisiampang.significance',
];

const splitScheduleItem = (item: string, index: number) => {
  const dayMatch = item.match(/^Day\s+(\d+)\s*[-:]\s*(.+)$/i);
  if (dayMatch) {
    return {
      title: dayMatch[2].trim(),
      detail: dayMatch[2].trim(),
    };
  }

  const timedMatch = item.match(/^([^:-]+(?:\:\d{2})?)\s*[-–]\s*(.+)$/);
  if (timedMatch) {
    return {
      title: timedMatch[1].trim(),
      detail: timedMatch[2].trim(),
    };
  }

  return {
    title: `Schedule stop ${index + 1}`,
    detail: item,
  };
};

export const TypicalSchedule: React.FC<TypicalScheduleProps> = ({ schedule }) => {
  const scheduleItems = schedule.map((item, index) => {
    const parsed = splitScheduleItem(item, index);

    return {
      ...parsed,
      dayLabel: `Day ${index + 1}`,
      imageKey: SCHEDULE_IMAGES[index % SCHEDULE_IMAGES.length],
    };
  });

  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeItem = scheduleItems[activeIndex] ?? scheduleItems[0];
  const slides = scheduleItems.map((item) => ({
    assetKey: item.imageKey,
    alt: item.title,
    title: item.title,
    description: item.detail,
  }));

  if (!activeItem) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-[32px] border border-border/70 bg-white shadow-sm">
      <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)]">
        <div className="border-b border-border/60 bg-surface-2/55 px-5 py-7 lg:max-h-[44rem] lg:overflow-y-auto lg:border-b-0 lg:border-r lg:border-border/60 lg:px-7">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-200 bg-white text-primary">
              <ClipboardList className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Field rhythm</p>
          </div>

          <h3 className="mt-5 max-w-[12rem] text-[2.8rem] font-bold font-serif leading-[0.94] text-text md:max-w-none md:text-[3.25rem]">
            A Day in the Life
          </h3>

          <div className="mt-8 space-y-4">
            {scheduleItems.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${item.dayLabel}-${item.title}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`block w-full border-l-2 text-left transition ${
                    isActive
                      ? 'rounded-[18px] border-l-[6px] border-primary-200 bg-[#0f4d17] px-5 py-5 shadow-[0_18px_36px_rgba(74,163,30,0.18)]'
                      : 'border-border/65 bg-transparent px-5 py-4 hover:border-primary-200 hover:bg-white/72'
                  }`}
                  aria-pressed={isActive}
                >
                  <p className={`text-[1.55rem] font-bold font-serif leading-tight ${isActive ? 'text-white' : 'text-text'}`}>
                    {item.dayLabel}
                  </p>
                  <p
                    className={`mt-2 max-w-[24rem] text-sm leading-relaxed ${
                      isActive ? 'text-white/80' : 'text-text-muted'
                    }`}
                  >
                    {item.detail}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <article className="relative min-h-[26rem] bg-surface-2 lg:min-h-[44rem]">
          <ImagePreviewLightbox
            slides={slides}
            initialIndex={activeIndex}
            triggerClassName="block h-full min-h-[26rem] w-full cursor-zoom-in text-left lg:min-h-[44rem]"
            triggerLabel={`Preview ${activeItem.title} image`}
          >
            <CldImage
              assetKey={activeItem.imageKey}
              alt={activeItem.title}
              className="h-full w-full object-cover"
            />
          </ImagePreviewLightbox>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(12,18,28,0.86)] via-[rgba(12,18,28,0.28)] to-[rgba(12,18,28,0.12)]" />

          <div className="absolute inset-x-4 top-4 md:inset-x-6 md:top-6">
            <div className="max-w-[34rem] text-white">
              <div className="flex items-start gap-4">
                <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/12 text-primary-300 backdrop-blur-sm">
                  <Leaf className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">{activeItem.dayLabel}</p>
                  <h4 className="mt-2 text-[2rem] font-bold font-serif leading-[1.02] text-white">{activeItem.title}</h4>
                  <p className="mt-3 max-w-[30rem] text-sm leading-relaxed text-white/88">{activeItem.detail}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
