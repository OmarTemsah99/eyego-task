import { ClipboardList } from "lucide-react";
import Link from "next/link";

import StatusBadge from "@/app/issues/StatusBadge";
import { IssueWithStringDates } from "../../dashboardTypes";
import { formatDate } from "../../helpers/dashboardHelpers";

const RecentIssues = ({ issues }: { issues: IssueWithStringDates[] }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-slate-100">Recent Issues</h3>
      <Link
        href="/issues"
        className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
        View All
      </Link>
    </div>
    {issues.length === 0 ? (
      <div className="text-center py-8">
        <ClipboardList className="w-12 h-12 text-slate-500 mx-auto mb-3" />
        <p className="text-slate-400">No issues found</p>
      </div>
    ) : (
      <div className="space-y-4">
        {issues.slice(0, 5).map((issue) => (
          <div
            key={issue.id}
            className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:bg-slate-700 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-slate-400 text-sm font-mono">
                  #{issue.id}
                </span>
                <StatusBadge status={issue.status} />
              </div>
              <h4 className="text-slate-100 font-medium truncate">
                {issue.title}
              </h4>
              <p className="text-slate-400 text-sm mt-1">
                Created {formatDate(issue.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default RecentIssues;
