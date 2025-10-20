import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

export default function EditShippingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // قيم مبدئية تجريبية - دي المفروض تيجي من الباك اند
  const [companyData, setCompanyData] = useState({
    name: id || "Unknown Company",
    citiesCovered: 27,
    avgDeliveryFee: 55, // محسوبة من الباك اند (read-only)
    codFee: 3,
    //phone: "01000000000",
    //address: "Nasr City, Cairo",
  });

  // handleChange لتحديث المدخلات
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving company data:", companyData);
    navigate(-1); // يرجع للصفحة السابقة بعد الحفظ
  };

  return (
    <section className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-full border border-gray-300 p-2 hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Edit Shipping Company
          </h1>
        </div>
      </div>

      {/* Card */}
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-[0_8px_28px_rgba(0,0,0,.08)] ring-1 ring-slate-200">
        <h2 className="mb-6 text-2xl font-extrabold text-center text-gray-800">
          {companyData.name}
        </h2>

        <div className="space-y-6 text-gray-700">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              value={companyData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-100 p-2 outline-none focus:ring-2 focus:ring-gray-200"
              readOnly
            />
          </div>

          {/* Average Delivery Fee (Read-only) */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Average Delivery Fee (Auto Calculated)
            </label>
            <input
              type="number"
              name="avgDeliveryFee"
              value={companyData.avgDeliveryFee}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-100 p-2 outline-none focus:ring-2 focus:ring-gray-200"
              readOnly
            />
            <p className="mt-1 text-xs text-gray-500">
              This value is calculated automatically from backend.
            </p>
          </div>

          {/* COD Fee */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              COD Fee (%)
            </label>
            <input
              type="number"
              name="codFee"
              value={companyData.codFee}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-gray-200"
            />
  
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-full border border-gray-300 px-6 py-2 font-semibold hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2 font-semibold text-white shadow hover:brightness-110"
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </section>
  );
}
