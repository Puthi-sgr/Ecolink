import { Project, ProjectStatus } from '../../../shared/types';

export const FACULTY_PROJECTS: Project[] = [
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
    id: 'P-103',
    title: 'Native Bee Population Survey',
    description: 'Annual survey of native bee populations in the botanical gardens.',
    author: 'Dr. Sarah Jenning',
    dateSubmitted: '2024-02-15',
    status: ProjectStatus.COMPLETED,
    category: 'Biology'
  }
];

export const useFacultyProjects = () => {
  return FACULTY_PROJECTS;
};