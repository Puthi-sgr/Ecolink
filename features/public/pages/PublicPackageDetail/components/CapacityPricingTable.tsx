import React from 'react';
import { Info } from 'lucide-react';
import { CapacityBand } from '../../../../../shared/types';

interface CapacityPricingTableProps {
  bands: CapacityBand[];
}

export const CapacityPricingTable: React.FC<CapacityPricingTableProps> = ({ bands }) => {
  return (
    <section className="bg-surface-2 p-8 rounded-2xl border border-border">
      <h3 className="text-lg font-bold font-serif mb-6 flex items-center gap-2">
        <Info className="w-5 h-5 text-primary" /> Capacity & Detailed Pricing
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-text-muted border-b border-border">
              <th className="pb-4 font-bold uppercase tracking-wider text-xs">Group Size</th>
              <th className="pb-4 font-bold uppercase tracking-wider text-xs">Recommended Transport</th>
              <th className="pb-4 font-bold uppercase tracking-wider text-xs text-right">Price per Student</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bands.map((band) => (
              <tr key={`${band.min}-${band.max}`} className="group hover:bg-white/50 transition-colors">
                <td className="py-4 text-text font-medium pl-2">{band.min} - {band.max} pax</td>
                <td className="py-4 text-text-muted">
                  {band.max <= 25 ? 'Coordinated Minibus' : 'Standard 45-Seat Coach'}
                </td>
                <td className="py-4 text-right font-black text-primary text-lg pr-2">${band.pricePerStudent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
