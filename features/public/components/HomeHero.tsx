import React, { useId } from 'react';
import { ArrowRight, Calendar, CheckCircle, MapPin, Users } from 'lucide-react';
import { Button } from '../../../shared/atoms/Button';
import { CldImage } from '../../../shared/atoms/CldImage';
import { useCBETPackages } from '../../../shared/data/cbetData';

interface HomeHeroProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  groupSize?: string;
  onGroupSizeChange?: (value: string) => void;
  tripDate?: string;
  onTripDateChange?: (value: string) => void;
  onExplore?: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  searchTerm = '',
  onSearchChange,
  groupSize = '',
  onGroupSizeChange,
  tripDate = '',
  onTripDateChange,
  onExplore,
}) => {
  const packages = useCBETPackages();
  const destinationInputId = useId();
  const tripDateId = useId();
  const groupSizeId = useId();

  return (
    <section className="relative mb-12 w-full overflow-hidden bg-surface-2 pb-16">
      <div className="absolute inset-0 z-0 h-[500px] overflow-hidden">
        <CldImage
          height={600}
          assetKey="hero.main"
          alt="Faculty and students preparing for a community-based ecotourism visit"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/45" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-28 pt-20 text-white md:px-5 xl:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
            University-ready site discovery
          </div>

          <h1 className="text-balance text-4xl font-bold font-serif tracking-tight drop-shadow-md md:text-6xl">
            Plan Community-Based Ecotourism Trips With Clearer Choices
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/88 md:text-lg">
            Compare destinations, estimate fit by group size, and move from site discovery to faculty request review without switching tools.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium opacity-95 md:gap-8 md:text-base">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 fill-white stroke-accent text-accent" aria-hidden="true" />
              <span>Verified Safety Protocols</span>
            </div>
            <span className="hidden text-white/40 md:inline" aria-hidden="true">|</span>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 fill-white stroke-accent text-accent" aria-hidden="true" />
              <span>University Approved</span>
            </div>
            <span className="hidden text-white/40 md:inline" aria-hidden="true">|</span>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 fill-white stroke-accent text-accent" aria-hidden="true" />
              <span>Community Impact Visibility</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container relative z-20 mx-auto -mt-16 px-4 md:px-5 xl:px-6">
        <div className="mx-auto max-w-6xl rounded-[28px] border border-border/60 bg-white/95 p-3 shadow-2xl backdrop-blur">
          <div className="grid gap-3 rounded-[22px] bg-white p-3 md:grid-cols-12">
            <div className="md:col-span-5">
              <label htmlFor={destinationInputId} className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
                Destination or Province
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <MapPin className="h-5 w-5 text-text-muted" aria-hidden="true" />
                </div>
                <input
                  id={destinationInputId}
                  type="text"
                  value={searchTerm}
                  onChange={(event) => onSearchChange?.(event.target.value)}
                  list="cbet-destinations"
                  name="destination"
                  autoComplete="off"
                  placeholder="Search by CBET site or province..."
                  className="h-16 w-full rounded-2xl border border-border bg-surface-2 pl-11 pr-4 text-base font-medium text-text outline-none transition-colors placeholder:text-text-muted/80 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
                />
                <datalist id="cbet-destinations">
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.name}>
                      {pkg.location}
                    </option>
                  ))}
                </datalist>
              </div>
            </div>

            <div className="md:col-span-3">
              <label htmlFor={tripDateId} className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
                Trip Date Preview
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Calendar className="h-5 w-5 text-text-muted" aria-hidden="true" />
                </div>
                <input
                  id={tripDateId}
                  type="date"
                  value={tripDate}
                  onChange={(event) => onTripDateChange?.(event.target.value)}
                  name="tripDate"
                  className="h-16 w-full rounded-2xl border border-border bg-surface-2 pl-11 pr-4 text-base font-medium text-text outline-none transition-colors focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor={groupSizeId} className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
                Group Size
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Users className="h-5 w-5 text-text-muted" aria-hidden="true" />
                </div>
                <select
                  id={groupSizeId}
                  value={groupSize}
                  onChange={(event) => onGroupSizeChange?.(event.target.value)}
                  name="groupSize"
                  className="h-16 w-full appearance-none rounded-2xl border border-border bg-surface-2 pl-11 pr-8 text-base font-medium text-text outline-none transition-colors focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
                >
                  <option value="">Any size</option>
                  <option value="10-20">10-20 participants</option>
                  <option value="21-40">21-40 participants</option>
                  <option value="41+">41+ participants</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex h-full flex-col justify-end">
                <Button className="h-16 w-full rounded-2xl text-base font-bold shadow-lg" onClick={onExplore}>
                  Explore Sites
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 px-3 pb-2 pt-1 text-sm text-text-muted">
            <span className="font-semibold text-text">Trip planning starts with real package constraints.</span>
            <span>Search destinations, set a planning date, then switch between map and photo view below.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
