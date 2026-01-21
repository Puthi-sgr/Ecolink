import React from 'react';
import { Card } from '../../../shared/molecules/Card';
import { Button } from '../../../shared/atoms/Button';
import { StatusBadge } from '../../../shared/atoms/StatusBadge';
import { Project } from '../../../shared/types';

interface ProposalsTableProps {
  projects: Project[];
}

export const ProposalsTable: React.FC<ProposalsTableProps> = ({ projects }) => {
  return (
    <Card title="Research Proposals" className="overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
            <thead>
            <tr className="border-b border-border text-text-muted text-sm">
                <th className="py-3 px-4 font-medium">Title</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
            </thead>
            <tbody className="text-sm">
            {projects.map((project) => (
                <tr key={project.id} className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
                <td className="py-3 px-4 font-medium text-text">{project.title}</td>
                <td className="py-3 px-4 text-text-muted">{project.dateSubmitted}</td>
                <td className="py-3 px-4">
                    <StatusBadge status={project.status} />
                </td>
                <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm">View</Button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </Card>
  );
};