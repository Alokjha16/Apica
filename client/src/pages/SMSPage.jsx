import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Phone, MessageSquare, CheckCircle, XCircle, ShieldCheck, Sparkles } from "lucide-react";

const SMSPage = () => {
  const navigate = useNavigate();
  const fixedNumber = "+917276185419";
  
  // You can set a default auto-fill message here
  const [message, setMessage] = useState("AI Recommendation: Based on your credit score, we suggest the RBI-compliant 'Gold Shield' plan.");
  const [status, setStatus] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setStatus({ message: "Please enter a message", type: "error" });
      return;
    }

    setLoading(true);
    setStatus({ message: "Sending...", type: "info" });

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/twilio/send-sms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: fixedNumber, message }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus({ message: "✅ SMS sent successfully!", type: "success" });
        setMessage("");
        setTimeout(() => setStatus({ message: "", type: "" }), 3000);
      } else {
        setStatus({ message: "❌ Failed to send SMS.", type: "error" });
      }
    } catch (error) {
      setStatus({ message: "❌ Network error.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 group">
          <div className="p-2 rounded-lg bg-white shadow-sm group-hover:bg-gray-50"><ArrowLeft size={20} className="text-indigo-600" /></div>
          <span className="font-medium">Back</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSend} className="space-y-6">
              {/* Fixed Number Display */}
         

              {/* Message Box */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MessageSquare size={18} className="text-indigo-600" /> Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  disabled={loading}
                />
              </div>

              <div className="flex gap-3">
                <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 flex items-center justify-center gap-2">
                   {loading ? "Sending..." : "Send Recommendation"}
                </button>
                <button type="button" onClick={() => setMessage("")} className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Clear
                </button>
              </div>
            </form>

            {/* RESTORED: Quick Templates Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" />
                AI Suggested Templates
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "🤝 Compliance Update", text: "Important: Your account is now fully compliant with the latest RBI 2024 digital guidelines." },
                  { label: "📈 Strategy Alert", text: "AI Alert: Our engine suggests diversifying 15% of your portfolio into low-risk bonds." },
                  { label: "🔐 Security Check", text: "Security Notice: Please review your recent login activity to ensure compliance." }
                ].map((template) => (
                  <button
                    key={template.label}
                    onClick={() => setMessage(template.text)}
                    className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-2 rounded-lg transition border border-indigo-100"
                  >
                    {template.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSPage;