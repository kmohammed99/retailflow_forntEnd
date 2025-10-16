import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/routes/routePaths";
import { loadDraft, saveDraft } from "./draft";

export default function AddOrderCustomer() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "", phone: "", email: "", gov: "", address: "",
  });

  useEffect(() => {
    const d = loadDraft();
    setForm((f) => ({ ...f, ...d.customer }));
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const next = (e) => {
    e.preventDefault();
    // required handled by HTML attributes
    saveDraft({ customer: form });
    nav(ROUTES.ordersNewItems);
  };

  return (
    <section className="mx-auto w-full max-w-6xl rounded-[36px] bg-white p-6 sm:p-10 lg:p-12 shadow-[0_25px_45px_rgba(0,0,0,0.08)] ring-1 ring-black/5 relative">
      <button
        type="button"
        aria-label="Close"
        className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-black text-[var(--amber)] shadow-md hover:opacity-90"
        onClick={() => nav(-1)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="3">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
        Add New Order - Customer INFO.
      </h2>

      <form onSubmit={next}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input name="name" required value={form.name} onChange={handleChange}
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input name="phone" required value={form.phone} onChange={handleChange}
              inputMode="tel" pattern="^[0-9]{7,15}$" title="أدخل رقم من 7 إلى 15 رقمًا"
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Government <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select name="gov" required value={form.gov} onChange={handleChange}
                className="h-12 w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 pr-10 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200">
                <option value="" disabled hidden>Select…</option>
                <option>Cairo</option><option>Giza</option>
                <option>Alexandria</option><option>Luxor</option><option>Aswan</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-gray-700">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
              </span>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Address <span className="text-red-500">*</span>
            </label>
            <input name="address" required value={form.address} onChange={handleChange}
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200" />
          </div>
        </div>

        <div className="mt-10 flex w-full justify-end">
          <button type="submit"
            className="group flex items-center gap-3 rounded-full bg-[#111] px-7 py-3 text-xl font-extrabold text-[var(--amber)] shadow hover:brightness-110">
            Next <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </form>
    </section>
  );
}
