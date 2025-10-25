import React, { useState } from "react";
import { createProduct } from "../../api/apiClient";

export default function NewProductPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    sku: "",
    colors: [],
    sizes: "M , L , XL , XXL",
    cost: "",
    price: "",
    minAlert: "",
    totalQty: "",
    sizeQty: { M: "10", L: "10", XL: "10", XXL: "10" },
  });

  const toggleColor = (c) =>
    setForm((f) => {
      const next = new Set(f.colors);
      next.has(c) ? next.delete(c) : next.add(c);
      return { ...f, colors: Array.from(next) };
    });

  const change = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      brandId: 1,
      name: form.name,
      category: form.category,
      sku: form.sku,
      colors: form.colors,
      sizes: form.sizes.split(",").map((s) => s.trim()),
      costPrice: parseFloat(form.cost),
      sellingPrice: parseFloat(form.price),
      minimumStock: parseInt(form.minAlert),
      totalQuantity: parseInt(form.totalQty),
    };

    try {
      const data = await createProduct(payload);
      alert("✅ Product created successfully!");
      console.log("Server response:", data);
    } catch (err) {
      console.error("❌ Error creating product:", err);
      alert("Error creating product. Check console for details.");
    }
  };

  const palette = [
    { hex: "#b91c1c", name: "Red" },
    { hex: "#111827", name: "Black" },
    { hex: "#2563eb", name: "Blue" },
    { hex: "#10b981", name: "Green" },
    { hex: "#6b7280", name: "Gray" },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl rounded-[36px] bg-white p-6 sm:p-10 lg:p-12 shadow-[0_25px_45px_rgba(0,0,0,0.08)] ring-1 ring-black/5 relative">
      <h2 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
        Add Product.
      </h2>

      <form onSubmit={submit} className="space-y-3">
        <SectionTitle>Product INFO.</SectionTitle>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <Field label="Product Name">
            <input
              name="name"
              value={form.name}
              onChange={change}
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
          </Field>

          <Field label="Product Category">
            <div className="relative">
              <select
                name="category"
                value={form.category}
                onChange={change}
                className="h-12 w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 pr-10 text-[15px] outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              >
                <option value="" disabled hidden>
                  Select…
                </option>
                <option>T-Shirt</option>
                <option>Hoodie</option>
                <option>Sweatpants</option>
                <option>Polo</option>
              </select>
              <Caret />
            </div>
          </Field>

          <Field label="Product Code // SKU">
            <input
              name="sku"
              value={form.sku}
              onChange={change}
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
          </Field>

          {/* Color Selector */}
          <Field className="md:col-span-2" label="Color">
            <div className="relative">
              <div className="flex h-12 items-center gap-3 overflow-x-auto rounded-xl border border-gray-300 bg-white px-4 text-[15px]">
                {palette.map((c) => {
                  const active = form.colors.includes(c.hex);
                  return (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => toggleColor(c.hex)}
                      className={[
                        "h-7 w-7 shrink-0 rounded-full ring-2 transition",
                        active ? "ring-black" : "ring-transparent",
                      ].join(" ")}
                      style={{ background: c.hex }}
                      title={c.name}
                      aria-pressed={active}
                    />
                  );
                })}
              </div>
              <Caret />
            </div>
            {form.colors.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {form.colors.map((hex) => (
                  <span
                    key={hex}
                    className="rounded-full border px-3 py-1 text-xs font-bold"
                  >
                    {hex}
                  </span>
                ))}
              </div>
            )}
          </Field>

          <Field label="Sizes">
            <input
              name="sizes"
              value={form.sizes}
              onChange={change}
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
          </Field>
        </div>

        <Divider />

        <SectionTitle>Pricing & Stock.</SectionTitle>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="Cost Price.">
            <input
              name="cost"
              value={form.cost}
              onChange={change}
              inputMode="numeric"
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
          </Field>
          <Field label="Selling Price.">
            <input
              name="price"
              value={form.price}
              onChange={change}
              inputMode="numeric"
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
          </Field>
        </div>

        <Divider />

        <SectionTitle>Size Quantity.</SectionTitle>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 p-4">
            <div className="mb-3 text-lg font-extrabold">Sizes</div>
            <div className="divide-y">
              {["M", "L", "XL", "XXL"].map((s) => (
                <div
                  key={s}
                  className="grid grid-cols-3 items-center gap-3 py-2"
                >
                  <div className="col-span-1 text-sm font-bold">{s}</div>
                  <input
                    value={form.sizeQty[s]}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        sizeQty: { ...f.sizeQty, [s]: e.target.value },
                      }))
                    }
                    className="col-span-2 h-10 rounded-lg border border-gray-300 bg-white px-3 text-[15px] outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Field label="Minimum Stock Alert.">
              <input
                name="minAlert"
                value={form.minAlert}
                onChange={change}
                inputMode="numeric"
                className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              />
            </Field>
            <Field label="Total Quantity.">
              <input
                name="totalQty"
                value={form.totalQty}
                onChange={change}
                inputMode="numeric"
                className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              />
            </Field>
          </div>
        </div>

        <div className="mt-2 flex w-full justify-end">
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

/* ====== helpers ====== */
function SectionTitle({ children }) {
  return <h3 className="text-xl font-extrabold text-[#0f172a]">{children}</h3>;
}

function Divider() {
  return <hr className="my-2 border-t border-gray-200" />;
}

function Field({ label, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-bold text-gray-700">{label}</label>
      {children}
    </div>
  );
}

function Caret() {
  return (
    <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-gray-700">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </span>
  );
}
