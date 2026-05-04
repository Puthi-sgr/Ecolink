import { beforeEach, describe, expect, it } from 'vitest';
import {
  buildHashRoute,
  buildPlannerWorkspaceRoute,
  parseHashRoute,
  parsePlannerWorkspaceQuery,
  replaceHashQuery,
  replacePlannerWorkspaceQuery,
} from './hashRoute';
import { matchRoute } from '../../app/AppRouter';

describe('hashRoute helpers', () => {
  beforeEach(() => {
    window.location.hash = '#/';
  });

  it('parses path and query from the hash route', () => {
    const parsed = parseHashRoute('#/planner?request=quote-1&view=brief');

    expect(parsed.path).toBe('/planner');
    expect(parsed.query.get('request')).toBe('quote-1');
    expect(parsed.query.get('view')).toBe('brief');
  });

  it('builds a hash route with query params', () => {
    expect(buildHashRoute('/package/CBET-001/overview', { request: 'quote-1', print: 'brief' })).toBe(
      '#/package/CBET-001/overview?request=quote-1&print=brief'
    );
  });

  it('replaces hash query state while keeping the same path', () => {
    window.location.hash = '#/planner?request=quote-1';
    replaceHashQuery('/planner', { request: 'quote-2', view: 'timeline' }, { preserveExisting: true });

    expect(window.location.hash).toBe('#/planner?request=quote-2&view=timeline');
  });

  it('keeps route matching independent from query state', () => {
    const parsed = parseHashRoute('#/package/CBET-001/overview?request=quote-1');
    expect(matchRoute('/package/:packageId/:tab?', parsed.path)).toEqual({
      packageId: 'CBET-001',
      tab: 'overview',
    });
  });

  it('parses planner workspace details from the hash query', () => {
    const query = parsePlannerWorkspaceQuery(
      parseHashRoute('#/planner?request=quote-1&view=documents&document=approval-pack&audience=admin&print=1')
    );

    expect(query).toEqual({
      request: 'quote-1',
      view: 'documents',
      document: 'approval-pack',
      audience: 'admin',
      print: '1',
    });
  });

  it('builds a planner workspace route with request, document, and audience state', () => {
    expect(
      buildPlannerWorkspaceRoute({
        request: 'quote-1',
        plan: 'plan-1',
        view: 'documents',
        document: 'approval-pack',
        audience: 'admin',
      })
    ).toBe('#/planner?plan=plan-1&request=quote-1&view=documents&document=approval-pack&audience=admin');
  });

  it('replaces planner workspace query state while preserving the planner path', () => {
    window.location.hash = '#/planner?request=quote-1&view=timeline';
    replacePlannerWorkspaceQuery({
      request: 'quote-1',
      view: 'documents',
      document: 'brief',
      audience: 'faculty',
    });

    expect(window.location.hash).toBe('#/planner?request=quote-1&view=documents&document=brief&audience=faculty');
  });
});
