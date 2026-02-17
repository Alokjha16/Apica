import { MoreHorizontal } from "lucide-react";

// 🔥 Number Formatter (K, M, B)
const formatNumber = (num) => {
  if (!num) return 0;

  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(0) + "K";

  return num;
};

const StatCards = ({ analytics }) => {
  const cards = [
  {
    title: "Total Customers",
    value: formatNumber(analytics?.totalCustomers),
    growth: 18,   // 🔥 change manually here
    prefix: "",
    color: "blue",
  },
  {
    title: "Total Recommendations",
    value: formatNumber(analytics?.totalRecommendations),
    growth: 12,   // 🔥 change manually here
    prefix: "",
    color: "teal",
  },
  {
    title: "Revenue Generated",
    value: formatNumber(analytics?.revenueGenerated),
    growth: 22,   // 🔥 change manually here
    prefix: "₹",
    color: "orange",
  },
];


  const colorMap = {
  blue: {
    text: "text-white",
    bg: "bg-blue-600",
  },
  teal: {
    text: "text-white",
    bg: "bg-teal-600",
  },
  orange: {
    text: "text-white",
    bg: "bg-orange-500",
  },
  
};



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const theme = colorMap[card.color];

        return (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 text-sm">{card.title}</h3>
              <MoreHorizontal size={18} className="text-gray-400" />
            </div>

            {/* Value + Circle */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {card.prefix}
                  {card.value}
                </h2>
               <p className="text-xs mt-1 text-green-500">
  +{card.growth}% increase
</p>

              </div>

              {/* Fully Colored Circle */}
           <div
  className={`w-16 h-16 rounded-full flex items-center justify-center ${theme.bg}`}
>
<span className="text-white text-sm font-semibold">
  +{card.growth}%
</span>

</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatCards;
