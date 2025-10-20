import { FileDown, FileSpreadsheet, DollarSign, CheckCircle, AlertTriangle, Lock, Filter, Calendar } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    { date: "20/10/2025", orders: 20, sales: "1200 L.E", expenses: 4, profit: 20, product: "Dibo Palms" },
    { date: "20/10/2025", orders: 10, sales: "1200 L.E", expenses: 4, profit: 4, product: "Dibo Palms" },
    { date: "20/10/2025", orders: 15, sales: "1200 L.E", expenses: 4, profit: 15, product: "Dibo Palms" },
    { date: "20/10/2025", orders: 10, sales: "1200 L.E", expenses: 4, profit: 4, product: "Dibo Palms" },
    { date: "20/10/2025", orders: 12, sales: "1200 L.E", expenses: 4, profit: 8, product: "Dibo Palms" },
  ];

  return (
    <div className="p-6 bg-[#f4f3f8] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Reports.</h1>
          <p className="text-gray-500">View your overall performance and financial summary</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
          <button className="flex items-center gap-2 rounded-lg bg-[#007bff] text-white px-4 py-2 font-semibold shadow hover:brightness-110">
            <FileDown size={18} /> Export to PDF
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-gray-200 text-gray-800 px-4 py-2 font-semibold shadow hover:brightness-110">
            <FileSpreadsheet size={18} /> Export to Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-50">
          <Filter size={18} className="text-[#dcbc0f]" /> Filter by Collation ▼
        </div>
        <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-50">
          <Calendar size={18} className="text-[#dcbc0f]" /> Last 30 Days ▼
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<DollarSign size={22} />} label="Total Sales" value="125,000 L.E" tone="amber" />
        <StatCard icon={<CheckCircle size={22} />} label="Total Orders" value="97" tone="indigo" />
        <StatCard icon={<AlertTriangle size={22} />} label="Total Expenses" value="12,000 L.E" tone="red" />
        <StatCard icon={<Lock size={22} />} label="Net Profit" value="113,000 L.E" tone="green" />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mb-6" />

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden ring-1 ring-slate-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Total Orders</th>
              <th className="py-3 px-4">Total Sales</th>
              <th className="py-3 px-4">Total Expenses</th>
              <th className="py-3 px-4">Net Profit</th>
              <th className="py-3 px-4">Best-Selling Product</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="py-3 px-4">{r.date}</td>
                <td className="py-3 px-4">{r.orders}</td>
                <td className="py-3 px-4">{r.sales}</td>
                <td className="py-3 px-4">{r.expenses}</td>
                <td className="py-3 px-4">{r.profit}</td>
                <td className="py-3 px-4">{r.product}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* --- helper component --- */
function StatCard({ icon, label, value, tone = "amber" }) {
  const tones = {
    amber: { ring: "ring-slate-200", stripe: "#dcbc0f" },
    indigo: { ring: "ring-indigo-200", stripe: "#6aa1ff" },
    red: { ring: "ring-rose-200", stripe: "#fb7185" },
    green: { ring: "ring-green-200", stripe: "#34d399" },
  };
  const t = tones[tone] || tones.amber;

  return (
    <div
      className={`relative rounded-2xl bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,.08)] ring-1 ${t.ring}`}
    >
      <div className="flex items-center gap-4">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-black text-[#dcbc0f]">
          {icon}
        </div>
        <div>
          <div className="text-[16px] font-bold text-gray-600">{label}</div>
          <div className="text-2xl font-bold text-[#0f172a]">{value}</div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
        style={{ background: t.stripe }}
      />
    </div>
  );
}
