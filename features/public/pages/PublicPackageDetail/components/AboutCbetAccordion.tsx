import React from 'react';

export const AboutCbetAccordion: React.FC = () => {
  return (
    <div className="space-y-3">
      <details className="group rounded-2xl border border-border bg-surface p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-text">
          <span>FAQs</span>
          <span className="text-text-muted group-open:rotate-180 transition-transform">+</span>
        </summary>
        <p className="mt-3 text-sm text-text-muted leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at nisi non sapien
          gravida posuere a vitae massa. Vivamus vitae tortor quis nulla luctus lacinia.
        </p>
      </details>

      <details className="group rounded-2xl border border-border bg-surface p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-text">
          <span>Facilities</span>
          <span className="text-text-muted group-open:rotate-180 transition-transform">+</span>
        </summary>
        <p className="mt-3 text-sm text-text-muted leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies, nisi sit amet
          auctor viverra, massa lectus vehicula nisl, non sodales arcu mi id metus.
        </p>
      </details>

      <details className="group rounded-2xl border border-border bg-surface p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-text">
          <span>Seasonality</span>
          <span className="text-text-muted group-open:rotate-180 transition-transform">+</span>
        </summary>
        <p className="mt-3 text-sm text-text-muted leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. In sed lectus sed
          nibh sollicitudin convallis. Morbi sit amet arcu sit amet lectus aliquet pharetra.
        </p>
      </details>
    </div>
  );
};
