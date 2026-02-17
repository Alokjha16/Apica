import { useEffect, useState } from "react";
import StatCards from "../components/dashboard/StatsCards";
import GenderChart from "../components/dashboard/GenderChart";
import MonthlySalesChart from "../components/dashboard/MonthlySalesChart";
import ProductRevenueChart from "../components/dashboard/ProductRevenueChart";
import ShareMarketChart from "../components/dashboard/ShareMarketChart";


const DashboardPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/bank-analytics/info@thakurbankfinance.com`
    )
      .then((res) => res.json())
      .then((data) => setAnalytics(data))
      .catch((err) => console.error(err));

    // 🔥 Fetch products
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      <StatCards analytics={analytics} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <MonthlySalesChart monthlySales={analytics?.monthlySales} />
        </div>

        <div className="xl:col-span-1">
          <GenderChart genderStats={analytics?.genderStats} />
        </div>
      </div>

      {/* 🔥 Product Revenue Chart BELOW */}
{/* 🔥 Bottom Row */}
{/* 🔥 Bottom Row */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">


  {/* Share Market */}
  <div className="lg:col-span-1 xl:col-span-1">
    <ShareMarketChart />
  </div>

  {/* Product Revenue */}
  <div className="lg:col-span-1 xl:col-span-2">
    <ProductRevenueChart products={products} />
  </div>

</div>





    </div>
  );
};

export default DashboardPage;
