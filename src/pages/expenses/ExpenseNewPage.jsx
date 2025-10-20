import React, { useState } from "react";
import { CalendarDays, Save } from "lucide-react";

export default function ExpenseNewPage() {
  const [form, setForm] = useState({
    category: "",
    method: "",
    collection: "",
    desc: "",
    date: "",
    amount: "",
  });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    console.log("new expense:", form);
  };

  return (
    <section className="relative mx-auto w-full max-w-6xl rounded-[36px] bg-white p-6 sm:p-10 lg:p-12 shadow-[0_25px_45px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
      {/* Close */}
      <button
        type="button"
        aria-label="Close"
        className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-black text-[var(--amber)] shadow-md hover:opacity-90"
        onClick={() => window.history.back()}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="3">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
        Add New Expense.
      </h2>

      <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Expense Category */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Expense Category</label>
          <select
            name="category"
            value={form.category}
            onChange={onChange}
            className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 pr-10 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
          >
            <option value="" hidden>Select…</option>
            <option>Office</option>
            <option>Shipping</option>
            <option>Ads</option>
            <option>Matirials</option>
          </select>
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Payment Method</label>
          <select
            name="method"
            value={form.method}
            onChange={onChange}
            className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 pr-10 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
          >
            <option value="" hidden>Select…</option>
            <option>Cash</option>
            <option>visa</option>
            <option>Wallet</option>
          </select>
        </div>

        {/* Expense Collection */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Expense Collection</label>
          <select
            name="collection"
            value={form.collection}
            onChange={onChange}
            className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 pr-10 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
          >
            <option value="" hidden>Select…</option>
            <option>summer collection 2025</option>
            <option>winter collection 2025</option>
            <option>summer collection 2026</option>
            <option>winter collection 2026</option>
          </select>
        </div>
        {/* Supplier Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Supplier Name</label>
          <select
            name="SupplierName"
            value={form.SupplierName}
            onChange={onChange}
            className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 pr-10 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
          >
            <option value="" hidden>Select…</option>
            <option>Cotton candy</option>
            <option>gary tex</option>
            <option>logo</option>
            <option>jesion</option>
          </select>
        </div>
        {/* Description (full row) */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Expense Description</label>
          <input
            name="desc"
            value={form.desc}
            onChange={onChange}
            className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            placeholder=""
          />
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Date</label>
          <div className="relative">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
            <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-500">
              <CalendarDays size={18} />
            </span>
          </div>
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Amount</label>
          <input
            name="amount"
            value={form.amount}
            onChange={onChange}
            inputMode="numeric"
            className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* Save */}
        <div className="md:col-span-2 mt-4 flex w-full justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-[#111] px-7 py-3 text-lg font-extrabold text-[var(--amber)] shadow hover:brightness-110"
          >
            Save <Save size={18} />
          </button>
        </div>
      </form>
    </section>
  );
}
