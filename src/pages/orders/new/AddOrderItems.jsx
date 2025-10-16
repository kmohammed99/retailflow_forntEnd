import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/routes/routePaths";
import { loadDraft, saveDraft } from "./draft";

export default function AddOrderItems() {
    const nav = useNavigate();
    const [row, setRow] = useState({ product: "", color: "", size: "", qty: 1 });
    const [items, setItems] = useState([]);

    useEffect(() => {
        const d = loadDraft();
        setItems(d.items || []);
    }, []);

    const addItem = () => {
        if (!row.product || !row.qty) return;
        const next = [...items, row];
        setItems(next);
        setRow({ product: "", color: "", size: "", qty: 1 });
        saveDraft({ items: next });
    };

    const removeItem = (i) => {
        const next = items.filter((_, idx) => idx !== i);
        setItems(next);
        saveDraft({ items: next });
    };

    return (
        <section className="mx-auto w-full max-w-6xl rounded-[36px] bg-white p-6 sm:p-10 lg:p-12 shadow-[0_25px_45px_rgba(0,0,0,0.08)] ring-1 ring-black/5 relative">
            <button
                type="button"
                className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-black text-[var(--amber)] shadow-md hover:opacity-90"
                onClick={() => nav(-1)}
                aria-label="Close"
            >
                <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="3">
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>

            <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
                Add New Order - Order INFO.
            </h2>

            {/* إدخال سطر */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <select value={row.product} onChange={(e) => setRow({ ...row, product: e.target.value })}
                    className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px]">
                    <option value="" hidden>Product Name</option>
                    <option>Dibo Palms</option>
                    <option>Product B</option>
                </select>

                <select value={row.color} onChange={(e) => setRow({ ...row, color: e.target.value })}
                    className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px]">
                    <option value="" hidden>Color</option>
                    <option>Red</option><option>Black</option><option>Gold</option>
                </select>

                <select value={row.size} onChange={(e) => setRow({ ...row, size: e.target.value })}
                    className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px]">
                    <option value="" hidden>Size</option>
                    <option>S</option><option>M</option><option>L</option>
                </select>

                <div className="flex gap-3">
                    <input type="number" min={1} value={row.qty}
                        onChange={(e) => setRow({ ...row, qty: Number(e.target.value) })}
                        className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px]" />
                    <button type="button" onClick={addItem}
                        className="rounded-full bg-black px-4 text-white font-bold">＋</button>
                </div>
            </div>

            {/* الجدول */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="grid grid-cols-6 gap-3 border-b bg-gray-50 px-4 py-3 text-sm font-semibold">
                    <div className="col-span-2">Product</div>
                    <div>Color</div><div>Size</div><div>Qty</div><div className="text-right">Actions</div>
                </div>
                {items.map((it, i) => (
                    <div key={i} className="grid grid-cols-6 gap-3 border-t px-4 py-3 text-sm">
                        <div className="col-span-2">{it.product}</div>
                        <div>{it.color}</div><div>{it.size}</div><div>{it.qty}</div>
                        <div className="text-right">
                            <button className="rounded-lg border px-2 py-1 hover:bg-gray-50" onClick={() => removeItem(i)}>Delete</button>
                        </div>
                    </div>
                ))}
                {items.length === 0 && <div className="p-4 text-sm text-gray-500">No items yet…</div>}
            </div>

            <div className="mt-10 flex w-full justify-between">
                <button onClick={() => nav(ROUTES.ordersNew)}
                    className="rounded-full bg-black px-7 py-3 text-xl font-extrabold text-[var(--amber)] shadow">← Back</button>
                <button onClick={() => nav(ROUTES.ordersNewPayment)}
                    className="rounded-full bg-black px-7 py-3 text-xl font-extrabold text-[var(--amber)] shadow">Next →</button>
            </div>
        </section>
    );
}
