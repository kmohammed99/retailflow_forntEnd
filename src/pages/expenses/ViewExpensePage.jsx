import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ViewExpensePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // هنا ممكن تجيب بيانات المصروف من API أو من state
  const expense = {
    id,
    title: `#${id}`,
    category: "Office",
    supplier: "Meta",
    collection: 2,
    date: "2025-03-12",
    method: "Cash",
    amount: "660 L.E",
    notes: "Monthly stationery expenses.",
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Expense Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold shadow hover:bg-gray-50"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="rounded-2xl bg-white shadow p-6 ring-1 ring-black/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[15px]">
          <p><strong>Title:</strong> {expense.title}</p>
          <p><strong>Category:</strong> {expense.category}</p>
          <p><strong>Supplier:</strong> {expense.supplier}</p>
          <p><strong>Collection:</strong> {expense.collection}</p>
          <p><strong>Date:</strong> {expense.date}</p>
          <p><strong>Payment Method:</strong> {expense.method}</p>
          <p><strong>Amount:</strong> {expense.amount}</p>
          <p className="md:col-span-2"><strong>Notes:</strong> {expense.notes}</p>
        </div>
      </div>
    </section>
  );
}
