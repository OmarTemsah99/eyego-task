import React from "react";

export type Status = "OPEN" | "IN_PROGRESS" | "CLOSED";

const statusStyles: Record<Status, string> = {
  OPEN: "bg-red-500/20 text-red-300 border border-red-500/30 shadow-red-500/10 rounded-lg px-3 py-1 font-semibold",
  IN_PROGRESS:
    "bg-violet-500/20 text-violet-300 border border-violet-500/30 shadow-violet-500/10 rounded-lg px-3 py-1 font-semibold",
  CLOSED:
    "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-emerald-500/10 rounded-lg px-3 py-1 font-semibold",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`text-xs ${statusStyles[status]} transition-all duration-200`}
      style={{ letterSpacing: "0.5px" }}
      title={status}>
      {status.replace("_", " ")}
    </span>
  );
}
