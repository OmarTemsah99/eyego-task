import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MonthlyChartData } from "../../helpers/dashboardHelpers";

const MonthlyBarChart = ({ data }: { data: MonthlyChartData[] }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
    <h3 className="text-lg font-semibold text-slate-100 mb-6">
      Issues Over Time
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis dataKey="month" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #475569",
            borderRadius: "8px",
            color: "#f1f5f9",
          }}
        />
        {/* Colors match StatusBadge: open=red-400, inProgress=yellow-400, closed=green-400 */}
        <Bar dataKey="open" stackId="a" fill="#f87171" name="Open" />
        <Bar
          dataKey="inProgress"
          stackId="a"
          fill="#facc15"
          name="In Progress"
        />
        <Bar dataKey="closed" stackId="a" fill="#34d399" name="Closed" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default MonthlyBarChart;
