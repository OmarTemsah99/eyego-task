import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { StatusCount } from "../../helpers/dashboardHelpers";
import type { Issue } from "@/store/issuesSlice";

import type { TooltipProps } from "recharts";

type StatusTooltipPayload = {
  status: Issue["status"];
  count: number;
  color: string;
};

const CustomTooltip = (props: TooltipProps<number, string>) => {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    const { status, count, color } = payload[0].payload as StatusTooltipPayload;
    return (
      <div
        className="p-3 rounded-lg border border-slate-600 bg-slate-700 shadow-md text-slate-100"
        style={{ minWidth: "160px" }}>
        <div className="flex items-center gap-2 mb-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="font-medium">{status}</span>
        </div>
        <div className="text-sm">
          <strong>Count:</strong> {count}
        </div>
      </div>
    );
  }
  return null;
};

const StatusPieChart = ({ data }: { data: StatusCount[] }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
    <h3 className="text-lg font-semibold text-slate-100 mb-6">
      Issues by Status
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="count"
          label={({ status, count }) => `${status}: ${count}`}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={CustomTooltip} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default StatusPieChart;
