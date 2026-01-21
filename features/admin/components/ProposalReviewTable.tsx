import React from 'react';
import { Card } from '../../../shared/molecules/Card';
import { Button } from '../../../shared/atoms/Button';
import { StatusBadge } from '../../../shared/atoms/StatusBadge';
import { Project, ProjectStatus } from '../../../shared/types';

interface ProposalReviewTableProps {
  projects: Project[];
}

export const ProposalReviewTable: React.FC<ProposalReviewTableProps> = ({ projects }) => {
  const pendingProjects = projects.filter(p => p.status === ProjectStatus.PENDING);

  return (
    <Card title="Pending Research Proposals" actions={<Button size="sm" variant="outline">View All</Button>}>
        <div className="overflow-x-auto">
        <table className="w-full text-left">
            <thead className="text-xs text-text-muted uppercase tracking-wider font-semibold border-b border-border">
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
            {pendingProjects.length === 0 && (
                <tr><td colSpan={3} className="py-4 text-center text-text-muted italic">No pending items.</td></tr>
            )}
            </tbody>
        </table>
        </div>
    </Card>
  );
};