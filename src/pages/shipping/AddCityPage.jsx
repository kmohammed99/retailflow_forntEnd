import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Save, CheckCircle2 } from "lucide-react";

export default function AddCityPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const companyName = params.get("company") || "Unknown Company";

  const [city, setCity] = useState("");
  const [fee, setFee] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    if (!city || !fee) {
      alert("Please fill in all fields.");
      return;
    }

    // (في المرحلة دي ممكن نحفظها في API أو LocalStorage)
    console.log(`Saving city "${city}" with fee ${fee} for ${companyName}`);

    setShowSuccess(true);

    // بعد ثانيتين يرجعك لصفحة الشحن
    setTimeout(() => navigate("/shipping"), 2000);
  };

  return (
    <section className="max-w-3xl mx-auto space-y-8">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Add City for <span className="text-[var(--amber)]">{companyName}</span>
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold shadow hover:bg-gray-50"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {/* ===== Form ===== */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Governorate Name
          </label>
          <input
            type="text"
            placeholder="Enter city or governorate name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Shipping Fee (EGP)
          </label>
          <input
            type="number"
            placeholder="Enter delivery fee"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />
        </div>
      </div>

      {/* ===== Save Button ===== */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-3 rounded-full bg-[#111] px-7 py-3 text-xl font-extrabold text-[var(--amber)] shadow hover:brightness-110"
        >
          Save <Save size={20} />
        </button>
      </div>

      {/* ===== Success Message ===== */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center space-y-4">
            <CheckCircle2 size={50} className="text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold">Saved Successfully!</h2>
            <p className="text-gray-600">Redirecting back to Shipping Page...</p>
          </div>
        </div>
      )}
    </section>
  );
}
