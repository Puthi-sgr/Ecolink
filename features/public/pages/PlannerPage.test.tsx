import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthProvider } from '../../../app/AuthContext';
import { PlannerProvider } from '../../../app/PlannerContext';
import { TripProvider } from '../../../app/TripContext';
import { PlannerPage } from './PlannerPage';

describe('PlannerPage', () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.hash = '#/planner?request=quote-001&view=documents&document=approval-pack&audience=admin';
  });

  it('hydrates the selected request from hash query state', async () => {
    render(
      <AuthProvider>
        <TripProvider>
          <PlannerProvider>
            <PlannerPage />
          </PlannerProvider>
        </TripProvider>
      </AuthProvider>
    );

    expect(await screen.findByText('Canonical workflow workspace')).toBeInTheDocument();
    expect(screen.getAllByText('Prek Toal Community')[0]).toBeInTheDocument();
    expect(screen.getByText('Admin operations')).toBeInTheDocument();
    expect(screen.getAllByText('Admin approval pack').length).toBeGreaterThan(0);
  });
});
