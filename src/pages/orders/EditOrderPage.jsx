import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function EditOrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // بيانات مبدئية
  const [order, setOrder] = useState({
    orderId: id || "#1001",
    customer: "Mohamed Ahmed",
    phone: "01000000000",
    address: "Nasr City, Cairo",
    qty: 3,
    total: 1200,
    status: "Delivered",
    payment: "Cash",
    date: "2025-03-20",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving order data:", order);
    toast.success("✅ Order updated successfully!", {
      style: { borderRadius: "10px", background: "#111", color: "#fff" },
    });
    setTimeout(() => navigate(-1), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[95%] max-w-3xl rounded-2xl bg-white p-8 shadow-[0_8px_28px_rgba(0,0,0,.12)] ring-1 ring-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded-full border border-gray-300 p-2 hover:bg-gray-100"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Edit Order
            </h1>
          </div>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <Field label="Order ID" name="orderId" value={order.orderId} readOnly />
          <Field label="Customer Name" name="customer" value={order.customer} onChange={handleChange} />
          <Field label="Phone Number" name="phone" value={order.phone} onChange={handleChange} />
          <Field label="Address" name="address" value={order.address} onChange={handleChange} />
          <Field label="Quantity" name="qty" type="number" value={order.qty} onChange={handleChange} />
          <Field label="Total (EGP)" name="total" type="number" value={order.total} onChange={handleChange} />
          <Field label="Order Date" name="date" type="date" value={order.date} onChange={handleChange} />

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">Status</label>
            <select
              name="status"
              value={order.status}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Delivered</option>
              <option>Returned</option>
              <option>Canceled</option>
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Payment Method
            </label>
            <select
              name="payment"
              value={order.payment}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option>Cash</option>
              <option>Card</option>
              <option>Wallet</option>
            </select>
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
    </div>
  );
}

/* --- Component for form field --- */
function Field({ label, name, value, onChange, type = "text", readOnly }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-600">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        className={`mt-1 w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-gray-200 ${
          readOnly ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}
