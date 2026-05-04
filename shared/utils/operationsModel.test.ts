import { describe, expect, it } from 'vitest';
import { ProjectStatus, UserRole } from '../types';
import { buildWorkflowRecords, mapPlannerStatusToWorkflowStatus, mapProjectStatusToWorkflowStatus } from './operationsModel';

describe('operationsModel', () => {
  it('maps planner and project statuses into workflow statuses', () => {
    expect(mapPlannerStatusToWorkflowStatus('Draft')).toBe('Draft');
    expect(mapPlannerStatusToWorkflowStatus('Ready for Faculty Review')).toBe('Under Review');
    expect(mapProjectStatusToWorkflowStatus(ProjectStatus.APPROVED)).toBe('Approved');
    expect(mapProjectStatusToWorkflowStatus(ProjectStatus.LOCKED)).toBe('Locked');
  });

  it('builds linked workflow records from plans, requests, and trips', () => {
    const records = buildWorkflowRecords(
      [
        {
          id: 'plan-1',
          name: 'Wetland Methods',
          packageIds: ['CBET-001'],
          targetDate: '2026-05-12',
          travelerType: 'Faculty',
          groupSize: '20',
          notes: 'Field methods',
          status: 'Ready to Request',
          createdAt: '2026-04-01',
        },
      ],
      [
        {
          id: 'quote-1',
          tripPlanId: 'plan-1',
          packageId: 'CBET-001',
          requesterRole: UserRole.FACULTY,
          targetDate: '2026-05-12',
          groupSize: '20',
          purpose: 'Field methods',
          transportPreference: 'Coach',
          accessibilityNotes: '',
          status: 'Quoted',
          lastUpdated: '2026-04-05',
          stageHistory: [],
          currentOwnerRole: UserRole.ADMIN,
          nextAction: 'Review quote',
          missingFields: [],
          documentStates: [],
          revisionCount: 0,
          comments: [],
        },
      ],
      [
        {
          id: 'trip-1',
          packageId: 'CBET-001',
          packageName: 'Prek Toal Bird Sanctuary',
          facultyName: 'Dr. Sarah Jenning',
          department: 'Environmental Science',
          requestorContact: 's.jenning@ecolink.edu',
          date: '2026-05-12',
          groupSize: 20,
          purpose: 'Field methods',
          status: ProjectStatus.APPROVED,
          quoteRequestId: 'quote-1',
          tripPlanId: 'plan-1',
        },
      ]
    );

    expect(records).toHaveLength(1);
    expect(records[0].isTripLinked).toBe(true);
    expect(records[0].status).toBe('Approved');
    expect(records[0].trip?.id).toBe('trip-1');
  });
});

