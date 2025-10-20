// src/pages/settings/SettingsPage.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";
/** شوية كلاسات مشتركة علشان نحافظ على شكل الفورم */
const inputCls =
    "h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200";
const cardCls =
    "rounded-2xl bg-white p-5 md:p-6 shadow-[0_12px_28px_rgba(0,0,0,.08)] ring-1 ring-black/5";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        // Company
        companyName: "",
        legalName: "",
        phone: "",
        email: "",
        address: "",
        currency: "EGP",

        // Branding
        primary: "#dcbc0f", // نفس لون --amber
        secondary:"#26272a",
        darkMode: false,
        compactSidebar: false,

        // Orders
        orderPrefix: "DD-",
        defaultGov: "",
        defaultShipping: "",
        codPercent: "3",
        requirePhone: true,
        requireEmail: false,

        // Inventory
        lowStock: "10",
        enableVariants: true,
        defaultSizes: "M, L, XL, XXL",

        // Expenses
        expenseCats: ["Rent", "Salaries", "Utilities"],
        supplierName: ["Meta", "cotton candy", "Logo Store"],
        payMethods: ["Cash", "Card", "Wallet"],

        // Notifications
        notifLowStock: true,
        notifOrderStatus: true,
        dailySummary: false,
        summaryTime: "09:00",

        // Security
        twoFA: false,
    });

    const update = (k, v) => setSettings((s) => ({ ...s, [k]: v }));

    const addToList = (k, value) => {
        if (!value) return;
        setSettings((s) => ({ ...s, [k]: [...new Set([...(s[k] || []), value])] }));
    };
    const removeFromList = (k, value) => {
        setSettings((s) => ({ ...s, [k]: (s[k] || []).filter((x) => x !== value) }));
    };

    const submit = (e) => {
        e.preventDefault();
        console.log("SAVE SETTINGS:", settings);
        toast.success("✅ Settings saved successfully");
    };

    return (
        <section className="space-y-6">
            {/* عنوان الصفحة */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold tracking-tight">Settings.</h1>
                <button
                    onClick={submit}
                    className="rounded-full bg-[#111] px-6 py-3 text-lg font-extrabold text-[var(--amber)] shadow hover:brightness-110"
                >
                    Save
                </button>
            </div>

            {/* ========== Company Profile ========== */}
            <Section title="Company Profile" hint="Basic business info used on invoices, emails, and reports.">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <Field label="Company Name">
                        <input className={inputCls} value={settings.companyName} onChange={(e) => update("companyName", e.target.value)} />
                    </Field>
                    {/* <Field label="Legal / Tax Name">
                        <input className={inputCls} value={settings.legalName} onChange={(e) => update("legalName", e.target.value)} />
                    </Field> */}
                    <Field label="Currency">
                        <select className={inputCls} value={settings.currency} onChange={(e) => update("currency", e.target.value)}>
                            <option>EGP</option>
                            <option>SAR</option>
                        </select>
                    </Field>

                    {/* <Field label="Phone">
                        <input className={inputCls} value={settings.phone} onChange={(e) => update("phone", e.target.value)} />
                    </Field>
                    <Field label="Email">
                        <input type="email" className={inputCls} value={settings.email} onChange={(e) => update("email", e.target.value)} />
                    </Field>
                    <Field label="Address" full>
                        <input className={inputCls} value={settings.address} onChange={(e) => update("address", e.target.value)} />
                    </Field> */}

                    <div className="md:col-span-2 lg:col-span-1">
                        <div className="text-sm font-semibold text-gray-700 mb-2">Logo</div>
                        <div className="flex items-center gap-4">
                            <div className="grid h-16 w-16 place-items-center rounded-xl bg-gray-100 ring-1 ring-gray-200 text-gray-400">
                                LOGO
                            </div>
                            <label className="inline-flex cursor-pointer items-center rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50">
                                Upload
                                <input type="file" accept="image/*" className="hidden" />
                            </label>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ========== Branding & UI ========== */}
            <Section title="Branding & UI" hint="Colors and layout preferences across the app.">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <Field label="Primary Color (accent)">
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                className="h-11 w-16 rounded-lg border border-gray-300"
                                value={settings.primary}
                                onChange={(e) => update("primary", e.target.value)}
                            />
                            <input className={inputCls} value={settings.primary} onChange={(e) => update("primary", e.target.value)} />
                        </div>
                    </Field>
                    <Field label="Secondary Color (accent)">
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                className="h-11 w-16 rounded-lg border border-gray-300"
                                value={settings.secondary}
                                onChange={(e) => update("Secondary", e.target.value)}
                            />
                            <input className={inputCls} value={settings.secondary} onChange={(e) => update("secondary", e.target.value)} />
                        </div>
                    </Field>
                    <Field label="Dark Mode">
                        <Toggle checked={settings.darkMode} onChange={(v) => update("darkMode", v)} />
                    </Field>
                    {/* <Field label="Compact Sidebar">
                        <Toggle checked={settings.compactSidebar} onChange={(v) => update("compactSidebar", v)} />
                    </Field> */}
                </div>
            </Section>

            {/* ========== Orders Preferences ========== */}
            <Section title="Orders Preferences" hint="Defaults and validation for new orders.">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <Field label="Order ID Prefix">
                        <input className={inputCls} value={settings.orderPrefix} onChange={(e) => update("orderPrefix", e.target.value)} />
                    </Field>
                    {/* <Field label="Default Government">
                        <select className={inputCls} value={settings.defaultGov} onChange={(e) => update("defaultGov", e.target.value)}>
                            <option value="">Select…</option>
                            <option>Cairo</option>
                            <option>Giza</option>
                            <option>Alexandria</option>
                            <option>Luxor</option>
                            <option>Aswan</option>
                        </select>
                    </Field> */}
                    <Field label="Default Shipping Company">
                        <select className={inputCls} value={settings.defaultShipping} onChange={(e) => update("defaultShipping", e.target.value)}>
                            <option value="">Select…</option>
                            <option>Aramex</option>
                            <option>Bosta</option>
                            <option>No Shipping</option>
                        </select>
                    </Field>

                    <Field label="COD Fee %">
                        <input className={inputCls} value={settings.codPercent} onChange={(e) => update("codPercent", e.target.value)} />
                    </Field>
                    <Field label="Require Phone Number">
                        <Toggle checked={settings.requirePhone} onChange={(v) => update("requirePhone", v)} />
                    </Field>
                    <Field label="Require Email">
                        <Toggle checked={settings.requireEmail} onChange={(v) => update("requireEmail", v)} />
                    </Field>
                </div>
            </Section>

            {/* ========== Inventory & Products ========== */}
            <Section title="Inventory & Products" hint="Thresholds and product attributes.">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <Field label="Low-Stock Threshold (default)">
                        <input className={inputCls} value={settings.lowStock} onChange={(e) => update("lowStock", e.target.value)} />
                    </Field>
                    <Field label="Enable Size/Color Variants">
                        <Toggle checked={settings.enableVariants} onChange={(v) => update("enableVariants", v)} />
                    </Field>
                    <Field label="Default Sizes">
                        <input className={inputCls} value={settings.defaultSizes} onChange={(e) => update("defaultSizes", e.target.value)} />
                    </Field>
                </div>
            </Section>

            {/* ========== Expenses Setup ========== */}
            <Section title="Expenses Setup" hint="Manage expense categories and payment methods for quick entry.">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <ListEditor
                        label="Expense Categories"
                        items={settings.expenseCats}
                        placeholder="Add category"
                        onAdd={(v) => addToList("expenseCats", v)}
                        onRemove={(v) => removeFromList("expenseCats", v)}
                    />
                    <ListEditor
                        label="Payment Methods"
                        items={settings.payMethods}
                        placeholder="Add method"
                        onAdd={(v) => addToList("payMethods", v)}
                        onRemove={(v) => removeFromList("payMethods", v)}
                    />
                    <ListEditor
                        label="Supplier Name"
                        items={settings.supplierName}
                        placeholder="Add Supplier Name"
                        onAdd={(v) => addToList("supplierName", v)}
                        onRemove={(v) => removeFromList("supplierName", v)}
                    />
                </div>
            </Section>

            {/* ========== Notifications ========== */}
            <Section title="Notifications" hint="Choose what you’d like to be notified about.">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <Field label="Low-Stock Alerts">
                        <Toggle checked={settings.notifLowStock} onChange={(v) => update("notifLowStock", v)} />
                    </Field>
                    
                   <Field label="Order Status Updates">
                        <Toggle checked={settings.notifOrderStatus} onChange={(v) => update("notifOrderStatus", v)} />
                   </Field>
                </div>
            </Section>

            {/* ========== Users & Roles (بسيطة) ========== */}
            <Section title="Users & Roles" hint="Quick overview. (Demo static list)">
                <div className={`${cardCls} !p-0 overflow-hidden`}>

                <div className="grid grid-cols-12 gap-3 border-b bg-gray-50 px-4 py-3 text-sm font-semibold">
                    <div className="col-span-4">Name</div>
                    <div className="col-span-4">Email</div>
                    <div className="col-span-3">Role</div>
                    <div className="col-span-1 text-right">—</div>
                </div>
                {[
                    { name: "Admin User", email: "admin@example.com", role: "Admin" },
                    { name: "Store Manager", email: "manager@example.com", role: "Manager" },
                ].map((u, i) => (
                    <div key={i} className="grid grid-cols-12 items-center gap-3 border-t px-4 py-3 text-sm">
                        <div className="col-span-4">{u.name}</div>
                        <div className="col-span-4">{u.email}</div>
                        <div className="col-span-3">
                            <select className="h-9 w-full rounded-lg border border-gray-300 px-2">
                                {["Admin", "Manager", "Picker", "Viewer"].map((r) => (
                                    <option key={r} selected={r === u.role}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1 text-right">
                            <button className="rounded-lg border px-2 py-1 hover:bg-gray-50">⋯</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <button className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50">
                    + Add User
                </button>
            </div>
        </Section>

      {/* ========== Data ========== */ }
    <Section title="Data: Import & Export" hint="Backup or move your data. (Demo actions)">
        <div className="flex flex-wrap items-center gap-3">
            <button className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50">
                Export Orders CSV
            </button>
            <button className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50">
                Export Inventory CSV
            </button>
            <label className="inline-flex cursor-pointer items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50">
                Import CSV
                <input type="file" accept=".csv" className="hidden" />
            </label>
        </div>
    </Section>

    {/* ========== Security ========== */ }
    <Section title="Security" hint="Protect your account.">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Field label="Current Password">
                <input type="password" className={inputCls} />
            </Field>
            <Field label="New Password">
                <input type="password" className={inputCls} />
            </Field>
            <Field label="Two-Factor Authentication">
                <Toggle checked={settings.twoFA} onChange={(v) => update("twoFA", v)} />
            </Field>
        </div>
        <div className="mt-5">
            <button className="rounded-full bg-[#111] px-6 py-3 text-lg font-extrabold text-[var(--amber)] shadow hover:brightness-110">
                Update Password
            </button>
        </div>
    </Section>

    {/* زرار حفظ تحت كمان لو حابب */ }
    <div className="flex w-full justify-end">
        <button
            onClick={submit}
            className="rounded-full bg-[#111] px-6 py-3 text-lg font-extrabold text-[var(--amber)] shadow hover:brightness-110"
        >
            Save
        </button>
    </div>
    </section >
  );
}

/* ====== Helpers (نفس الملف) ====== */
function Section({ title, hint, children }) {
    return (
        <div className={cardCls}>
            <div className="mb-4">
                <div className="text-xl font-extrabold">{title}</div>
                {hint && <div className="text-sm text-gray-600">{hint}</div>}
            </div>
            <div className="space-y-4">{children}</div>
        </div>
    );
}

function Field({ label, children, full = false }) {
    return (
        <div className={full ? "md:col-span-2 lg:col-span-3" : ""}>
            <div className="mb-2 text-sm font-semibold text-gray-700">{label}</div>
            {children}
        </div>
    );
}

function Toggle({ checked, onChange }) {
    return (
        <button
            type="button"
            aria-pressed={checked}
            onClick={() => onChange(!checked)}
            className={[
                "h-7 w-12 rounded-full border transition-colors",
                checked ? "bg-black border-black" : "bg-gray-200 border-gray-300",
            ].join(" ")}
        >
            <span
                className={[
                    "block h-6 w-6 translate-x-1 rounded-full bg-white transition-transform",
                    checked ? "translate-x-5" : "translate-x-1",
                ].join(" ")}
            />
        </button>
    );
}

function ListEditor({ label, items = [], placeholder, onAdd, onRemove }) {
    const [val, setVal] = React.useState("");
    return (
        <div className="space-y-3">
            <div className="text-sm font-semibold text-gray-700">{label}</div>
            <div className="flex items-center gap-2">
                <input
                    className={inputCls}
                    placeholder={placeholder}
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (onAdd?.(val.trim()), setVal(""))}
                />
                <button
                    className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50"
                    onClick={() => {
                        onAdd?.(val.trim());
                        setVal("");
                    }}
                >
                    Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {items.map((x) => (
                    <span
                        key={x}
                        className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm"
                    >
                        {x}
                        <button className="text-gray-500 hover:text-black" onClick={() => onRemove?.(x)}>
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}