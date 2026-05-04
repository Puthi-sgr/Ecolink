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
    <div className="divide-y divide-border/65 border-y border-border/65">
      {items.map((item) => (
        <details key={item.title} className="group py-5">
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
