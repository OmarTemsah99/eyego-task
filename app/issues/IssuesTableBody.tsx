"use client";

import { Issue, setSort } from "@/store/issuesSlice";
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  ClipboardList,
} from "lucide-react";
import { useDispatch } from "react-redux";
import StatusBadge from "./StatusBadge";

interface Props {
  issues: Issue[];
  sortKey: keyof Issue;
  sortOrder: "asc" | "desc";
}

export default function IssuesTableBody({ issues, sortKey, sortOrder }: Props) {
  const dispatch = useDispatch();

  const columns = [
    { key: "id", label: "ID", width: "w-24" },
    { key: "title", label: "Title", width: "flex-1" },
    { key: "status", label: "Status", width: "w-36" },
  ] as const;

  if (issues.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
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
      </tbody>
    );
  }

  return (
    <>
      <thead>
        <tr className="bg-gradient-to-r from-slate-700 to-slate-600 border-b border-slate-600">
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => dispatch(setSort({ key: col.key }))}
              className={`${col.width} cursor-pointer px-6 py-4 text-left font-semibold text-slate-200 
                         hover:bg-slate-600 transition-colors duration-200 select-none`}>
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
        {issues.map((issue, index) => (
          <tr
            key={issue.id}
            className={`hover:bg-slate-700/50 transition-colors duration-200 group
                       ${
                         index % 2 === 0 ? "bg-slate-800" : "bg-slate-800/50"
                       }`}>
            <td className="px-6 py-4">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-700 text-slate-300 text-sm font-medium rounded-full group-hover:bg-slate-600">
                #{issue.id}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="text-slate-200 font-medium group-hover:text-white">
                {issue.title}
              </div>
            </td>
            <td className="px-6 py-4">
              <StatusBadge status={issue.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
}
