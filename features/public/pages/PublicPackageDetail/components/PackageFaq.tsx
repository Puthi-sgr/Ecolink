import React from 'react';
import { CBETPackage } from '../../../../../shared/types';

interface PackageFaqProps {
  pkg: CBETPackage;
}

export const PackageFaq: React.FC<PackageFaqProps> = ({ pkg }) => {
  return (
    <section className="space-y-5 border-t border-border/70 pt-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Policy notes</p>
        <h3 className="mt-2 text-2xl font-bold font-serif text-text">Planning FAQ</h3>
      </div>
      <div className="divide-y divide-border/65 border-y border-border/65">
        {pkg.faq.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="cursor-pointer list-none font-semibold text-text">
              <div className="flex items-center justify-between gap-4">
                <span>{item.question}</span>
                <span className="text-primary transition-transform group-open:rotate-45">+</span>
              </div>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};
