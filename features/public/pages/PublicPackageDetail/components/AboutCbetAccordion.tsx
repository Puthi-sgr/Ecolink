import React from 'react';

interface AboutCbetAccordionItem {
  title: string;
  content: string;
}

interface AboutCbetAccordionProps {
  items: AboutCbetAccordionItem[];
}

export const AboutCbetAccordion: React.FC<AboutCbetAccordionProps> = ({ items }) => {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.title} className="group rounded-2xl border border-border bg-surface p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-text">
            <span>{item.title}</span>
            <span className="text-text-muted group-open:rotate-180 transition-transform">+</span>
          </summary>
          <p className="mt-3 text-sm text-text-muted leading-relaxed">{item.content}</p>
        </details>
      ))}
    </div>
  );
};
