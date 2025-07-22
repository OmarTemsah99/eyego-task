import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { StatusCount } from "../../helpers/dashboardHelpers";

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
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #475569",
            borderRadius: "8px",
            color: "#f1f5f9",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default StatusPieChart;
