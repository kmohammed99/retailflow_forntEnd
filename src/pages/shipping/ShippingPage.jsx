import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/app/routes/routePaths";
import { Search, Plus, Pencil, Edit2 } from "lucide-react";

/** داتا تجريبية */
const companies = [
    {
        id: "aramex",
        name: "Aramex",
        stats: { cities: 27, avgFee: 55, cod: 3 },
        rows: [
            { gov: "Cairo", price: 45 },
            { gov: "Giza", price: 50 },
            { gov: "ALEX", price: 50 },
            { gov: "Fayoum", price: 50 },
            { gov: "Suez", price: 70 },
        ],
    },
    {
        id: "bosta",
        name: "Bosta",
        stats: { cities: 27, avgFee: 60, cod: 3 },
        rows: [
            { gov: "Cairo", price: 45 },
            { gov: "Giza", price: 50 },
            { gov: "ALEX", price: 50 },
            { gov: "Fayoum", price: 50 },
            { gov: "Suez", price: 70 },
        ],
    },
];

export default function ShippingPage() {
    return (
        <section className="space-y-6">
            {/* العنوان + البحث + زر إضافة شركة */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-extrabold tracking-tight">Shipping Management.</h1>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-[520px]">
                        <input
                            className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                            placeholder="Search by government or Company"
                        />
                        <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-500">
                            <Search size={18} />
                        </span>
                    </div>

                    <NavLink
                        to={ROUTES.shippingNew || "/shipping/new"}
                        className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 font-semibold 
             text-white hover:text-white visited:text-white active:text-white no-underline !text-white shadow
             hover:brightness-110"
                    >
                        <Plus size={18} /> Add Shipping Company
                    </NavLink>
                </div>
            </div>

            {/* بطاقات الشركات السريعة */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {companies.map((c) => (
                    <CompanyCard key={c.id} company={c} />
                ))}
            </div>

            <hr className="border-gray-200" />

            {/* جداول المدن لكل شركة */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {companies.map((c) => (
                    <div key={c.id}>
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-2xl font-extrabold tracking-tight">{c.name}</h2>
                            <button className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold shadow-[0_4px_12px_rgba(0,0,0,.06)] hover:bg-gray-50">
                                <Plus size={16} /> Add City
                            </button>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="grid grid-cols-12 gap-3 border-b bg-gray-200 px-4 py-3 text-sm font-bold">
                                <div className="col-span-8">Government</div>
                                <div className="col-span-3">Price</div>
                                <div className="col-span-1 text-right">Edit</div>
                            </div>

                            {c.rows.map((r, i) => (
                                <div key={i} className="grid grid-cols-12 items-center gap-3 border-t px-4 py-3 text-sm">
                                    <div className="col-span-8">{r.gov}</div>
                                    <div className="col-span-3">{r.price}</div>
                                    <div className="col-span-1 flex items-center justify-end">
                                        <button className="rounded-lg border px-2 py-1 hover:bg-gray-50" title="Edit">
                                            <Pencil size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* حفظ */}
            <div className="flex w-full justify-end">
                <button className="inline-flex items-center gap-3 rounded-full bg-[#111] px-7 py-3 text-xl font-extrabold text-[var(--amber)] shadow hover:brightness-110">
                    Save <span>💾</span>
                </button>
            </div>
        </section>
    );
}

/* ====== Helpers ====== */

function CompanyCard({ company }) {
    const { name, stats } = company;
    return (
        <div className="relative rounded-2xl bg-white p-5 shadow-[0_8px_28px_rgba(0,0,0,.08)] ring-1 ring-slate-200">
            <div className="mb-2 text-center text-2xl font-extrabold">{name}</div>
            <div className="space-y-1 text-[15px] font-semibold text-gray-600">
                <div> Total Covered Cities : <b>{stats.cities}</b></div>
                <div> Average Delivery Fee : <b>{stats.avgFee} EGP</b></div>
                <div> COD Fee : <b>{stats.cod} %</b></div>
            </div>
            <div className="mt-4 flex justify-end">
                <button className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold shadow-[0_4px_12px_rgba(0,0,0,.06)] hover:bg-gray-50">
                    <Edit2 size={16} /> Edit Details
                </button>
            </div>
            {/* خط سفلي بسيط */}
            <div className="pointer-events-none absolute bottom-0 left-4 right-4 h-[1px] rounded-full bg-[#dcbc0f]" />
        </div>
    );
}
