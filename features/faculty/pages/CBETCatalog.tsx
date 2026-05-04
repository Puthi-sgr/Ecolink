import React, { useState } from 'react';
import { Card } from '../../../shared/molecules/Card';
import { Button } from '../../../shared/atoms/Button';
import { Input } from '../../../shared/atoms/Input';
import { CldImage } from '../../../shared/atoms/CldImage';
import { CBETPackage } from '../../../shared/types';
import { usePackages } from '../../../shared/repositories/packageRepository';
import { DialogBody, DialogFooter, DialogHeader, DialogPanel, DialogRoot } from '../../../shared/ui/Dialog';

interface SubmittedTripConfig {
  packageName: string;
  date: string;
  size: string;
  purpose: string;
}

export const CBETCatalog: React.FC = () => {
  const packages = usePackages();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<CBETPackage | null>(null);
  const [submittedConfig, setSubmittedConfig] = useState<SubmittedTripConfig | null>(null);
  const [date, setDate] = useState('');
  const [size, setSize] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleCardClick = (pkg: CBETPackage) => {
    setSelectedPackage(pkg);
    setDate('');
    setSize('');
    setPurpose('');
  };

  const handleCloseModal = () => {
    setSelectedPackage(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedPackage) return;

    setSubmittedConfig({
      packageName: selectedPackage.name,
      date,
      size,
      purpose,
    });
    handleCloseModal();
  };

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in pb-12 duration-500">
      <div className="relative mb-10 space-y-6 overflow-hidden rounded-eco border border-border bg-surface-2 p-8 text-center shadow-sm md:p-12">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

        <h1 className="relative z-10 text-3xl font-bold font-serif text-primary md:text-5xl">Find Your Next Field Trip</h1>
        <p className="relative z-10 mx-auto max-w-2xl text-lg text-text-muted">
          Explore certified CBET sites, check availability, and plan your curriculum-aligned excursion.
        </p>

        <div className="relative z-10 mx-auto mt-8 flex max-w-3xl flex-col gap-2 rounded-eco border border-border bg-surface p-2 shadow-lg md:flex-row">
          <div className="group relative flex-1 text-left">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <svg className="h-5 w-5 text-text-muted transition-colors group-focus-within:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by destination or activity..."
              className="h-12 w-full border-0 bg-transparent pl-10 pr-4 text-text outline-none placeholder:text-text-muted/50 focus:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="my-2 h-px bg-border md:my-0 md:h-auto md:w-px" />
          <div className="w-full flex-none md:w-40">
            <Button className="h-12 w-full text-base shadow-sm">Search</Button>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between px-1">
        <h2 className="text-xl font-bold font-serif text-text">Available Destinations</h2>
        <span className="text-sm text-text-muted">{filteredPackages.length} results found</span>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} onClick={() => handleCardClick(pkg)} className="group cursor-pointer">
            <Card className="flex h-full flex-col overflow-hidden border-0 p-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-56 overflow-hidden bg-surface-2">
                {pkg.imageSrc || pkg.imageKey ? (
                  <CldImage
                    src={pkg.imageSrc}
                    assetKey={pkg.imageKey}
                    alt={pkg.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-surface-2 text-text-muted italic">
                    <span className="text-lg opacity-40">Site image unavailable</span>
                  </div>
                )}
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-primary/10 bg-surface/90 px-3 py-1.5 text-xs font-bold text-primary shadow-sm backdrop-blur-sm">
                  <span>Duration</span> {pkg.duration}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {pkg.location}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-serif text-xl font-bold leading-tight text-text transition-colors group-hover:text-primary">{pkg.name}</h3>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-accent">${pkg.capacityBands[0]?.pricePerStudent}</span>
                    <span className="text-[10px] uppercase tracking-wide text-text-muted">per student</span>
                  </div>
                </div>

                <p className="mb-4 line-clamp-2 text-sm text-text-muted">{pkg.description}</p>

                <div className="mt-auto space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {pkg.activities.slice(0, 3).map((activity) => (
                      <span key={activity} className="rounded-md border border-border bg-surface-2 px-2 py-1 text-xs text-text-muted">
                        {activity}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-3 text-sm text-text-muted">
                    <span>
                      Max Capacity: <span className="font-medium text-text">{pkg.bookingConditions.maxGroupSize}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium text-primary transition-transform group-hover:translate-x-1">
                      Configure Trip <span className="text-lg">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {selectedPackage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20 p-4 backdrop-blur-sm">
          <Card className="relative flex max-h-[90vh] w-full max-w-4xl animate-in zoom-in-95 flex-col overflow-hidden p-0 shadow-2xl duration-200 md:flex-row">
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-surface/50 text-text-muted transition-colors hover:bg-surface hover:text-text"
            >
              ×
            </button>

            <div className="max-h-[40vh] w-full overflow-y-auto border-b border-border bg-surface p-6 md:max-h-full md:w-3/5 md:border-b-0 md:border-r md:p-8">
              <div className="mb-6">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-accent">{selectedPackage.cbetSite}</span>
                <h2 className="mb-2 text-3xl font-bold font-serif text-text">{selectedPackage.name}</h2>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>{' '}
                    {selectedPackage.location}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>{selectedPackage.managingOrg}</span>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h4 className="mb-3 flex items-center gap-2 font-bold text-text">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-surface-2 text-xs text-primary">📖</span>
                    Overview
                  </h4>
                  <p className="text-sm leading-relaxed text-text-muted">{selectedPackage.description}</p>
                </section>

                <section>
                  <h4 className="mb-3 flex items-center gap-2 font-bold text-text">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-surface-2 text-xs text-primary">🗓</span>
                    Sample Itinerary
                  </h4>
                  <ul className="space-y-3">
                    {selectedPackage.scheduleOutline.map((item, index) => (
                      <li key={`${item}-${index}`} className="flex gap-3 text-sm">
                        <div className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                        <span className="text-text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="mb-2 text-sm font-bold text-text">Includes</h4>
                    <ul className="space-y-1 text-xs text-text-muted">
                      {selectedPackage.includes.map((include) => (
                        <li key={include}>✓ {include}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-bold text-text">
                      Safety Level:{' '}
                      <span className={selectedPackage.safetyInfo.activityLevel === 'High' ? 'text-clay' : 'text-accent'}>
                        {selectedPackage.safetyInfo.activityLevel}
                      </span>
                    </h4>
                    <p className="text-xs text-text-muted">{selectedPackage.safetyInfo.riskNotes}</p>
                  </div>
                </section>
              </div>
            </div>

            <div className="flex w-full flex-col overflow-y-auto bg-surface-2 p-6 md:w-2/5 md:p-8">
              <h3 className="mb-6 text-lg font-bold text-text">Configure Your Trip</h3>

              <form onSubmit={handleSubmit} className="flex-1 space-y-5">
                <div className="space-y-4">
                  <Input
                    label="Trip Date"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-surface"
                  />

                  <div>
                    <Input
                      label="Group Size"
                      type="number"
                      min={selectedPackage.bookingConditions.minGroupSize}
                      max={selectedPackage.bookingConditions.maxGroupSize}
                      placeholder={`${selectedPackage.bookingConditions.minGroupSize} - ${selectedPackage.bookingConditions.maxGroupSize} people`}
                      required
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="bg-surface"
                    />
                    {size ? (
                      <div className="mt-2 flex animate-in items-center justify-between rounded border border-border bg-surface p-3 fade-in">
                        <span className="text-xs text-text-muted">Estimated Total</span>
                        <span className="font-bold text-primary">${Number(size) * selectedPackage.capacityBands[0].pricePerStudent}</span>
                      </div>
                    ) : null}
                  </div>

                  <Input
                    label="Academic Purpose"
                    placeholder="e.g. Biology Field Trip"
                    required
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="bg-surface"
                  />
                </div>

                <div className="mt-auto border-t border-border/50 pt-6">
                  <div className="mb-4 rounded border border-border bg-white/50 p-3 text-xs text-text-muted">
                    <p className="mb-1 font-semibold">Booking Terms</p>
                    <p>• {selectedPackage.depositDetails.percentage}% deposit required within {selectedPackage.depositDetails.deadlineDays} days.</p>
                    <p>• {selectedPackage.bookingConditions.cancellationPolicy}</p>
                  </div>
                  <Button type="submit" className="h-12 w-full text-base shadow-sm">Request Approval</Button>
                  <p className="mt-3 text-center text-[10px] text-text-muted">
                    Clicking Request adds this trip to your faculty dashboard for review.
                  </p>
                </div>
              </form>
            </div>
          </Card>
        </div>
      ) : null}

      <DialogRoot isOpen={Boolean(submittedConfig)} onClose={() => setSubmittedConfig(null)}>
        <DialogPanel size="sm">
          <DialogHeader
            title="Trip configuration saved"
            description="The request draft is ready for the faculty workflow."
            onClose={() => setSubmittedConfig(null)}
          />
          <DialogBody className="space-y-3 text-sm text-text-muted">
            <p><span className="font-semibold text-text">Package:</span> {submittedConfig?.packageName}</p>
            <p><span className="font-semibold text-text">Date:</span> {submittedConfig?.date}</p>
            <p><span className="font-semibold text-text">Group:</span> {submittedConfig?.size} pax</p>
            <p><span className="font-semibold text-text">Purpose:</span> {submittedConfig?.purpose}</p>
          </DialogBody>
          <DialogFooter className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setSubmittedConfig(null)}>Close</Button>
            <Button
              onClick={() => {
                setSubmittedConfig(null);
                window.location.hash = '/faculty/dashboard';
              }}
            >
              Open Faculty Dashboard
            </Button>
          </DialogFooter>
        </DialogPanel>
      </DialogRoot>
    </div>
  );
};
