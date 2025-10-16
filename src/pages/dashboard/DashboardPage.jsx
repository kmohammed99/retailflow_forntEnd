import React from "react";
import "./dashboard.css";

export default function DashboardPage() {
  const kpis = [
    { title: "Total Orders", value: "1,250", tone: "amber" },
    { title: "Total Sales", value: "250,000 $", tone: "ink", outlined: true },
    { title: "Total Product in Stock", value: "8,500", tone: "plain" },
    { title: "Total Expenses", value: "80,000 $", tone: "plain" },
    { title: "Profit", value: "170,000 $", tone: "dark", highlighted: true },
  ];

  const orders = [
    { id: "#1033", customer: "khaled", qty: 1, total: "660 L.E", status: "Delivered" },
    { id: "#1034", customer: "mohamed", qty: 4, total: "1100 L.E", status: "Pending" },
    { id: "#1035", customer: "omar", qty: 2, total: "2000 L.E", status: "Pending" },
    { id: "#1036", customer: "ali", qty: 3, total: "600 L.E", status: "Canceled" },
  ];

  return (
    <>
      {/* KPI Cards */}
      <section className="db-cards" aria-label="KPI Summary">
        {kpis.map((k, i) => (
          <KpiCard
            key={i}
            title={k.title}
            value={k.value}
            tone={k.tone}
            outlined={k.outlined}
            highlighted={k.highlighted}
          />
        ))}
      </section>

      <hr className="db-divider" />

      {/* Recent Orders */}
      <section className="db-orders" aria-labelledby="recent-orders-h">
        <div className="db-headbar">
          <h2 id="recent-orders-h" className="db-h2">Recent Orders</h2>
          <div className="db-actions">
            <button className="db-action" type="button">
              <span className="db-action-dot">＋</span>
              <span>Add Order</span>
            </button>
            <button className="db-action" type="button">
              <span className="db-action-dot">$</span>
              <span>Add Expense</span>
            </button>
          </div>
        </div>

        <div className="db-table" role="table" aria-label="Recent orders">
          <div className="db-tr db-head" role="row">
            <div role="columnheader">Order ID</div>
            <div role="columnheader">Customer</div>
            <div role="columnheader">Quantity</div>
            <div role="columnheader">Total</div>
            <div role="columnheader">Status</div>
          </div>

          {orders.map((r) => (
            <div className="db-tr" role="row" key={r.id}>
              <div role="cell">{r.id}</div>
              <div role="cell">{r.customer}</div>
              <div role="cell">{r.qty}</div>
              <div role="cell">{r.total}</div>
              <div role="cell">
                <span className={`db-pill ${pillClass(r.status)}`}>{r.status}</span>
              </div>
            </div>
          ))}

          <div className="db-foot">
            <a href="#" className="db-seeall">See All</a>
          </div>
        </div>
      </section>
    </>
  );
}

/* helpers */
function pillClass(status) {
  if (status === "Delivered") return "ok";
  if (status === "Pending") return "info";
  if (status === "Canceled") return "danger";
  return "";
}

function KpiCard({ title, value, tone = "plain", outlined, highlighted }) {
  const classes = [
    "kpi",
    tone === "amber" && "kpi-amber",
    tone === "ink" && "kpi-ink",
    highlighted && "kpi-highlight",
    outlined && "kpi-outlined",
  ].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">{value}</div>
    </div>
  );
}
