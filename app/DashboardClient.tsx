"use client";

import { CheckCircle, ClipboardList, Clock, TrendingUp } from "lucide-react";
import { DashboardData } from "./dashboardTypes";
import { getMonthlyData, getStatusCounts } from "./helpers/dashboardHelpers";

import MonthlyBarChart from "./components/dashboard/MonthlyBarChart";
import RecentIssues from "./components/dashboard/RecentIssues";
import StatsCard from "./components/dashboard/StatsCard";
import StatusPieChart from "./components/dashboard/StatusPieChart";

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
