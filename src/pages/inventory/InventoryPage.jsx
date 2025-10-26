import React, { useState, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import {
  Search, Package, CheckCircle2, AlertTriangle, XOctagon,
  CircleDollarSign, Eye, Pencil, Trash2, Save, X
} from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// ✅ عدّل المسار حسب مكان الملف
import {
  getAllProducts,
  updateProduct,
  deleteProduct as apiDeleteProduct,
} from "../../api/products"; // لو الملف تحت src/pages/ استخدم "../api/products"

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const statuses = ["All", "In Stock", "Low Stock", "Out of Stock"];

  // ===== Fetch & map =====
  const fetchAndSet = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts(); // بيعمل unwrap لو ResponseTransaction
      const mapped = (data || []).map((p) => ({
        id: p.id,
        code: p.sku,
        name: p.name,
        qty: p.totalQuantity ?? 0,
        totalSell: p.totalSell ?? 0,
        category: p.category ?? "—",
        price: p.sellingPrice ?? 0,
        brandId: p.brandId ?? null,
        status:
          (p.totalQuantity ?? 0) === 0
            ? "Out of Stock"
            : (p.totalQuantity ?? 0) < (p.minimumStock ?? 5)
              ? "Low Stock"
              : "In Stock",
      }));
      setProducts(mapped);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSet();
  }, []);

  const filteredProducts = useMemo(
    () => (filter === "All" ? products : products.filter((x) => x.status === filter)),
    [products, filter]
  );

  const openView = (p) => { setSelected(p); setMode("view"); };
  const openEdit = (p) => { setSelected(p); setMode("edit"); };
  const closePopup = () => { setSelected(null); setMode(null); };

  // ====== Save (PUT) + refresh ======
  const handleSave = async () => {
    if (!selected) return;
    try {
      console.log("✅ handleSave clicked");
      const payload = {
        id: selected.id,
        brandId: selected.brandId ?? 2,      // مؤقتًا
        name: selected.name,
        category: selected.category || "General",
        code: String(selected.code),         // هتتترجم لـ sku في API layer
        price: parseFloat(selected.price) || 0,
        qty: parseInt(selected.qty) || 0,
      };
      console.log("🚀 Sending update payload:", payload);

      await updateProduct(selected.id, payload);
      await fetchAndSet();                   // ✅ تحديث الجدول بالكامل
      toast.success("✅ Product updated successfully!", {
        style: { borderRadius: "10px", background: "#111", color: "#fff" },
      });
      closePopup();
    } catch (err) {
      console.error("❌ Update failed:", err);
      toast.error("❌ Failed to update product", {
        style: { borderRadius: "10px", background: "#111", color: "#fff" },
      });
    }
  };

  // ===== Delete (API + refresh) =====
  const handleDelete = (id) => {
    toast((t) => (
      <div>
        <p className="font-semibold mb-2">Delete this product?</p>
        <div className="flex gap-3">
          <button
            onClick={async () => {
              try {
                await apiDeleteProduct(id);
                await fetchAndSet(); // ✅ تحديث الجدول
                toast.dismiss(t.id);
                toast.success("🗑️ Product deleted!", {
                  style: { borderRadius: "10px", background: "#111", color: "#fff" },
                });
              } catch (err) {
                console.error(err);
                toast.error("Failed to delete", {
                  style: { borderRadius: "10px", background: "#111", color: "#fff" },
                });
              }
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Inventory.</h1>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-[520px]">
            <input
              className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Search by Product name, Code, or Category"
            // TODO: hook up client-side search
            />
            <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-500">
              <Search size={18} />
            </span>
          </div>
          <NavLink
            to="/inventory/new"
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 font-semibold text-white shadow hover:brightness-110"
          >
            ＋ Add Product
          </NavLink>
        </div>
      </div>

      {/* ===== Stats ===== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <StatCard icon={<Package className="h-5 w-5" />} label="Total Products" value={products.length} tone="amber" />
        <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="In Stock" value={products.filter(p => p.status === "In Stock").length} tone="indigo" />
        <StatCard icon={<AlertTriangle className="h-5 w-5" />} label="Low Stock" value={products.filter(p => p.status === "Low Stock").length} tone="blue" />
        <StatCard icon={<XOctagon className="h-5 w-5" />} label="Out of Stock" value={products.filter(p => p.status === "Out of Stock").length} tone="red" />
        <StatCard
          icon={<CircleDollarSign className="h-5 w-5" />}
          label="Total Value"
          value={products.reduce((sum, p) => sum + ((parseFloat(p.price) || 0) * (parseInt(p.qty) || 0)), 0)}
          tone="green"
        />
      </div>

      {/* ===== Table ===== */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-3 border-b bg-gray-200 px-4 py-3 text-sm font-bold">
          <div className="col-span-1">Image</div>
          <div className="col-span-1">Code</div>
          <div className="col-span-3">Product Name</div>
          <div className="col-span-1 text-right">Quantity</div>
          <div className="col-span-1 text-right">Total Sell</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-1 text-right">Price</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No products found.</div>
        ) : (
          filteredProducts.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-12 items-center gap-3 border-t px-4 py-3 text-sm"
            >
              <div className="col-span-1"><img src={p.img} className="h-11 w-11 rounded-md object-cover" /></div>
              <div className="col-span-1">{p.code}</div>
              <div className="col-span-3">{p.name}</div>
              <div className="col-span-1 text-right">{p.qty}</div>
              <div className="col-span-1 text-right">{p.totalSell}</div>
              <div className="col-span-2">{p.category}</div>
              <div className="col-span-1 text-right">{p.price}</div>
              <div className="col-span-1"><StockPill status={p.status} /></div>
              <div className="col-span-1 flex items-center justify-end gap-2">
                <button onClick={() => openView(p)} className="rounded-lg border px-2 py-1 hover:bg-gray-50" title="View"><Eye size={16} /></button>
                <button onClick={() => openEdit(p)} className="rounded-lg border px-2 py-1 hover:bg-gray-50" title="Edit"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(p.id)} className="rounded-lg border px-2 py-1 hover:bg-gray-50" title="Delete"><Trash2 size={16} /></button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* ===== Popups ===== */}
      <AnimatePresence>
        {mode && selected && (
          <Popup
            title={mode === "view" ? `View Product: ${selected.name}` : `Edit Product: ${selected.name}`}
            onClose={closePopup}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              {["name", "code", "category", "qty", "totalSell", "price", "status"].map((f) => (
                <Field key={f} label={f} mode={mode} selected={selected} setSelected={setSelected} />
              ))}
            </div>

            {mode === "edit" && (
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={closePopup}
                  className="rounded-full border border-gray-300 px-6 py-2 font-semibold hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2 font-semibold text-white shadow hover:brightness-110"
                >
                  <Save size={18} /> Save
                </button>
              </div>
            )}
          </Popup>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ===== Components ===== */
function Popup({ title, onClose, children }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-[95%] max-w-3xl rounded-2xl bg-white p-8 shadow ring-1 ring-slate-200 overflow-y-auto max-h-[90vh]"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold">{title}</h2>
          <button onClick={onClose} className="rounded-full border border-gray-300 p-2 hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function Field({ label, mode, selected, setSelected, isSelect = false }) {
  const name = label;
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-600 mb-1">
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      {mode === "view" ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2">{selected[name]}</div>
      ) : isSelect ? (
        <select
          value={selected[name]}
          onChange={(e) => setSelected({ ...selected, [name]: e.target.value })}
          className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-gray-200"
        >
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
      ) : (
        <input
          type={["qty", "totalSell", "price"].includes(name) ? "number" : "text"}
          value={selected[name]}
          onChange={(e) => setSelected({ ...selected, [name]: e.target.value })}
          className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-gray-200"
        />
      )}
    </div>
  );
}

function StatCard({ icon, label, value, tone = "amber" }) {
  const tones = {
    amber: { ring: "ring-slate-200", stripe: "#dcbc0f" },
    indigo: { ring: "ring-indigo-200", stripe: "#6aa1ff" },
    blue: { ring: "ring-sky-200", stripe: "#6aa1ff" },
    red: { ring: "ring-rose-200", stripe: "#fb7185" },
    green: { ring: "ring-green-200", stripe: "#34d399" },
  };
  const t = tones[tone];
  return (
    <div className={`relative rounded-2xl bg-white p-5 shadow ring-1 ${t.ring}`}>
      <div className="flex items-center gap-4">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-black text-[var(--amber)] shadow">{icon}</div>
        <div>
          <div className="text-[16px] font-bold text-gray-600">{label}</div>
          <div className="truncate text-2xl font-bold text-[#0f172a]">{value}</div>
        </div>
      </div>
      <div className="absolute bottom-0 left-4 right-4 h-[1px]" style={{ background: t.stripe }} />
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
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${map[status] || "bg-gray-200 text-gray-800"}`}>
      {status}
    </span>
  );
}
