import React from "react";
import { UserPlus, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Part1Controls from "../components/AIEngine/Part1Controls";
import Part2Insights from "../components/AIEngine/Part2Insights";
import PartZero from "../components/AIEngine/PartZero";


const AIEnginePage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">AI Engine Dashboard{" "}</h1>
      <Link to="/dashboard/user" className="w-full sm:w-auto">
        <button className="  flex items-center gap-2 px-4 py-2  cursor-pointer bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base w-full justify-center">
          <Eye size={18} />
         View More 
        </button>
      </Link>
            </div>
      {/* Part 1 Controls */}
      <PartZero />
      <Part1Controls />
      {/* Part 1 Cards will go here later */}
      <Part2Insights />
    </div>
  );
};

export default AIEnginePage;
