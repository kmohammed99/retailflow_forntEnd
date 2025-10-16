import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/routes/routePaths";
import { loadDraft, saveDraft, clearDraft } from "./draft";

export default function AddOrderPayment() {
    const nav = useNavigate();
    const [pay, setPay] = useState({
        method: "", company: "", discount: "", fee: "", shipCost: "", shipFee: "", total: "", net: ""
    });

    useEffect(() => {
        const d = loadDraft();
        setPay((p) => ({ ...p, ...(d.payment || {}) }));
    }, []);

    const onChange = (e) => setPay(p => ({ ...p, [e.target.name]: e.target.value }));

    const saveAll = () => {
        const draft = saveDraft({ payment: pay });
        // هنا تقدر تبعت الداتا للـ API
        console.log("FULL ORDER DRAFT:", draft);
        clearDraft();
        nav(ROUTES.orders); // رجوع لقائمة الأوردرات
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
                Add New Order - Payment & Shipping INFO.
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <select name="method" value={pay.method} onChange={onChange}
                    className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px]">
                    <option value="" hidden>Payment Method</option>
                    <option>Cash</option><option>Vodafone Cash</option><option>Card</option>
                </select>
                <select name="company" value={pay.company} onChange={onChange}
                    className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px]">
                    <option value="" hidden>Shipping Company</option>
                    <option>Aramex</option><option>Mylerz</option><option>Other</option>
                </select>
                <input name="discount" value={pay.discount} onChange={onChange} placeholder="Discount"
                    className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px]" />

                <input name="fee" value={pay.fee} onChange={onChange} placeholder="Payment Fee."
                    className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px]" />
                <input name="shipCost" value={pay.shipCost} onChange={onChange} placeholder="Shipping coast"
                    className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px]" />
                <input name="shipFee" value={pay.shipFee} onChange={onChange} placeholder="Shipping Fee."
                    className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px]" />

                <input name="total" value={pay.total} onChange={onChange} placeholder="Total Order"
                    className="md:col-span-2 h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px]" />
                <input name="net" value={pay.net} onChange={onChange} placeholder="Net of Order"
                    className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-[15px]" />
            </div>

            <div className="mt-10 flex w-full justify-between">
                <button onClick={() => nav(ROUTES.ordersNewItems)}
                    className="rounded-full bg-black px-7 py-3 text-xl font-extrabold text-[var(--amber)] shadow">← Back</button>
                <button onClick={saveAll}
                    className="rounded-full bg-black px-7 py-3 text-xl font-extrabold text-[var(--amber)] shadow">💾 Save</button>
            </div>
        </section>
    );
}
