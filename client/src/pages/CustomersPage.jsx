// client/src/pages/CustomersPage.jsx
import { useState, useEffect } from "react";
import { UserPlus, X } from "lucide-react";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 12;
  const productTypes = ["All", "Deposits", "Loans", "Credit Cards", "Insurance", "Investments"];

  // Popup state
  const [showCustomerPopup, setShowCustomerPopup] = useState(false);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [selectedCustomerData, setSelectedCustomerData] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/customer-recommendations`);
        if (selectedProductType !== "All") {
          url.searchParams.append("product_type", selectedProductType);
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [selectedProductType]);

  useEffect(() => {
    setFilteredCustomers(customers);
    setCurrentPage(1);
  }, [customers]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCustomers.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const statusColors = {
    Opened: "bg-blue-100 text-blue-800",
    Ignored: "bg-gray-100 text-gray-800",
    Converted: "bg-green-100 text-green-800",
  };

  if (loading) return <div className="p-6 text-center">Loading customers...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Customers</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          <UserPlus size={18} />
          Add customer dataset
        </button>
      </div>

      {/* Product Type Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {productTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedProductType(type)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              selectedProductType === type
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confidence Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.length > 0 ? (
              currentRows.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-50">
                  {/* Clickable customer name */}
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 cursor-pointer hover:underline focus:outline-none"
                    onClick={() => {
                      setSelectedCustomerName(customer.customer_name);
                      setSelectedCustomerData(customer);
                      setShowCustomerPopup(true);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && setShowCustomerPopup(true)}
                    tabIndex={0}
                    role="button"
                  >
                    {customer.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {customer.product_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {customer.confidence_score}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        statusColors[customer.status] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination (unchanged) */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="text-sm text-gray-700">
            Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredCustomers.length)} of{" "}
            {filteredCustomers.length} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            {(() => {
              const pageNumbers = [];
              const maxVisible = 5;
              const half = Math.floor(maxVisible / 2);
              let start = Math.max(1, currentPage - half);
              let end = Math.min(totalPages, start + maxVisible - 1);
              if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
              }
              if (start > 1) {
                pageNumbers.push(1);
                if (start > 2) pageNumbers.push('...');
              }
              for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
              }
              if (end < totalPages) {
                if (end < totalPages - 1) pageNumbers.push('...');
                pageNumbers.push(totalPages);
              }
              return pageNumbers.map((page, index) => {
                if (page === '...') {
                  return <span key={`ellipsis-${index}`} className="px-3 py-1 text-sm">...</span>;
                }
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      currentPage === page
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              });
            })()}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* --- Normal Popup (no background dimming) --- */}
      {showCustomerPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
          {/* The card itself is the only thing with pointer-events auto */}
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full relative pointer-events-auto">
            {/* Simple header without gradient */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <UserPlus size={20} className="text-indigo-500" />
                AI Customer Insight
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600 transition"
                onClick={() => setShowCustomerPopup(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-1">Recommendation for</p>
              <p className="text-xl font-bold text-gray-800 mb-4">{selectedCustomerName}</p>

              {/* AI message box – normal (white background, light border) */}
              <div className="border border-gray-200 rounded-lg p-4 text-sm text-gray-700 bg-white">
                <p className="mb-2">
                  Based on recent activity and profile analysis, we recommend the following:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    {selectedCustomerData?.status === "Converted"
                      ? "Customer already converted – consider upselling related products."
                      : selectedCustomerData?.status === "Ignored"
                      ? "Previous recommendation was ignored. Try a different approach or product."
                      : "High potential for a term insurance plan given age is greater 45 and occupation (taxi driver)."}
                  </li>
                  <li>
                    Confidence score:{" "}
                    <span className="font-semibold text-indigo-700">
                      {selectedCustomerData?.confidence_score || "N/A"}%
                    </span>
                  </li>
                  <li>
                    Product type:{" "}
                    <span className="font-semibold">
                      {selectedCustomerData?.product_type || "N/A"}
                    </span>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-gray-500">
                  This insight is generated by our AI engine based on RBI guidelines and pre‑2.3 compliance rules.
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => setShowCustomerPopup(false)}
                >
                  Dismiss
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition">
                  Take Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;