import { prisma } from "@/prisma/client";
import DashboardClient from "./DashboardClient";

// Types
export type IssueWithStringDates = {
  id: number;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  createdAt: string;
  updatedAt: string;
  description?: string;
  assignedToUserId?: string | null;
};

export type DashboardData = {
  issues: IssueWithStringDates[];
  stats: {
    total: number;
    open: number;
    inProgress: number;
    closed: number;
  };
};

// Main Dashboard Server Component
export default async function Dashboard() {
  try {
    // Fetch issues from database
    const issuesFromDb = await prisma.issue.findMany({
      orderBy: { createdAt: "desc" },
      take: 50, // Limit for performance
    });

    // Transform data
    const issues: IssueWithStringDates[] = issuesFromDb.map((issue) => ({
      id: issue.id,
      title: issue.title,
      status: issue.status,
      createdAt: issue.createdAt.toISOString(),
      updatedAt: issue.updatedAt.toISOString(),
      description: issue.description,
      assignedToUserId: issue.assignedToUserId,
    }));

    // Calculate stats
    const stats = {
      total: issues.length,
      open: issues.filter((issue) => issue.status === "OPEN").length,
      inProgress: issues.filter((issue) => issue.status === "IN_PROGRESS")
        .length,
      closed: issues.filter((issue) => issue.status === "CLOSED").length,
    };

    const dashboardData: DashboardData = {
      issues,
      stats,
    };

    return <DashboardClient data={dashboardData} />;
  } catch (error) {
    console.error("Error loading dashboard:", error);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-400 mb-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">
              Error Loading Dashboard
            </h2>
            <p className="text-slate-400">
              There was an error loading the dashboard data. Please try again
              later.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
