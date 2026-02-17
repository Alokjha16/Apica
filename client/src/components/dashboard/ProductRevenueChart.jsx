import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#8B5CF6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
  "#EC4899",
];

const ProductRevenueChart = ({ products }) => {
  // 🔥 Sort by revenue (highest first)
  const sortedProducts = [...(products || [])].sort(
    (a, b) => b.revenueGenerated - a.revenueGenerated
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-gray-600 text-sm mb-4">
        Product Revenue Overview (Yearly)
      </h3>

      <div className="h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px]">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedProducts}
            layout="vertical"
            margin={{ left: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />

            {/* Revenue Axis */}
            <XAxis
              type="number"
              tickFormatter={(value) =>
                `₹${(value / 1000).toFixed(0)}K`
              }
            />

            {/* 🔥 Product Names Only */}
          <YAxis
  dataKey="name"
  type="category"
  width={window.innerWidth < 640 ? 90 : 160}
/>


            <Tooltip
              formatter={(value) => `₹${value.toLocaleString()}`}
            />

            <Bar
              dataKey="revenueGenerated"
              radius={[0, 12, 12, 0]}
            >
              {sortedProducts.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductRevenueChart;
