import React from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/app/routes/routePaths";
import {
  Search,
  Package,
  CheckCircle2,
  AlertTriangle,
  XOctagon,
  CircleDollarSign,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

/** Fake table data */
const rows = Array.from({ length: 10 }).map((_, i) => ({
  img: "https://via.placeholder.com/44x44",
  code: String(1000 + i),
  name: "Dibo Palms",
  qty: [12, 4, 0, 18, 9][i % 5],
  totalSell: [20, 4, 15, 8, 12][i % 5],
  category: ["T-Shirt", "Suit", "Hoodie", "Sweatpants", "Polo"][i % 5],
  price: "1200 L.E",
  status: ["In Stock", "Low Stock", "Out of Stock"][i % 3],
}));

export default function InventoryPage() {
  return (
    <section className="space-y-6">
      {/* Title + Search + Add */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Inventory.</h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-[520px]">
            <input
              className="h-11 w-full rounded-xl border border-black-1000 bg-white pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              placeholder="Search by Product name, Code, or Category"
            />
            <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-500">
              <Search size={18} />
            </span>
          </div>

          {/* Add Product button (black bg, white text) */}
          <NavLink
            to={ROUTES.inventoryNew || "/inventory/new"}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 font-semibold 
             text-white hover:text-white visited:text-white active:text-white no-underline !text-white shadow
             hover:brightness-110"
          >
            <span className="text-lg">＋</span> Add Product
          </NavLink>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <StatCard icon={<Package className="h-5 w-5" />} label="Total Product" value="124" tone="amber" />
        <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="In Stock" value="97" tone="indigo" />
        <StatCard icon={<AlertTriangle className="h-5 w-5" />} label="Low Stock" value="18" tone="blue" />
        <StatCard icon={<XOctagon className="h-5 w-5" />} label="Out of Stock" value="9" tone="red" />
        <StatCard icon={<CircleDollarSign className="h-5 w-5" />} label="Total Inventory Value" value="178,250" tone="green" />
      </div>

      {/* Status Filter */}
      <div>
        <div className="mb-2 text-sm font-semibold">Status Filter.</div>
        <div className="flex flex-wrap gap-3">
          {["In Stock", "Low Stock", "Out of Stock"].map((s) => (
            <button
              key={s}
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold shadow-[0_4px_12px_rgba(0,0,0,.06)] hover:bg-gray-50"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-3 border-b bg-gray-200 px-4 py-3 text-sm font-bold">
          <div className="col-span-1">Image</div>
          <div className="col-span-1">Code</div>
          <div className="col-span-3">Product Name</div>
          <div className="col-span-1 text-right">Quantity</div>
          <div className="col-span-1 text-right">Total Sell</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-1">Price</div>
          <div className="col-span-1">Order Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {rows.map((r, idx) => (
          <div key={idx} className="grid grid-cols-12 items-center gap-3 border-t px-4 py-3 text-sm">
            <div className="col-span-1">
              <img src={r.img} className="h-11 w-11 rounded-md object-cover" />
            </div>
            <div className="col-span-1">{r.code}</div>
            <div className="col-span-3">{r.name}</div>
            <div className="col-span-1 text-right">{r.qty}</div>
            <div className="col-span-1 text-right">{r.totalSell}</div>
            <div className="col-span-2">{r.category}</div>
            <div className="col-span-1">{r.price}</div>
            <div className="col-span-1">
              <StockPill status={r.status} />
            </div>
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

/* --- helpers (same file) --- */
function StatCard({ icon, label, value, tone = "amber" }) {
  const tones = {
    amber: { ring: "ring-slate-200", stripe: "#dcbc0f" },
    indigo: { ring: "ring-indigo-200", stripe: "#6aa1ff" },
    blue: { ring: "ring-sky-200", stripe: "#6aa1ff" },
    red: { ring: "ring-rose-200", stripe: "#fb7185" },
    green: { ring: "ring-green-200", stripe: "#34d399" },
  };
  const t = tones[tone] || tones.amber;

  return (
    <div className={["relative rounded-2xl bg-white p-5 shadow-[0_8px_28px_rgba(0,0,0,.08)] ring-1", t.ring].join(" ")}>
      <div className="flex items-center gap-4">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-black text-[var(--amber)] shadow-[0_8px_16px_rgba(0,0,0,.25)]">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-[16px] font-bold text-gray-600">{label}</div>
          <div className="truncate text-2xl font-bold text-[#0f172a]">{value}</div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-4 right-4 h-[1px] rounded-full"
        style={{ background: t.stripe }}
      />
    </div>
  );
}

function StockPill({ status }) {
  const map = {
    "In Stock": "bg-emerald-100 text-emerald-700",
    "Low Stock": "bg-amber-100 text-amber-700",
    "Out of Stock": "bg-rose-100 text-rose-700",
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${map[status] || "bg-gray-200 text-gray-800"
        }`}
    >
      {status}
    </span>
  );
}
