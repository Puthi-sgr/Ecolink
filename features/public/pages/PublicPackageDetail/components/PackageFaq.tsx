import React from 'react';
import { CBETPackage } from '../../../../../shared/types';

interface PackageFaqProps {
  pkg: CBETPackage;
}

export const PackageFaq: React.FC<PackageFaqProps> = ({ pkg }) => {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-bold font-serif text-text">Planning FAQ</h3>
      <div className="space-y-3">
        {pkg.faq.map((item) => (
          <details key={item.question} className="rounded-2xl border border-border bg-white p-5 shadow-sm group">
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
