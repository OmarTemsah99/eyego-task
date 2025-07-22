"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ClipboardList, TrendingUp, Clock, CheckCircle } from "lucide-react";
import StatusBadge from "./issues/StatusBadge";
import Link from "next/link";
import { IssueWithStringDates, DashboardData } from "./dashboardTypes";

// Types
type StatusCount = {
  status: string;
  count: number;
  color: string;
};

type MonthlyChartData = {
  month: string;
  open: number;
  inProgress: number;
  closed: number;
};

// Helper functions
const getStatusCounts = (issues: IssueWithStringDates[]): StatusCount[] => {
  const counts = issues.reduce((acc, issue) => {
    acc[issue.status] = (acc[issue.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return [
    { status: "Open", count: counts.OPEN || 0, color: "#ef4444" },
    { status: "In Progress", count: counts.IN_PROGRESS || 0, color: "#f59e0b" },
    { status: "Closed", count: counts.CLOSED || 0, color: "#10b981" },
  ];
};

const getMonthlyData = (issues: IssueWithStringDates[]): MonthlyChartData[] => {
  const monthlyData = issues.reduce((acc, issue) => {
    const month = new Date(issue.createdAt).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    if (!acc[month]) {
      acc[month] = { month, open: 0, inProgress: 0, closed: 0 };
    }

    if (issue.status === "OPEN") acc[month].open++;
    else if (issue.status === "IN_PROGRESS") acc[month].inProgress++;
    else if (issue.status === "CLOSED") acc[month].closed++;

    return acc;
  }, {} as Record<string, MonthlyChartData>);

  return Object.values(monthlyData).slice(-6); // Last 6 months
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Stats Card Component
import { LucideIcon } from "lucide-react";
const StatsCard = ({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
}: {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-slate-100 mt-2">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${bgColor}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  </div>
);

// Chart Components
const StatusPieChart = ({ data }: { data: StatusCount[] }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
    <h3 className="text-lg font-semibold text-slate-100 mb-6">
      Issues by Status
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="count"
          label={({ status, count }) => `${status}: ${count}`}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #475569",
            borderRadius: "8px",
            color: "#f1f5f9",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const MonthlyBarChart = ({ data }: { data: MonthlyChartData[] }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
    <h3 className="text-lg font-semibold text-slate-100 mb-6">
      Issues Over Time
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis dataKey="month" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #475569",
            borderRadius: "8px",
            color: "#f1f5f9",
          }}
        />
        <Bar dataKey="open" stackId="a" fill="#ef4444" name="Open" />
        <Bar
          dataKey="inProgress"
          stackId="a"
          fill="#f59e0b"
          name="In Progress"
        />
        <Bar dataKey="closed" stackId="a" fill="#10b981" name="Closed" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// Recent Issues Component
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

// Main Dashboard Client Component
export default function DashboardClient({ data }: { data: DashboardData }) {
  const { issues, stats } = data;

  // Prepare chart data
  const statusCounts = getStatusCounts(issues);
  const monthlyData = getMonthlyData(issues);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-100 mb-2">
              Dashboard
            </h1>
            <p className="text-slate-400">
              Overview of your issue tracking system
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Issues"
              value={stats.total}
              icon={ClipboardList}
              color="text-blue-400"
              bgColor="bg-blue-500/20"
            />
            <StatsCard
              title="Open Issues"
              value={stats.open}
              icon={TrendingUp}
              color="text-red-400"
              bgColor="bg-red-500/20"
            />
            <StatsCard
              title="In Progress"
              value={stats.inProgress}
              icon={Clock}
              color="text-yellow-400"
              bgColor="bg-yellow-500/20"
            />
            <StatsCard
              title="Closed Issues"
              value={stats.closed}
              icon={CheckCircle}
              color="text-green-400"
              bgColor="bg-green-500/20"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatusPieChart data={statusCounts} />
            <MonthlyBarChart data={monthlyData} />
          </div>

          {/* Recent Issues */}
          <RecentIssues issues={issues} />
        </div>
      </div>
    </div>
  );
}
