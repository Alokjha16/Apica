import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const generateInitialData = () => {
  let price = 42000; // starting price
  return Array.from({ length: 20 }, (_, i) => {
    price += Math.random() * 200 - 100; // random fluctuation
    return {
      time: i,
      price: Math.round(price),
    };
  });
};

const ShareMarketChart = () => {
  const [data, setData] = useState(generateInitialData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const lastPrice = prev[prev.length - 1].price;
        const newPrice = Math.round(
          lastPrice + (Math.random() * 300 - 150)
        );

        const newData = [
          ...prev.slice(1),
          { time: prev.length, price: newPrice },
        ];

        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const latestPrice = data[data.length - 1]?.price;
  const previousPrice = data[data.length - 2]?.price;
  const isUp = latestPrice >= previousPrice;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-gray-600 text-sm">
            Bank Share Market (Live)
          </h3>
          <p
            className={`text-xl font-bold ${
              isUp ? "text-green-500" : "text-red-500"
            }`}
          >
            ₹{latestPrice?.toLocaleString()}
          </p>
        </div>
        <span
          className={`text-sm font-medium ${
            isUp ? "text-green-500" : "text-red-500"
          }`}
        >
          {isUp ? "▲ Up" : "▼ Down"}
        </span>
      </div>

      <div className="h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px]">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis hide />
            <YAxis hide domain={["auto", "auto"]} />
            <Tooltip
              formatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={isUp ? "#10B981" : "#EF4444"}
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ShareMarketChart;
