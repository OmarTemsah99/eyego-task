"use client";

import { Issue, setIssues, setPage } from "@/store/issuesSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import IssuesHeader from "./IssuesHeader";
import IssuesTableBody from "./IssuesTableBody";
import Pagination from "./Pagination";
import StatusBadge from "./StatusBadge";

export default function IssuesTable({
  initialIssues,
}: {
  initialIssues: Issue[];
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { issues, sortKey, sortOrder, filterStatus, page, perPage } =
    useSelector((state: RootState) => state.issue);

  useEffect(() => {
    const normalized = initialIssues.map((issue) => ({
      ...issue,
      createdAt: new Date(issue.createdAt).toISOString(),
      updatedAt: new Date(issue.updatedAt).toISOString(),
    }));
    dispatch(setIssues(normalized));
  }, [initialIssues, dispatch]);

  const filtered = issues.filter(
    (issue) => filterStatus === "ALL" || issue.status === filterStatus
  );
  const sorted = [...filtered].sort((a, b) => {
    const dir = sortOrder === "asc" ? 1 : -1;
    return a[sortKey] > b[sortKey] ? dir : -dir;
  });
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      <IssuesHeader
        filterStatus={filterStatus}
        filteredCount={filtered.length}
      />
      <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full hidden sm:table">
            <IssuesTableBody
              issues={paginated}
              sortKey={sortKey}
              sortOrder={sortOrder}
            />
          </table>
        </div>
      </div>

      <div className="sm:hidden space-y-4">
        {paginated.map((issue) => (
          <div
            key={issue.id}
            className="bg-slate-800 p-4 rounded-xl shadow border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">#{issue.id}</div>
            <div className="text-slate-200 font-semibold mb-1">
              {issue.title}
            </div>
            <StatusBadge status={issue.status} />
          </div>
        ))}
      </div>

      {filtered.length > perPage && (
        <Pagination
          page={page}
          perPage={perPage}
          total={filtered.length}
          onPageChange={(newPage) => dispatch(setPage(newPage))}
        />
      )}
    </div>
  );
}
