import React from 'react';
import { Card } from '../../../shared/molecules/Card';
import { Leaf, HeartHandshake, Globe2 } from 'lucide-react';

export const CBETEducation: React.FC = () => {
  return (
    <section className="py-24 bg-surface-2 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
            <svg width="400" height="400" viewBox="0 0 200 200">
                <path fill="currentColor" d="M45.7,-76.3C58.9,-69.3,69.1,-55.8,76.3,-41.4C83.5,-26.9,87.7,-11.5,85.2,2.8C82.7,17.1,73.5,30.3,63.4,41.9C53.3,53.5,42.3,63.5,29.8,70.2C17.3,76.9,3.3,80.3,-9.6,78.2C-22.5,76.1,-34.3,68.5,-45.8,59.3C-57.3,50.1,-68.5,39.3,-75.4,26.1C-82.3,12.9,-84.9,-2.7,-80.6,-16.5C-76.3,-30.3,-65.1,-42.3,-53.1,-50.2C-41.1,-58.1,-28.3,-61.9,-15.8,-62.7C-3.3,-63.5,8.9,-61.3,32.5,-69.3L45.7,-76.3Z" transform="translate(100 100)" />
            </svg>
        </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-bold font-serif text-text mb-6">More Than Just a Trip</h2>
              <p className="text-lg text-text-muted leading-relaxed">
                When you book through EcoLink, you aren't just visiting a site; you are actively participating in a conservation model that works.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Globe2 className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text mb-2">What is Community-Based Ecotourism?</h3>
                  <p className="text-text-muted leading-relaxed">
                    CBET is tourism managed by local communities. Unlike standard tourism, the revenue stays local, empowering residents to manage their own natural resources.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Leaf className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text mb-2">How CBET Supports Conservation</h3>
                  <p className="text-text-muted leading-relaxed">
                    By placing economic value on living forests and wetlands, communities are incentivized to protect them. Your visit funds patrols against poaching and illegal logging.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-clay/10 flex items-center justify-center text-clay">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text mb-2">How Student Visits Benefit Communities</h3>
                  <p className="text-text-muted leading-relaxed">
                    Student groups provide reliable, scheduled income during off-seasons. This stability allows families to transition away from extractive livelihoods.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-full min-h-[500px] hidden lg:block">
             <div className="absolute inset-0 bg-gray-200 rounded-eco overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1544979590-2c008a0dfc0a?q=80&w=1000&auto=format&fit=crop" 
                    alt="Students in nature" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="font-serif text-2xl font-bold mb-2">"The students saw firsthand how the community protects the forest."</p>
                    <p className="text-sm opacity-80">- Dr. S. Jenning, Environmental Science</p>
                </div>
             </div>
             {/* Floating Stats Card */}
             <Card className="absolute -bottom-8 -left-8 w-64 shadow-xl border-0 animate-in slide-in-from-bottom-4 duration-1000 delay-300">
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Impact to Date</p>
                <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-primary">85%</span>
                    <span className="text-sm text-text-muted mb-1">revenue stays local</span>
                </div>
             </Card>
          </div>

        </div>
      </div>
    </section>
  );
};
