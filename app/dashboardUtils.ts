import { IssueWithStringDates } from "./dashboardTypes";

export function calculateStats(issues: IssueWithStringDates[]) {
  return {
    total: issues.length,
    open: issues.filter((issue) => issue.status === "OPEN").length,
    inProgress: issues.filter((issue) => issue.status === "IN_PROGRESS").length,
    closed: issues.filter((issue) => issue.status === "CLOSED").length,
  };
}
