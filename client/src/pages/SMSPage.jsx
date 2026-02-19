import React, { useState } from "react";

const SMSPage = () => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/twilio/send-sms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ to, message }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setStatus("✅ SMS Sent Successfully");
      } else {
        setStatus("❌ Failed to send SMS");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Error sending SMS");
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Send SMS</h1>

      <form onSubmit={handleSend} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="+91XXXXXXXXXX"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 rounded"
        />

        <button className="bg-indigo-600 text-white py-2 rounded">
          Send SMS
        </button>
      </form>

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
};

export default SMSPage;
