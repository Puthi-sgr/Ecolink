import {
  buildPlannerWorkspaceRoute,
  replacePlannerWorkspaceQuery,
  setHashPath,
} from '../utils/hashRoute';
import { DocumentAudience, DocumentViewMode, WorkflowWorkspaceView } from '../types';

interface PlannerRouteInput {
  plan?: string;
  request?: string;
  view?: WorkflowWorkspaceView;
  document?: DocumentViewMode;
  audience?: DocumentAudience;
  print?: '1';
}

export const plannerRouteService = {
  buildWorkspaceRoute(input: PlannerRouteInput) {
    return buildPlannerWorkspaceRoute(input);
  },

  openWorkspace(input: PlannerRouteInput) {
    setHashPath('/planner', {
      plan: input.plan,
      request: input.request,
      view: input.view,
      document: input.document,
      audience: input.audience,
      print: input.print,
    });
  },

  replaceWorkspace(input: PlannerRouteInput) {
    replacePlannerWorkspaceQuery(input);
  },
};

