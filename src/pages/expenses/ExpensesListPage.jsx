import React from "react";
import { NavLink } from "react-router-dom";
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

/** Fake data */
const rows = Array.from({ length: 8 }).map((_, i) => ({
  title: `#10${30 + i}`,
  category: ["Office", "Shipping", "Ads", "Salaries"][i % 4],
  collection: [1, 4, 2, 3][i % 4],
  date: `2025-03-${(i + 10).toString().padStart(2, "0")}`,
  method: ["Cash", "Card", "Wallet"][i % 3],
  amount: [660, 1100, 2000, 600][i % 4],
}));

export default function ExpensesListPage() {
  return (
    <section className="space-y-6">
      {/* Title + Search + Add */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Expenses.</h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-[520px]">
            <input
              className="h-11 w-full rounded-xl border border-gray-1000 bg-white pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              placeholder="Search by title, category, or collection"
            />
            <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-500">
              <Search size={18} />
            </span>
          </div>

          {/* Filter (dummy) */}
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold shadow hover:bg-gray-50"
            type="button"
          >
            <Filter size={16} /> Filter
          </button>

          {/* Add Expense (black bg, white text) */}
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

      {/* Range filter (From/To) */}
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="mb-2 text-sm font-semibold">Optional Summary.</div>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                placeholder="From"
                type="date"
              />
              <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-500">
                <CalendarDays size={18} />
              </span>
            </div>
            <div className="relative flex-1">
              <input
                className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                placeholder="To"
                type="date"
              />
              <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-500">
                <CalendarDays size={18} />
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 text-sm font-semibold">Status Filter.</div>
          <div className="flex flex-wrap gap-3">
            {["All", "Cash", "Card", "Wallet"].map((s) => (
              <button
                key={s}
                className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold shadow-[0_4px_12px_rgba(0,0,0,.06)] hover:bg-gray-50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div> */}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-400 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-3 border-b bg-gray-200 px-4 py-3 text-sm font-bold">
          <div className="col-span-3">Expenses Title</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-1 text-center">Collection</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Pay Method</div>
          <div className="col-span-1 text-right">Amount</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {rows.map((r, i) => (
          <div
            key={i}
            className="grid grid-cols-12 items-center gap-3 border-t px-4 py-3 text-sm"
          >
            <div className="col-span-3">{r.title}</div>
            <div className="col-span-2">{r.category}</div>
            <div className="col-span-1 text-center">{r.collection}</div>
            <div className="col-span-2">{r.date}</div>
            <div className="col-span-2">{r.method}</div>
            <div className="col-span-1 text-right">{r.amount} L.E</div>
            <div className="col-span-1 flex items-center justify-end gap-2">
              <button className="rounded-lg border px-2 py-1 hover:bg-gray-50" title="View">
                <Eye size={16} />
              </button>
              <button className="rounded-lg border px-2 py-1 hover:bg-gray-50" title="Edit">
                <Pencil size={16} />
              </button>
              <button className="rounded-lg border px-2 py-1 hover:bg-gray-50" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===== StatCard (same file) ===== */
function StatCard({ icon, label, value, tone = "amber" }) {
  const tones = {
    amber: { ring: "ring-slate-200", stripe: "#dcbc0f" },
    indigo: { ring: "ring-indigo-200", stripe: "#6aa1ff" },
    green: { ring: "ring-green-200", stripe: "#34d399" },
  };
  const t = tones[tone] || tones.amber;

  return (
    <div className={["relative rounded-4xl bg-white p-5  shadow-[0_8px_28px_rgba(0,0,0,.08)] ring-1", t.ring].join(" ")}>
      <div className="flex items-center gap-4">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-black text-[var(--amber)] shadow-[0_8px_16px_rgba(0,0,0,.25)]">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-[16px] font-bold text-gray-600">{label}</div>
          <div className="truncate text-2xl font-bold text-[#0f172a]">{value}</div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-4 right-4 h-[1px] rounded-full" style={{ background: t.stripe }} />
    </div>
  );
}
