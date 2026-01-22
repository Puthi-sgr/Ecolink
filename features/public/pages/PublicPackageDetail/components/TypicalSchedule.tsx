import React from 'react';
import { ClipboardList } from 'lucide-react';

interface TypicalScheduleProps {
  schedule: string[];
}

export const TypicalSchedule: React.FC<TypicalScheduleProps> = ({ schedule }) => {
  return (
    <section>
      <h3 className="font-bold text-primary font-serif text-lg mb-4 flex items-center gap-2">
        <ClipboardList className="w-6 h-6" /> Typical Schedule
      </h3>
      <div className="relative border-l-2 border-primary/20 ml-3 space-y-6 py-2">
        {schedule.map((item) => (
          <div key={item} className="pl-6 relative">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-primary ring-4 ring-primary/5"></div>
            <span className="text-sm font-medium text-text">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
