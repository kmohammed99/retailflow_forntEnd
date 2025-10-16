// src/pages/orders/OrdersListPage.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/app/routes/routePaths";
import { Eye, Trash2, Clock3, CheckCircle2, CalendarDays, ShoppingBag } from "lucide-react";
import ShopifyIcon from "@/assets/icons/Shopify.svg?react";

/* بيانات تجريبية للجدول */
const rows = Array.from({ length: 9 }).map((_, i) => ({
    id: `#${1033 + i}`,
    date: "20-3-2025",
    customer: "Mohamed",
    qty: 4,
    total: "1200 L.E",
    status: ["Delivered", "In Progress", "Pending", "Returned", "Canceled"][i % 5],
}));

export default function OrdersListPage() {
    return (
        <section className="space-y-6">
            {/* ====== العنوان + بحث + زر إضافة ====== */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-extrabold tracking-tight">Orders.</h1>

                <div className="flex w-full items-center gap-3 md:w-auto">
                    {/* Search */}
                    <div className="relative w-full md:w-[420px]">
                        <input
                            className="h-11 w-full rounded-xl border border-gray-1000 bg-white pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                            placeholder="Search by Order ID, Customer, or Phone"
                        />
                        <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-500">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10 18a8 8 0 1 1 5.292-14.01L21 9.7l-1.4 1.4-4.3-4.3A8 8 0 0 1 10 18z" />
                            </svg>
                        </span>
                    </div>

                    {/* Add Order */}
                    <NavLink
                        to={ROUTES.ordersNew}
                        className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 font-semibold 
             text-white hover:text-white visited:text-white active:text-white no-underline !text-white shadow
             hover:brightness-110"
                    >
                        <span className="text-lg">＋</span>
                        Add Order
                    </NavLink>

                </div>
            </div>

            {/* ====== الكروت الإحصائية ====== */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <StatCard icon={<ShoppingBag className="h-6 w-6" />} label="Total Orders" value="1,250" tone="amber" />
                <StatCard icon={<Clock3 className="h-6 w-6 text-[var(--amber)]" />} label="Pending Orders" value="22" tone="indigo" />
                <StatCard icon={<CheckCircle2 className="h-6 w-6 text-[var(--amber)]" />} label="Delivered Orders" value="934" tone="green" />
            </div>

            {/* ====== فلاتر التاريخ + الستاتس ====== */}
            <FiltersBar />

            {/* ====== الجدول ====== */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="grid grid-cols-12 gap-3 border-b bg-gray-200 px-4 py-3 text-sm font-bold">
                    <div className="col-span-2">Order ID</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-3">Customer Name</div>
                    <div className="col-span-1 text-right">Qty</div>
                    <div className="col-span-2">Total Amount</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                {rows.map((r, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-3 border-t px-4 py-3 text-sm">
                        <div className="col-span-2">{r.id}</div>
                        <div className="col-span-2">{r.date}</div>
                        <div className="col-span-3">{r.customer}</div>
                        <div className="col-span-1 text-right">{r.qty}</div>
                        <div className="col-span-2">{r.total}</div>
                        <div className="col-span-1">
                            <StatusPill status={r.status} />
                        </div>
                        <div className="col-span-1 flex items-center justify-end gap-2">
                            <button className="rounded-lg border px-2 py-1 hover:bg-gray-50" title="View">
                                <Eye size={16} />
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

/* ========= FiltersBar (التاريخ + Status Filter) ========= */
function FiltersBar() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const statuses = ["Pending", "In Progress", "Delivered", "Returned", "Canceled"];
    const [active, setActive] = useState("Pending");

    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Date Range box (زي الصورة: أيقونة + from/to) */}
            <div>
                <div className="mb-2 text-sm font-bold">Optional Summary.</div>

                <div className="relative flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-2 shadow-[0_6px_20px_rgba(0,0,0,.06)]">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#111] text-[var(--amber)]">
                        <CalendarDays size={18} />
                    </span>

                    <input
                        type="date"
                        aria-label="From"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="h-11 flex-1 rounded-xl border border-gray-200 bg-white px-3 text-[15px] outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-200"
                    />

                    <span className="select-none px-1 text-gray-400">—</span>

                    <input
                        type="date"
                        aria-label="To"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="h-11 flex-1 rounded-xl border border-gray-200 bg-white px-3 text-[15px] outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-200"
                    />
                </div>
            </div>

            {/* Status Filter pills */}
            <div>
                <div className="mb-2 text-sm font-bold">Status Filter.</div>
                <div className="flex flex-wrap gap-3">
                    {statuses.map((s) => {
                        const isActive = s === active;
                        return (
                            <button
                                key={s}
                                onClick={() => setActive(s)}
                                className={[
                                    "rounded-full px-4 py-2 text-sm font-semibold transition",
                                    "shadow-[0_4px_12px_rgba(0,0,0,.06)]",
                                    isActive
                                        ? "bg-[#111] text-white"
                                        : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50",
                                ].join(" ")}
                            >
                                {s}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

/* ========= StatCard (ظل خفيف + stripe سفلي) ========= */
function StatCard({ icon, label, value, tone = "amber" }) {
    const tones = {
        amber: { ring: "ring-slate-200", stripe: "linear-gradient(90deg,#dcbc0f,#dcbc0f)" },
        indigo: { ring: "ring-indigo-200", stripe: "linear-gradient(90deg,#6aa1ff,#6aa1ff)" },
        green: { ring: "ring-green-200", stripe: "linear-gradient(90deg,#34d399,#34d399)" },
    };
    const t = tones[tone] ?? tones.amber;

    return (
        <div className={`relative rounded-[18px] bg-white p-5 md:p-6 shadow-[0_10px_22px_rgba(0,0,0,.10)] ring-1 ${t.ring}`}>
            {/* stripe سفلي رفيع */}
            <div className="pointer-events-none absolute bottom-0 left-4 right-4 h-[1px] rounded-full" style={{ background: t.stripe }} />

            <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-black text-[var(--amber)] shadow-[0_8px_16px_rgba(0,0,0,.20)]">
                    {icon}
                </div>
                <div className="min-w-0">
                    <div className="text-[15px] font-bold text-gray-600">{label}</div>
                    <div className="truncate text-[26px] font-bold leading-tight text-[#0f172a]">{value}</div>
                </div>
            </div>
        </div>
    );
}

/* ========= Status Pill داخل الجدول ========= */
function StatusPill({ status }) {
    const map = {
        Pending: "bg-gray-200 text-gray-800",
        "In Progress": "bg-blue-100 text-blue-700",
        Delivered: "bg-green-100 text-green-700",
        Returned: "bg-red-100 text-red-700",
        Canceled: "bg-zinc-200 text-zinc-700",
    };
    return (
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${map[status] || "bg-gray-200 text-gray-800"}`}>
            {status}
        </span>
    );
}
