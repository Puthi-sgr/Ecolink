import React from 'react';

interface TravelGuideLayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

const TravelGuideLayout: React.FC<TravelGuideLayoutProps> = ({ sidebar, content }) => {
  return (
    <div className="pt-24 pb-20 min-h-screen container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Navigation Sidebar */}
        <aside className="lg:w-72 shrink-0 h-fit lg:sticky lg:top-24 z-10">
          <div className="bg-white rounded-[2rem] border border-stone-100 p-6 shadow-xl shadow-stone-200/50">
             {sidebar}
          </div>
        </aside>

        {/* Main Guide Content */}
        <main className="flex-1 space-y-20 w-full min-w-0">
           {content}
        </main>
      </div>
    </div>
  );
};

export default TravelGuideLayout;
