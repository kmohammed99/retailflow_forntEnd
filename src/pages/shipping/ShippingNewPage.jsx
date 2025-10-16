import React, { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";

export default function ShippingNewPage() {
    const [form, setForm] = useState({
        name: "",
        fee: "",
        city: "",
        price: "",
        rows: [],
    });

    const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const addRow = () => {
        if (!form.city || !form.price) return;
        setForm((f) => ({
            ...f,
            rows: [...f.rows, { city: f.city, price: f.price }],
            city: "",
            price: "",
        }));
    };

    const removeRow = (idx) =>
        setForm((f) => ({ ...f, rows: f.rows.filter((_, i) => i !== idx) }));

    const submit = (e) => {
        e.preventDefault();
        console.log("new shipping company:", form);
    };

    return (
        <section className="mx-auto w-full max-w-6xl rounded-[36px] bg-white p-6 sm:p-10 lg:p-12 shadow-[0_25px_45px_rgba(0,0,0,0.08)] ring-1 ring-black/5 relative">
            {/* Close (يرجع للخلف) */}
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

            <h2 className="mb-8 text-center text-3xl font-extrabold tracking-tight">Add New Shipping Company.</h2>

            <form onSubmit={submit} className="space-y-8">
                {/* معلومات الشركة */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Company Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={change}
                            className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Company Fee</label>
                        <input
                            name="fee"
                            value={form.fee}
                            onChange={change}
                            className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                        />
                    </div>
                </div>

                {/* إضافة مدينة + سعر */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">City</label>
                        <select
                            name="city"
                            value={form.city}
                            onChange={change}
                            className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                        >
                            <option value="" disabled hidden>
                                Select…
                            </option>
                            {["Cairo", "Giza", "ALEX", "Fayoum", "Suez"].map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Price</label>
                        <input
                            name="price"
                            value={form.price}
                            onChange={change}
                            className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    <div className="flex items-end">
                        <button
                            type="button"
                            onClick={addRow}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 font-semibold shadow-[0_4px_12px_rgba(0,0,0,.06)] hover:bg-gray-50 md:w-auto"
                        >
                            <Plus size={18} /> Add
                        </button>
                    </div>
                </div>

                {/* جدول المدن والأسعار */}
                <div>
                    <h3 className="mb-3 text-2xl font-extrabold tracking-tight">City & Price.</h3>
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="grid grid-cols-12 gap-3 border-b bg-gray-200 px-4 py-3 text-sm font-bold">
                            <div className="col-span-6">City</div>
                            <div className="col-span-4">Price</div>
                            <div className="col-span-2 text-right">Action</div>
                        </div>

                        {form.rows.map((r, i) => (
                            <div key={i} className="grid grid-cols-12 items-center gap-3 border-t px-4 py-3 text-sm">
                                <div className="col-span-6">{r.city}</div>
                                <div className="col-span-4">{r.price}</div>
                                <div className="col-span-2 flex items-center justify-end gap-2">
                                    <button className="rounded-lg border px-2 py-1 hover:bg-gray-50" title="Edit">
                                        <Pencil size={16} />
                                    </button>
                                    <button onClick={() => removeRow(i)} className="rounded-lg border px-2 py-1 hover:bg-gray-50" title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {form.rows.length === 0 && (
                            <div className="px-4 py-6 text-sm text-gray-500">No cities added yet.</div>
                        )}
                    </div>
                </div>

                {/* حفظ */}
                <div className="flex w-full justify-end">
                    <button
                        type="submit"
                        className="inline-flex items-center gap-3 rounded-full bg-[#111] px-7 py-3 text-xl font-extrabold text-[var(--amber)] shadow hover:brightness-110"
                    >
                        Save <span>💾</span>
                    </button>
                </div>
            </form>
        </section>
    );
}
