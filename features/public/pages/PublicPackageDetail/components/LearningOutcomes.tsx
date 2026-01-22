import React from 'react';
import { Check, GraduationCap } from 'lucide-react';

interface LearningOutcomesProps {
  outcomes: string[];
}

export const LearningOutcomes: React.FC<LearningOutcomesProps> = ({ outcomes }) => {
  return (
    <section>
      <h3 className="font-bold text-primary font-serif text-lg mb-4 flex items-center gap-2">
        <GraduationCap className="w-6 h-6" /> Learning Outcomes
      </h3>
      <ul className="space-y-4">
        {outcomes.map((outcome) => (
          <li key={outcome} className="flex gap-4 text-sm text-text leading-relaxed bg-surface-2/50 p-3 rounded-lg border border-border/50">
            <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            {outcome}
          </li>
        ))}
      </ul>
    </section>
  );
};
