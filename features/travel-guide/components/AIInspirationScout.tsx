import React, { useState } from 'react';
import { Sparkles, Bot, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/shared/atoms/Button';


const AIInspirationScout: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  return (
    <section id="ai-scout" className="bg-white border-2 border-dashed border-stone-200 rounded-[2.5rem] p-12 text-center space-y-8">
      <div className="w-16 h-16 bg-stone-900 text-white rounded-2xl flex items-center justify-center mx-auto shadow-xl">
        <Sparkles className="w-8 h-8" />
      </div>

      <header className="max-w-xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Research Inspiration Scout</h2>
        <p className="text-stone-500 text-sm">Not sure where to start? Ask our AI Scout to find a destination based on your academic interests.</p>
      </header>

      <div className="max-w-md mx-auto relative">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. Sustainable fishing, Forest conservation, Silk weaving..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 text-sm"
          />

        </div>
      </div>


    </section>
  );
};

export default AIInspirationScout;