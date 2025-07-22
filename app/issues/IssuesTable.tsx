"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ClipboardList,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";

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
import StatusFilterDropdown from "../components/StatusFilterDropdown";

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
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 shadow-2xl border border-slate-600">
        <h1 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-white" />
          </div>
          Issues Dashboard
        </h1>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-300">
              Filter by Status:
            </label>
            <StatusFilterDropdown
              value={filterStatus}
              onChange={(val) => dispatch(setFilter(val as any))}
            />
          </div>

          <div className="text-sm text-slate-400 bg-slate-700/50 px-3 py-1.5 rounded-full">
            {filtered.length} issue{filtered.length !== 1 ? "s" : ""} found
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-700 to-slate-600 border-b border-slate-600">
                {[
                  { key: "id", label: "ID", width: "w-24" },
                  { key: "title", label: "Title", width: "flex-1" },
                  { key: "status", label: "Status", width: "w-36" },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() =>
                      dispatch(setSort({ key: col.key as keyof Issue }))
                    }
                    className={`${col.width} cursor-pointer px-6 py-4 text-left font-semibold text-slate-200 
                               hover:bg-slate-600 transition-colors duration-200 select-none
                               first:rounded-tl-xl last:rounded-tr-xl`}>
                    <div className="flex items-center gap-2">
                      {col.label}
                      <div className="flex flex-col">
                        {sortKey === col.key ? (
                          sortOrder === "asc" ? (
                            <ChevronUp className="w-4 h-4 text-blue-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-blue-400" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-3">
                      <ClipboardList className="w-12 h-12 text-slate-500" />
                      <div>
                        <div className="text-lg font-medium text-slate-300">
                          No issues found
                        </div>
                        <div className="text-sm">
                          Try adjusting your filter criteria
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((issue, index) => (
                  <tr
                    key={issue.id}
                    className={`hover:bg-slate-700/50 transition-colors duration-200 group
                               ${
                                 index % 2 === 0
                                   ? "bg-slate-800"
                                   : "bg-slate-800/50"
                               }`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span
                          className="inline-flex items-center justify-center w-8 h-8 
                                       bg-slate-700 text-slate-300 text-sm font-medium rounded-full 
                                       group-hover:bg-slate-600 transition-colors duration-200">
                          #{issue.id}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-200 font-medium group-hover:text-white transition-colors duration-200">
                        {issue.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={issue.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
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
