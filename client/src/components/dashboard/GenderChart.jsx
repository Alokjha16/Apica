import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3B82F6", "#EC4899", "#10B981"]; 
// blue, pink, emerald (clean SaaS colors)

const GenderChart = ({ genderStats }) => {
  const data = [
    { name: "Male", value: genderStats?.male || 0 },
    { name: "Female", value: genderStats?.female || 0 },
    { name: "Other", value: genderStats?.other || 0 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-gray-600 text-sm mb-4">Customer Gender Distribution</h3>

      <div className="h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
          Male
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
          Female
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
          Other
        </div>
      </div>
    </div>
  );
};

export default GenderChart;
