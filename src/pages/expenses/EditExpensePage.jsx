import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function EditExpensePage() {
  const [form, setForm] = useState({
    title: "#1030",
    category: "Office",
    supplier: "Meta",
    date: "2025-03-12",
    method: "Cash",
    amount: "660",
    notes: "",
  });

  const update = (key, value) => setForm((s) => ({ ...s, [key]: value }));

  const handleSave = () => {
    toast.success("Expense updated successfully ✅");
  };

  return (
    <div className="relative mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-[0_8px_28px_rgba(0,0,0,.08)]">
      {/* زرار الإغلاق */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-black text-[var(--amber,#dcbc0f)] hover:brightness-125"
      >
        <X size={20} />
      </button>

      {/* العنوان */}
      <h1 className="mb-10 text-center text-3xl font-extrabold">
        Edit Expense.
      </h1>

      {/* الفورم */}
      <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Title *">
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className="input-style"
          />
        </Field>

        <Field label="Category *">
          <input
            type="text"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="input-style"
          />
        </Field>

        <Field label="Supplier *">
          <input
            type="text"
            value={form.supplier}
            onChange={(e) => update("supplier", e.target.value)}
            className="input-style"
          />
        </Field>

        <Field label="Date *">
          <input
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            className="input-style"
          />
        </Field>

        <Field label="Payment Method *">
          <select
            value={form.method}
            onChange={(e) => update("method", e.target.value)}
            className="input-style"
          >
            <option>Cash</option>
            <option>Card</option>
            <option>Wallet</option>
          </select>
        </Field>

        <Field label="Amount *">
          <input
            type="number"
            value={form.amount}
            onChange={(e) => update("amount", e.target.value)}
            className="input-style"
          />
        </Field>

        <div className="md:col-span-2">
          <Field label="Notes">
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Add any details about this expense..."
              className="input-style min-h-[100px]"
            />
          </Field>
        </div>
      </form>

      {/* الزرار */}
      <div className="mt-10 flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center justify-center rounded-full bg-black px-8 py-3 text-lg font-semibold text-[var(--amber,#dcbc0f)] shadow hover:brightness-110"
        >
          Save
        </button>
      </div>
    </div>
  );
}

/* ====== مكون الحقل ====== */
function Field({ label, children }) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ====== استايل موحّد للبوكسات ====== */
const inputStyle = `
  h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px]
  text-gray-800 shadow-sm outline-none
  focus:border-[#dcbc0f] focus:ring-2 focus:ring-[#dcbc0f]/30 transition-all
`;
if (typeof window !== "undefined") {
  setTimeout(() => {
    document
      .querySelectorAll(".input-style")
      .forEach((el) => (el.className += " " + inputStyle));
  }, 0);
}
