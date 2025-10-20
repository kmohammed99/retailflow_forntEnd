import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/routes/routePaths";
import {
  Search,
  CircleDollarSign,
  CalendarDays,
  Plus,
  Filter,
  Eye,
  Pencil,
  Trash2,
  Hash,
} from "lucide-react";
import toast from "react-hot-toast";

/** Fake data */
const rows = Array.from({ length: 8 }).map((_, i) => ({
  id: 1030 + i,
  title: `#10${30 + i}`,
  category: ["Office", "Shipping", "Ads", "Salaries"][i % 4],
  supplier: ["Meta", "Cotton Candy", "Logo Store", "Dibo Co."][i % 4],
  collection: [1, 4, 2, 3][i % 4],
  date: `2025-03-${(i + 10).toString().padStart(2, "0")}`,
  method: ["Cash", "Card", "Wallet"][i % 3],
  amount: [660, 1100, 2000, 600][i % 4],
}));

export default function ExpensesListPage() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState(rows);

  /** عرض التفاصيل */
  const handleView = (id) => {
    navigate(`/expenses/${id}/view`);
  };

  /** تعديل */
  const handleEdit = (id) => {
    navigate(`/expenses/${id}/edit`);
  };

  /** حذف */
  const handleDelete = (id) => {
    const confirm = window.confirm("هل أنت متأكد من حذف هذا المصروف؟");
    if (confirm) {
      setExpenses((prev) => prev.filter((x) => x.id !== id));
      toast.success("تم حذف المصروف بنجاح ✅");
    }
  };

  return (
    <section className="space-y-6">
      {/* Title + Search + Add */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Expenses.</h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-[520px]">
            <input
              className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              placeholder="Search by title, category, or supplier"
            />
            <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-500">
              <Search size={18} />
            </span>
          </div>

          {/* Filter */}
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold shadow hover:bg-gray-50"
            type="button"
          >
            <Filter size={16} /> Filter
          </button>

          {/* Add Expense */}
          <NavLink
            to={ROUTES.expensesNew || "/expenses/new"}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 font-semibold 
             text-white hover:text-white visited:text-white active:text-white no-underline !text-white shadow
             hover:brightness-110"
          >
            <Plus size={16} /> Add Expense
          </NavLink>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          icon={<CircleDollarSign className="h-5 w-5" />}
          label="Total Expenses"
          value="EGP 42,500"
          tone="amber"
        />
        <StatCard
          icon={<CalendarDays className="h-5 w-5" />}
          label="Expenses in Month"
          value="EGP 17,500"
          tone="indigo"
        />
        <StatCard
          icon={<Hash className="h-5 w-5" />}
          label="NUM of Event"
          value="34"
          tone="green"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-400 bg-white shadow-sm">
        <div className="grid grid-cols-13 gap-3 border-b bg-gray-200 px-4 py-3 text-sm font-bold">
          <div className="col-span-2">Expenses Title</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Supplier</div>
          <div className="col-span-1 text-center">Collection</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1">Pay Method</div>
          <div className="col-span-1 text-right">Amount</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {expenses.map((r, i) => (
          <div
            key={r.id}
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
              <button
                className="rounded-lg border px-2 py-1 hover:bg-gray-50"
                title="View"
                onClick={() => handleView(r.id)}
              >
                <Eye size={16} />
              </button>
              <button
                className="rounded-lg border px-2 py-1 hover:bg-gray-50"
                title="Edit"
                onClick={() => handleEdit(r.id)}
              >
                <Pencil size={16} />
              </button>
              <button
                className="rounded-lg border px-2 py-1 hover:bg-gray-50"
                title="Delete"
                onClick={() => handleDelete(r.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===== StatCard ===== */
function StatCard({ icon, label, value, tone = "amber" }) {
  const tones = {
    amber: { ring: "ring-slate-200", stripe: "#dcbc0f" },
    indigo: { ring: "ring-indigo-200", stripe: "#6aa1ff" },
    green: { ring: "ring-green-200", stripe: "#34d399" },
  };
  const t = tones[tone] || tones.amber;

  return (
    <div
      className={[
        "relative rounded-2xl bg-white p-5 shadow-[0_8px_28px_rgba(0,0,0,.08)] ring-1",
        t.ring,
      ].join(" ")}
    >
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
