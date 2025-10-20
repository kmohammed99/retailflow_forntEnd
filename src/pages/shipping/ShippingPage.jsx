import toast from "react-hot-toast";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/routes/routePaths";
import { Search, Plus, Pencil, X, Edit2 } from "lucide-react";

const companies = [
  {
    id: "aramex",
    name: "Aramex",
    stats: { cities: 27, avgFee: 55, cod: 3 },
    rows: [
      { gov: "Cairo", price: 45 },
      { gov: "Giza", price: 50 },
      { gov: "Alex", price: 50 },
      { gov: "Fayoum", price: 50 },
      { gov: "Suez", price: 70 },
    ],
  },
  {
    id: "bosta",
    name: "Bosta",
    stats: { cities: 27, avgFee: 60, cod: 3 },
    rows: [
      { gov: "Cairo", price: 45 },
      { gov: "Giza", price: 50 },
      { gov: "Alex", price: 50 },
      { gov: "Fayoum", price: 50 },
      { gov: "Suez", price: 70 },
    ],
  },
];

export default function ShippingPage() {
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [editData, setEditData] = useState({ companyId: "", gov: "", price: "" });
  const [editCOD, setEditCOD] = useState(false);
  const [codValue, setCodValue] = useState("");

  const handleEditClick = (companyId, gov, price) => {
    setEditData({ companyId, gov, price });
    setOpenPopup(true);
  };

  const handleSave = () => {
    toast.success("✅ تم الحفظ بنجاح");
    setOpenPopup(false);
    setTimeout(() => navigate(ROUTES.shipping || "/shipping"), 1500);
  };

  const handleCODSave = () => {
    toast.success("✅ تم تعديل نسبة التحصيل بنجاح");
    setEditCOD(false);
  };

  return (
    <section className="space-y-6 relative">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Shipping Management</h1>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-[520px]">
            <input
              className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              placeholder="Search by government or company"
            />
            <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-500">
              <Search size={18} />
            </span>
          </div>

          <NavLink
            to={ROUTES.shippingNew || "/shipping/new"}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 font-semibold text-white shadow hover:brightness-105"
          >
            <Plus size={18} /> Add Shipping Company
          </NavLink>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {companies.map((c) => (
          <div key={c.id}>
            {/* كارت معلومات الشركة */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 mb-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold tracking-tight">{c.name}</h2>
                <button
                  onClick={() => setEditCOD(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold shadow hover:bg-gray-50"
                >
                  <Edit2 size={16} /> Edit COD %
                </button>
              </div>

              <div className="grid grid-cols-3 text-center text-sm">
                <div>
                  <p className="font-bold text-gray-800">Cities</p>
                  <p className="text-gray-600">{c.stats.cities}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-800">Average Delivery Fee</p>
                  <p className="text-gray-600">{c.stats.avgFee} EGP</p>
                </div>
                <div>
                  <p className="font-bold text-gray-800">COD %</p>
                  <p className="text-gray-600">{c.stats.cod}%</p>
                </div>
              </div>
            </div>

            {/* جدول المحافظات */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="grid grid-cols-12 gap-3 border-b bg-gray-100 px-4 py-3 text-sm font-bold">
                <div className="col-span-8">Government</div>
                <div className="col-span-3">Price</div>
                <div className="col-span-1 text-right">Edit</div>
              </div>

              {c.rows.map((r, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 items-center gap-3 border-t px-4 py-3 text-sm"
                >
                  <div className="col-span-8">{r.gov}</div>
                  <div className="col-span-3">{r.price}</div>
                  <div className="col-span-1 flex items-center justify-end">
                    <button
                      className="rounded-lg border px-2 py-1 hover:bg-gray-50"
                      title="Edit"
                      onClick={() => handleEditClick(c.id, r.gov, r.price)}
                    >
                      <Pencil size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Popup تعديل السعر */}
      {openPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg relative">
            <button
              onClick={() => setOpenPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4">Edit City Price</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Government</label>
                <input
                  type="text"
                  value={editData.gov}
                  disabled
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({ ...editData, price: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpenPopup(false)}
                className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-full bg-black text-white px-6 py-2 text-sm font-semibold hover:brightness-110"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup تعديل نسبة التحصيل */}
      {editCOD && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg relative">
            <button
              onClick={() => setEditCOD(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4">Edit COD Percentage</h3>
            <div className="space-y-4">
              <label className="block text-sm font-medium mb-1">COD %</label>
              <input
                type="number"
                value={codValue}
                onChange={(e) => setCodValue(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="Enter new COD %"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditCOD(false)}
                className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCODSave}
                className="rounded-full bg-black text-white px-6 py-2 text-sm font-semibold hover:brightness-110"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
