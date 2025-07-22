// Types for Dashboard and Issues
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
