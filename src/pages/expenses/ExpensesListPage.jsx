import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Search, CircleDollarSign, CalendarDays, Plus, Filter,
  Eye, Pencil, Trash2, Hash, Save, X
} from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const initialRows = Array.from({ length: 8 }).map((_, i) => ({
  id: 1030 + i,
  title: `Expense #${1030 + i}`,
  category: ["Office", "Shipping", "Ads", "Salaries"][i % 4],
  supplier: ["Meta", "Cotton Candy", "Logo Store", "Dibo Co."][i % 4],
  collection: [1, 4, 2, 3][i % 4],
  date: `2025-03-${(i + 10).toString().padStart(2, "0")}`,
  method: ["Cash", "Card", "Wallet"][i % 3],
  amount: [660, 1100, 2000, 600][i % 4],
  notes: "Paid in advance for March",
}));

export default function ExpensesListPage() {
  const [expenses, setExpenses] = useState(initialRows);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Office", "Shipping", "Ads", "Salaries"];

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((x) => x.category === filter);

  const openView = (r) => { setSelected(r); setMode("view"); };
  const openEdit = (r) => { setSelected(r); setMode("edit"); };
  const closePopup = () => { setMode(null); setSelected(null); };

  const handleDelete = (id) => {
    toast((t) => (
      <div>
        <p className="font-semibold mb-2">Delete this expense?</p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setExpenses((prev) => prev.filter((x) => x.id !== id));
              toast.dismiss(t.id);
              toast.success("🗑️ Expense deleted successfully!", {
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

  const handleSave = () => {
    setExpenses((prev) =>
      prev.map((x) => (x.id === selected.id ? selected : x))
    );
    toast.success("💾 Expense updated successfully!", {
      style: { borderRadius: "10px", background: "#111", color: "#fff" },
    });
    closePopup();
  };

  return (
    <section className="space-y-6">
      {/* ===== Title + Search + Add ===== */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Expenses.</h1>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-[520px]">
            <input
              className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              placeholder="Search by title, category, or supplier"
            />
            <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-500">
              <Search size={18} />
            </span>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold shadow hover:bg-gray-50">
            <Filter size={16} /> Filter
          </button>
          <NavLink
            to="/expenses/new"
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 font-semibold text-white shadow hover:brightness-110"
          >
            <Plus size={16} /> Add Expense
          </NavLink>
        </div>
      </div>

      {/* ===== Stat Cards ===== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard icon={<CircleDollarSign className="h-5 w-5" />} label="Total Expenses" value="EGP 42,500" tone="amber" />
        <StatCard icon={<CalendarDays className="h-5 w-5" />} label="Expenses in Month" value="EGP 17,500" tone="indigo" />
        <StatCard icon={<Hash className="h-5 w-5" />} label="NUM of Event" value="34" tone="green" />
      </div>

      {/* ===== Category Filter (moved here) ===== */}
      <div>
        <div className="mb-2 text-sm font-bold">Category Filter.</div>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={[
                  "rounded-full px-4 py-2 text-sm font-semibold transition shadow-[0_4px_12px_rgba(0,0,0,.06)]",
                  active
                    ? "bg-[#111] text-white"
                    : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50",
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== Table ===== */}
      <div className="overflow-hidden rounded-2xl border border-gray-400 bg-white shadow-sm">
        <div className="grid grid-cols-13 gap-3 border-b bg-gray-200 px-4 py-3 text-sm font-bold">
          <div className="col-span-2">Title</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Supplier</div>
          <div className="col-span-1 text-center">Collection</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1">Pay Method</div>
          <div className="col-span-1 text-right">Amount</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {filteredExpenses.map((r) => (
          <motion.div
            key={r.id}
            layout
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-13 items-center gap-3 border-t px-4 py-3 text-sm"
          >
            <div className="col-span-2 truncate">{r.title}</div>
            <div className="col-span-2 truncate">{r.category}</div>
            <div className="col-span-2 truncate">{r.supplier}</div>
            <div className="col-span-1 text-center">{r.collection}</div>
            <div className="col-span-2">{r.date}</div>
            <div className="col-span-1">{r.method}</div>
            <div className="col-span-1 text-right whitespace-nowrap">{r.amount} L.E</div>
            <div className="col-span-2 flex items-center justify-end gap-2">
              <button onClick={() => openView(r)} className="rounded-lg border px-2 py-1 hover:bg-gray-50" title="View">
                <Eye size={16} />
              </button>
              <button onClick={() => openEdit(r)} className="rounded-lg border px-2 py-1 hover:bg-gray-50" title="Edit">
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
        {mode && selected && (
          <Popup
            title={mode === "view" ? `View Expense ${selected.title}` : `Edit Expense ${selected.title}`}
            onClose={closePopup}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              {["title","category","supplier","method","amount","date"].map((f) => (
                <Field key={f} label={f[0].toUpperCase() + f.slice(1)}>
                  {mode === "view" ? (
                    selected[f]
                  ) : (
                    <input
                      type={f === "amount" ? "number" : f === "date" ? "date" : "text"}
                      value={selected[f]}
                      onChange={(e) => setSelected({ ...selected, [f]: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-gray-200"
                    />
                  )}
                </Field>
              ))}
              <Field label="Notes">
                {mode === "view" ? (
                  selected.notes
                ) : (
                  <textarea
                    value={selected.notes}
                    onChange={(e) => setSelected({ ...selected, notes: e.target.value })}
                    rows="3"
                    className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-gray-200"
                  ></textarea>
                )}
              </Field>
            </div>

            {mode === "edit" && (
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={closePopup}
                  className="rounded-full border border-gray-300 px-6 py-2 font-semibold hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2 font-semibold text-white shadow hover:brightness-110"
                >
                  <Save size={18} /> Save
                </button>
              </div>
            )}
          </Popup>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ===== Popup Component ===== */
function Popup({ title, onClose, children }) {
  return (
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
        className="w-[95%] max-w-3xl rounded-2xl bg-white p-8 shadow-[0_8px_28px_rgba(0,0,0,.12)] ring-1 ring-slate-200 overflow-y-auto max-h-[90vh]"
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
  );
}

/* ===== Helper Components ===== */
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-2">{children}</div>
    </div>
  );
}

function StatCard({ icon, label, value, tone = "amber" }) {
  const tones = {
    amber: { ring: "ring-slate-200", stripe: "#dcbc0f" },
    indigo: { ring: "ring-indigo-200", stripe: "#6aa1ff" },
    green: { ring: "ring-green-200", stripe: "#34d399" },
  };
  const t = tones[tone] || tones.amber;

  return (
    <div className={`relative rounded-2xl bg-white p-5 shadow-[0_8px_28px_rgba(0,0,0,.08)] ring-1 ${t.ring}`}>
      <div className="flex items-center gap-4">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-black text-[var(--amber)] shadow-[0_8px_16px_rgba(0,0,0,.25)]">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-[16px] font-bold text-gray-600">{label}</div>
          <div className="truncate text-2xl font-bold text-[#0f172a]">{value}</div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-4 right-4 h-[1px] rounded-full"
        style={{ background: t.stripe }}
      />
    </div>
  );
}
