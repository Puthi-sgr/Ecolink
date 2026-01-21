import { Project, ProjectStatus } from '../../../shared/types';

export const ADMIN_PROJECTS: Project[] = [
  {
    id: 'P-101',
    title: 'Urban Wetland Restoration Analysis',
    description: 'Analyzing the impact of urban runoff on local wetland ecosystems.',
    author: 'Dr. Sarah Jenning',
    dateSubmitted: '2024-05-12',
    status: ProjectStatus.APPROVED,
    category: 'Ecology'
  },
  {
    id: 'P-102',
    title: 'Solar Micro-Grid Feasibility',
    description: 'A study on implementing micro-grids in rural campus outposts.',
    author: 'Dr. Sarah Jenning',
    dateSubmitted: '2024-06-01',
    status: ProjectStatus.PENDING,
    category: 'Energy'
  },
  {
    id: 'P-204',
    title: 'Campus Waste Reduction Initiative',
    description: 'Proposed changes to cafeteria waste management.',
    author: 'Prof. Mark Davidson',
    dateSubmitted: '2024-06-03',
    status: ProjectStatus.PENDING,
    category: 'Sustainability'
  },
   {
    id: 'P-205',
    title: 'Algae Bio-Fuel Prototype',
    description: 'Lab scale prototype for creating fuel from pond algae.',
    author: 'Dr. Emily Chen',
    dateSubmitted: '2024-05-28',
    status: ProjectStatus.LOCKED,
    category: 'Biotech'
  }
];

export const useAdminProjects = () => {
  return ADMIN_PROJECTS;
};