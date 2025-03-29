import { useSelector } from "react-redux";
import {
  BarChart, Bar,
  LineChart, Line,
  AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend
} from "recharts";
import Loader from "./Loader";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Value: <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const ResultsDisplay = () => {
  const { results, loading, error } = useSelector((state) => state.queries);

  const chartTypes = ["bar", "line", "area", "pie"];
  const randomChart = chartTypes[Math.floor(Math.random() * chartTypes.length)];

  if (loading) return <div className="flex flex-row justify-center h-full items-center"><Loader /></div>;
  if (error) return <div className="text-red-500 text-center flex flex-row items-center justify-center">{error}</div>;
  if (!results) return <div className="text-gray-500 text-center flex flex-row justify-center h-full items-center">No results yet.</div>;

  return (
    <div className="p-4 md:p-6 w-full grid gap-4 text-center">
      <h2 className="text-lg font-bold m-3">Results ({randomChart} chart)</h2>

      <div className="grid place-items-center w-full h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {randomChart === "bar" && (
            <BarChart data={results}>
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="period" angle={-45} textAnchor="end" height={90} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          )}

          {randomChart === "line" && (
            <LineChart data={results}>
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="period" angle={-45} textAnchor="end" height={90} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          )}

          {randomChart === "area" && (
            <AreaChart data={results}>
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="period" angle={-45} textAnchor="end" height={90} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="value" stroke="#F59E0B" fill="#F59E0B40" />
            </AreaChart>
          )}

          {randomChart === "pie" && (
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Pie data={results} dataKey="value" nameKey="period" cx="50%" cy="50%" outerRadius={100} label>
                {results.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResultsDisplay;
