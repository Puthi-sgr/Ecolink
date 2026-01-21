import React from 'react';
import { Card } from '../../../shared/molecules/Card';

export const LandingFeatures: React.FC = () => {
  return (
    <section className="grid md:grid-cols-3 gap-6">
      <Card title="For Faculty" className="h-full">
        <p className="text-text-muted mb-4">
          Submit grant proposals, track project status in real-time, and manage your research portfolio effortlessly.
        </p>
      </Card>
      <Card title="For Administration" className="h-full">
        <p className="text-text-muted mb-4">
          Review submissions, ensure compliance, and oversee funding allocation with a calm, organized dashboard.
        </p>
      </Card>
      <Card title="Public Transparency" className="h-full">
        <p className="text-text-muted mb-4">
          View approved public initiatives and see how we are making a difference in the local ecosystem.
        </p>
      </Card>
    </section>
  );
};