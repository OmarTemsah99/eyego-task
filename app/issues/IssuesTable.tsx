"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store/store";
import {
  setIssues,
  setSort,
  setFilter,
  setPage,
  Issue,
} from "@/store/issuesSlice";
import StatusBadge from "./StatusBadge";
import Pagination from "./Pagination";

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
    <div>
      <div className="mb-4 flex items-center gap-4">
        <label>
          Filter:
          <select
            onChange={(e) => dispatch(setFilter(e.target.value as any))}
            value={filterStatus}
            className="ml-2 bg-gray-700 text-white p-1 rounded">
            <option value="ALL">All</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="CLOSED">Closed</option>
          </select>
        </label>
      </div>

      <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
        <thead className="bg-gray-800">
          <tr>
            {["id", "title", "status"].map((col) => (
              <th
                key={col}
                onClick={() => dispatch(setSort({ key: col as keyof Issue }))}
                className="cursor-pointer border border-gray-700 px-4 py-2 text-left text-gray-300">
                {col.toUpperCase()}{" "}
                {sortKey === col && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.map((issue) => (
            <tr key={issue.id} className="hover:bg-gray-700">
              <td className="border border-gray-700 px-4 py-2 text-gray-200">
                {issue.id}
              </td>
              <td className="border border-gray-700 px-4 py-2 text-gray-200">
                {issue.title}
              </td>
              <td className="border border-gray-700 px-4 py-2 text-gray-200">
                <StatusBadge status={issue.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        page={page}
        perPage={perPage}
        total={filtered.length}
        onPageChange={(newPage) => dispatch(setPage(newPage))}
      />
    </div>
  );
}
