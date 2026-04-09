import { DocumentAudience, DocumentViewMode, WorkflowWorkspaceView } from '../types';

export interface ParsedHashRoute {
  path: string;
  query: URLSearchParams;
}

export interface PlannerWorkspaceQuery {
  plan?: string;
  request?: string;
  view?: WorkflowWorkspaceView;
  document?: DocumentViewMode;
  audience?: DocumentAudience;
  print?: string;
}

const WORKSPACE_VIEWS = new Set<WorkflowWorkspaceView>([
  'brief',
  'timeline',
  'documents',
  'notes',
  'history',
]);
const DOCUMENT_MODES = new Set<DocumentViewMode>(['brief', 'itinerary', 'approval-pack']);
const DOCUMENT_AUDIENCES = new Set<DocumentAudience>(['requester', 'faculty', 'admin']);

export const parseHashRoute = (hash = typeof window !== 'undefined' ? window.location.hash : '#/'): ParsedHashRoute => {
  const rawHash = hash.startsWith('#') ? hash.slice(1) : hash;
  const [pathPart = '/', queryString = ''] = rawHash.split('?');
  return {
    path: pathPart || '/',
    query: new URLSearchParams(queryString),
  };
};

export const getCurrentHashPath = () => parseHashRoute().path;

export const getCurrentHashQuery = () => parseHashRoute().query;

export const buildHashRoute = (path: string, query?: URLSearchParams | Record<string, string | undefined>) => {
  const params = query instanceof URLSearchParams ? new URLSearchParams(query) : new URLSearchParams();

  if (!(query instanceof URLSearchParams) && query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
  }

  const queryString = params.toString();
  return `#${path}${queryString ? `?${queryString}` : ''}`;
};

export const replaceHashQuery = (
  path: string,
  updates: Record<string, string | undefined>,
  options?: { preserveExisting?: boolean }
) => {
  if (typeof window === 'undefined') return;

  const existing = options?.preserveExisting ? getCurrentHashQuery() : new URLSearchParams();
  const next = new URLSearchParams(existing);

  Object.entries(updates).forEach(([key, value]) => {
    if (value && value.length) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
  });

  window.history.replaceState(null, '', buildHashRoute(path, next));
};

export const setHashPath = (path: string, query?: Record<string, string | undefined>) => {
  if (typeof window === 'undefined') return;
  window.location.hash = buildHashRoute(path, query);
};

export const parsePlannerWorkspaceQuery = (
  route = parseHashRoute()
): PlannerWorkspaceQuery => {
  const { path, query } = route;
  if (path !== '/planner') return {};

  const view = query.get('view');
  const document = query.get('document');
  const audience = query.get('audience');

  return {
    plan: query.get('plan') || undefined,
    request: query.get('request') || undefined,
    view: view && WORKSPACE_VIEWS.has(view as WorkflowWorkspaceView) ? (view as WorkflowWorkspaceView) : undefined,
    document:
      document && DOCUMENT_MODES.has(document as DocumentViewMode)
        ? (document as DocumentViewMode)
        : undefined,
    audience:
      audience && DOCUMENT_AUDIENCES.has(audience as DocumentAudience)
        ? (audience as DocumentAudience)
        : undefined,
    print: query.get('print') || undefined,
  };
};

export const replacePlannerWorkspaceQuery = (
  updates: PlannerWorkspaceQuery,
  options?: { preserveExisting?: boolean }
) => {
  replaceHashQuery(
    '/planner',
    {
      plan: updates.plan,
      request: updates.request,
      view: updates.view,
      document: updates.document,
      audience: updates.audience,
      print: updates.print,
    },
    options
  );
};

export const buildPlannerWorkspaceRoute = (updates: PlannerWorkspaceQuery) =>
  buildHashRoute('/planner', {
    plan: updates.plan,
    request: updates.request,
    view: updates.view,
    document: updates.document,
    audience: updates.audience,
    print: updates.print,
  });

export const readHashParam = (path: string, key: string) => {
  const { path: currentPath, query } = parseHashRoute();
  if (currentPath !== path) return '';
  return query.get(key) || '';
};
