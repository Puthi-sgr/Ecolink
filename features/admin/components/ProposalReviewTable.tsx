import React from 'react';
import { Button } from '../../../shared/atoms/Button';
import { StatusBadge } from '../../../shared/atoms/StatusBadge';
import { Project, ProjectStatus } from '../../../shared/types';
import { DataTableCard } from '../../../shared/ui/DataTableCard';

interface ProposalReviewTableProps {
  projects: Project[];
}

export const ProposalReviewTable: React.FC<ProposalReviewTableProps> = ({ projects }) => {
  const pendingProjects = projects.filter((project) => project.status === ProjectStatus.PENDING);

  return (
    <DataTableCard
      title="Pending Research Proposals"
      actions={<Button size="sm" variant="outline">View All</Button>}
      description="Admin review picks up proposal work that still needs operational attention."
      isEmpty={!pendingProjects.length}
      emptyTitle="No pending proposal items"
      emptyDescription="When proposals need review, they will appear here."
    >
      <table className="w-full text-left">
        <thead className="border-b border-border text-xs font-semibold uppercase tracking-wider text-text-muted">
          <tr>
            <th className="pb-3 pl-2">Project</th>
            <th className="pb-3">Author</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-border">
          {pendingProjects.map((project) => (
            <tr key={project.id}>
              <td className="py-3 pl-2 font-medium text-text">{project.title}</td>
              <td className="py-3 text-text-muted">{project.author}</td>
              <td className="py-3"><StatusBadge status={project.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </DataTableCard>
  );
};
