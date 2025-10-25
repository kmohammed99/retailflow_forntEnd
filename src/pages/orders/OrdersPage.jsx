import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/app/routes/routePaths";
import {
  Eye,
  Trash2,
  Clock3,
  CheckCircle2,
  CalendarDays,
  ShoppingBag,
  Pencil,
  Save,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

/* بيانات تجريبية */
const initialRows = Array.from({ length: 9 }).map((_, i) => ({
  id: `#${1033 + i}`,
  date: "2025-03-20",
  customer: "Mohamed",
  qty: 4,
  total: 1200,
  status: ["Delivered", "In Progress", "Pending", "Returned", "Canceled"][i % 5],
}));

export default function OrdersListPage() {
  const [rows, setRows] = useState(initialRows);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsViewing(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    toast((t) => (
      <div>
        <p className="font-semibold mb-2">Delete this order?</p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setRows((prev) => prev.filter((row) => row.id !== id));
              toast.dismiss(t.id);
              toast.success("🗑️ Order deleted successfully!", {
                style: { borderRadius: "10px", background: "#111", color: "#fff" },
              });
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const closePopup = () => {
    setIsEditing(false);
    setIsViewing(false);
    setSelectedOrder(null);
  };

  const saveOrder = () => {
    setRows((prev) =>
      prev.map((row) => (row.id === selectedOrder.id ? selectedOrder : row))
    );
    toast.success("💾 Order updated successfully!", {
      style: { borderRadius: "10px", background: "#111", color: "#fff" },
    });
    setIsEditing(false);
  };

  return (
    <section className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Orders.</h1>
        <div className="flex w-full items-center gap-3 md:w-auto">
          <div className="relative w-full md:w-[420px]">
            <input
              className="h-11 w-full rounded-xl border border-gray-1000 bg-white pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              placeholder="Search by Order ID, Customer, or Phone"
            />
            <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 18a8 8 0 1 1 5.292-14.01L21 9.7l-1.4 1.4-4.3-4.3A8 8 0 0 1 10 18z" />
              </svg>
            </span>
          </div>
          <NavLink
            to={ROUTES.ordersNew}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 font-semibold 
             text-white shadow hover:brightness-110"
          >
            <span className="text-lg">＋</span> Add Order
          </NavLink>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard icon={<ShoppingBag className="h-6 w-6" />} label="Total Orders" value={rows.length} tone="amber" />
        <StatCard icon={<Clock3 className="h-6 w-6 text-[var(--amber)]" />} label="Pending Orders" value="22" tone="indigo" />
        <StatCard icon={<CheckCircle2 className="h-6 w-6 text-[var(--amber)]" />} label="Delivered Orders" value="934" tone="green" />
      </div>

      <FiltersBar />

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-3 border-b bg-gray-200 px-4 py-3 text-sm font-bold">
          <div className="col-span-2">Order ID</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-3">Customer</div>
          <div className="col-span-1 text-right">Qty</div>
          <div className="col-span-2">Total</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {rows.map((r) => (
          <motion.div
            key={r.id}
            layout
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-12 gap-3 border-t px-4 py-3 text-sm"
          >
            <div className="col-span-2">{r.id}</div>
            <div className="col-span-2">{r.date}</div>
            <div className="col-span-3">{r.customer}</div>
            <div className="col-span-1 text-right">{r.qty}</div>
            <div className="col-span-2">{r.total} L.E</div>
            <div className="col-span-1">
              <StatusPill status={r.status} />
            </div>
            <div className="col-span-1 flex items-center justify-end gap-2">
              <button onClick={() => handleView(r)} className="rounded-lg border px-2 py-1 hover:bg-gray-50" title="View">
                <Eye size={16} />
              </button>
              <button onClick={() => handleEdit(r)} className="rounded-lg border px-2 py-1 hover:bg-gray-50" title="Edit">
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(r.id)} className="rounded-lg border px-2 py-1 hover:bg-gray-50" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== Popups ===== */}
      <AnimatePresence>
        {isViewing && selectedOrder && (
          <Popup key="view" title={`Order Details ${selectedOrder.id}`} onClose={closePopup}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <Field label="Customer">{selectedOrder.customer}</Field>
              <Field label="Date">{selectedOrder.date}</Field>
              <Field label="Quantity">{selectedOrder.qty}</Field>
              <Field label="Total">{selectedOrder.total} L.E</Field>
              <Field label="Status">{selectedOrder.status}</Field>
            </div>
          </Popup>
        )}

        {isEditing && selectedOrder && (
          <Popup key="edit" title={`Edit Order ${selectedOrder.id}`} onClose={closePopup}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <Field label="Customer Name">
                <input
                  value={selectedOrder.customer}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, customer: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-gray-200"
                />
              </Field>
              <Field label="Date">
                <input
                  type="date"
                  value={selectedOrder.date}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, date: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-gray-200"
                />
              </Field>
              <Field label="Quantity">
                <input
                  type="number"
                  value={selectedOrder.qty}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, qty: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-gray-200"
                />
              </Field>
              <Field label="Total Amount (L.E)">
                <input
                  type="number"
                  value={selectedOrder.total}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, total: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-gray-200"
                />
              </Field>
              <Field label="Status">
                <select
                  value={selectedOrder.status}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Delivered</option>
                  <option>Returned</option>
                  <option>Canceled</option>
                </select>
              </Field>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button onClick={closePopup} className="rounded-full border border-gray-300 px-6 py-2 font-semibold hover:bg-gray-100">
                Cancel
              </button>
              <button onClick={saveOrder} className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2 font-semibold text-white shadow hover:brightness-110">
                <Save size={18} /> Save
              </button>
            </div>
          </Popup>
        )}
      </AnimatePresence>
    </section>
  );
}

/* Popup with animation */
function Popup({ title, onClose, children }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-[95%] max-w-3xl rounded-2xl bg-white p-8 shadow-[0_8px_28px_rgba(0,0,0,.12)] ring-1 ring-slate-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
            <button onClick={onClose} className="rounded-full border border-gray-300 p-2 hover:bg-gray-100">
              <X size={18} />
            </button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-2">{children}</div>
    </div>
  );
}

/* باقي العناصر نفس القديم */
function FiltersBar() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const statuses = ["Pending", "In Progress", "Delivered", "Returned", "Canceled"];
  const [active, setActive] = useState("Pending");

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <div className="mb-2 text-sm font-bold">Optional Summary.</div>
        <div className="relative flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-2 shadow-[0_6px_20px_rgba(0,0,0,.06)]">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#111] text-[var(--amber)]">
            <CalendarDays size={18} />
          </span>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="h-11 flex-1 rounded-xl border border-gray-200 bg-white px-3 text-[15px] outline-none" />
          <span className="select-none px-1 text-gray-400">—</span>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="h-11 flex-1 rounded-xl border border-gray-200 bg-white px-3 text-[15px] outline-none" />
        </div>
      </div>
      <div>
        <div className="mb-2 text-sm font-bold">Status Filter.</div>
        <div className="flex flex-wrap gap-3">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition shadow-[0_4px_12px_rgba(0,0,0,.06)] ${
                s === active ? "bg-[#111] text-white" : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, tone = "amber" }) {
  const tones = {
    amber: { ring: "ring-slate-200", stripe: "linear-gradient(90deg,#dcbc0f,#dcbc0f)" },
    indigo: { ring: "ring-indigo-200", stripe: "linear-gradient(90deg,#6aa1ff,#6aa1ff)" },
    green: { ring: "ring-green-200", stripe: "linear-gradient(90deg,#34d399,#34d399)" },
  };
  const t = tones[tone] ?? tones.amber;
  return (
    <div className={`relative rounded-[18px] bg-white p-5 md:p-6 shadow-[0_10px_22px_rgba(0,0,0,.10)] ring-1 ${t.ring}`}>
      <div className="pointer-events-none absolute bottom-0 left-4 right-4 h-[1px]" style={{ background: t.stripe }} />
      <div className="flex items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-black text-[var(--amber)] shadow-[0_8px_16px_rgba(0,0,0,.20)]">{icon}</div>
        <div className="min-w-0">
          <div className="text-[15px] font-bold text-gray-600">{label}</div>
          <div className="truncate text-[26px] font-bold leading-tight text-[#0f172a]">{value}</div>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    Pending: "bg-gray-200 text-gray-800",
    "In Progress": "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    Returned: "bg-red-100 text-red-700",
    Canceled: "bg-zinc-200 text-zinc-700",
  };
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${map[status] || "bg-gray-200 text-gray-800"}`}>
      {status}
    </span>
  );
}
