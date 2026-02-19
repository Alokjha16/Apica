import React, { useState } from "react";

const PartZero = () => {
  const users = [
    {
      _id: "699760474271ef3f23b0c76e",
      name: "Vinit Kaple",
      role: "Customer",
      avatar: "/user1.jpg", // Updated to use actual image from public folder
    },
    {
      _id: "699760474271ef3f23b0c76f",
      name: "Priya Joshi",
      role: "Premium Member",
      avatar: "/user2.jpg", // Updated to use actual image from public folder
    },
  ];

  const [selectedUser, setSelectedUser] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [smsStatus, setSmsStatus] = useState({ message: "", type: "" });
  const [showSmsModal, setShowSmsModal] = useState(false);

  const handleRecommendation = async (user) => {
    setSelectedUser(user);
    setLoadingId(user._id);
    setRecommendation("");
    setSmsStatus({ message: "", type: "" });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user._id}/recommendation`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch");
      
      setRecommendation(data.recommendation);
    } catch (error) {
      console.error(error);
      setRecommendation("❌ Error generating recommendation");
      setSmsStatus({
        message: "Failed to generate recommendation. Please try again.",
        type: "error",
      });
    } finally {
      setLoadingId(null);
    }
  };

  const handleSendSMS = async () => {
    setSmsStatus({ message: "Sending...", type: "info" });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/twilio/send-sms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: "+917276185419",
            message: recommendation,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setSmsStatus({
          message: "✅ SMS sent successfully!",
          type: "success",
        });
        setTimeout(() => setSmsStatus({ message: "", type: "" }), 3000);
      } else {
        setSmsStatus({
          message: "❌ Failed to send SMS. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      setSmsStatus({
        message: "❌ Network error. Please check your connection.",
        type: "error",
      });
    }
  };

  const resetSelection = () => {
    setSelectedUser(null);
    setRecommendation("");
    setSmsStatus({ message: "", type: "" });
    setShowSmsModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Matching Part1Controls style */}
        <div className="mb-8 sm:mb-12">
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
            Preview personalized insights and recommendations via SMS
          </p>
        </div>

        {/* User Grid - Enhanced with better cards matching Part1Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {users.map((user) => (
            <div
              key={user._id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border ${
                selectedUser?._id === user._id 
                  ? "border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50" 
                  : "border-gray-100"
              }`}
            >
              <div className="p-6">
                {/* User Info with Profile Photo - Matching professional style */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 border-2 border-white shadow-md">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=6366f1&color=fff&bold=true`;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        user.role === "Premium Member" ? "bg-purple-500" : "bg-green-500"
                      }`}></span>
                      {user.role}
                    </p>
                  </div>
                </div>

                {/* Action Button - Matching Part1Controls button style */}
                <button
                  onClick={() => handleRecommendation(user)}
                  disabled={loadingId === user._id}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    loadingId === user._id
                      ? "bg-gray-100 cursor-not-allowed text-gray-400"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  }`}
                >
                  {loadingId === user._id ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Get AI Insight</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation Section - Enhanced with better styling */}
        {recommendation && (
          <div className="space-y-6 animate-fadeIn">
            {/* Recommendation Card - Matching Part1Controls card style */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-indigo-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-white">
                      AI Recommendation for {selectedUser?.name}
                    </h2>
                  </div>
                  <button
                    onClick={resetSelection}
                    className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {recommendation}
                  </p>
                </div>
              </div>
            </div>

            {/* SMS Action Card - Matching Part1Controls card style */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Send via SMS
                </h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {/* Phone Number Display */}
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Recipient</p>
                      <p className="font-medium text-gray-900">+91 72761 85419</p>
                    </div>
                  </div>

                  {/* Message Preview */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">Message Preview</p>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {recommendation}
                    </p>
                  </div>

                  {/* Action Buttons - Matching Part1Controls button styles */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleSendSMS}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Send SMS Now</span>
                    </button>
                    
                  </div>

                  {/* Status Message */}
                  {smsStatus.message && (
                    <div
                      className={`mt-3 p-3 rounded-lg text-sm ${
                        smsStatus.type === "success"
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : smsStatus.type === "error"
                          ? "bg-red-50 text-red-800 border border-red-200"
                          : "bg-blue-50 text-blue-800 border border-blue-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {smsStatus.type === "success" && (
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        <span>{smsStatus.message}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full Message Modal - Enhanced */}
      {showSmsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Full Message Preview</h3>
              <button
                onClick={() => setShowSmsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <p className="text-gray-700 whitespace-pre-line">{recommendation}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => setShowSmsModal(false)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PartZero;