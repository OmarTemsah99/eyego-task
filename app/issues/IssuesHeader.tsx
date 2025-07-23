"use client";

import { setFilter } from "@/store/issuesSlice";
import { ClipboardList } from "lucide-react";
import { useDispatch } from "react-redux";
import StatusFilterDropdown from "../components/StatusFilterDropdown";

interface Props {
  filterStatus: "ALL" | "OPEN" | "IN_PROGRESS" | "CLOSED";
  filteredCount: number;
}

export default function IssuesHeader({ filterStatus, filteredCount }: Props) {
  const dispatch = useDispatch();

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 shadow-2xl border border-slate-600">
      <h1 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <ClipboardList className="w-5 h-5 text-white" />
        </div>
        Issues Dashboard
      </h1>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-300">
            Filter by Status:
          </label>
          <StatusFilterDropdown
            value={filterStatus}
            onChange={(val) =>
              dispatch(
                setFilter(val as "ALL" | "OPEN" | "IN_PROGRESS" | "CLOSED")
              )
            }
          />
        </div>

        <div className="text-sm text-slate-400 bg-slate-700/50 px-3 py-1.5 rounded-full w-full sm:w-auto text-center">
          {filteredCount} issue{filteredCount !== 1 ? "s" : ""} found
        </div>
      </div>
    </div>
  );
}
