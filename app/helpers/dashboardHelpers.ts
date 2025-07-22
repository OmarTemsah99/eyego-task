import { IssueWithStringDates } from "../dashboardTypes";

export type StatusCount = {
  status: string;
  count: number;
  color: string;
};

export type MonthlyChartData = {
  month: string;
  open: number;
  inProgress: number;
  closed: number;
};

/**
 * Returns an array of status counts for issues.
 */
export const getStatusCounts = (
  issues: IssueWithStringDates[]
): StatusCount[] => {
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

/**
 * Returns monthly chart data for issues (last 6 months).
 */
export const getMonthlyData = (
  issues: IssueWithStringDates[]
): MonthlyChartData[] => {
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

/**
 * Formats a date string for display.
 */
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
