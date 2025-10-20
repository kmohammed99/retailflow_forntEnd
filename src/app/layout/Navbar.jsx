// src/app/layout/Navbar.jsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/app/routes/routePaths";
import "../../styles/app-shell.css";
import DashboardIc from '@/assets/icons/dashboard.svg?react'
import OrderIc from '@/assets/icons/order.svg?react'
import InventoryIc from '@/assets/icons/inventory.svg?react'
import ExpensesIc from '@/assets/icons/expenses.svg?react'
import ShippingIc from '@/assets/icons/shipping.svg?react'
import ReportsIc from '@/assets/icons/reports.svg?react'
import SettingsIc from '@/assets/icons/settings.svg?react'
import SettingsBlackIc from '@/assets/icons/settingsblack.svg?react'
import AlarmIc from '@/assets/icons/icons8-notification-bell-32 2.svg?react'
import LogoDD from '@/assets/icons/DD_Yellow.svg?react'



export default function Navbar({
  title = "Dibo Divo",
  subtitle = "Management System",
  logoSrc,
}) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const applySideWidth = (mobile, isOpen) => {
    const root = document.documentElement;
    const openW =
      getComputedStyle(root).getPropertyValue("--side-w-open").trim() || "288px";
    const closedW =
      getComputedStyle(root).getPropertyValue("--side-w-closed").trim() || "72px";

    // على الموبايل: المحتوى ثابت => 0px
    const side = mobile ? "0px" : isOpen ? openW : closedW;
    root.style.setProperty("--side-w", side);
  };

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      applySideWidth(mobile, open);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applySideWidth(isMobile, open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isMobile]);

  const toggleSidebar = () => setOpen((v) => !v);
  const closeIfMobile = () => {
    if (isMobile) setOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="nvbar">
        <div className="nvbar__amber">
          <button
            type="button"
            aria-label="Toggle sidebar"
            className={`nvbar__toggle ${open ? "is-open" : ""}`}
            onClick={toggleSidebar}
          >
            <span className="nvbar__bar" />
            <span className="nvbar__bar" />
            <span className="nvbar__bar" />
          </button>
        </div>

        <div className="nvbar__logo">
          {logoSrc ? (
            <img src={logoSrc} alt="Logo" />
          ) : (
            <LogoDD className="logo-dd" aria-label="DD logo" />
          )}
        </div>

        <div className="nvbar__titleWrap">
          <h1 className="nvbar__title">{title}</h1>
          <div className="nvbar__subtitle">{subtitle}</div>
        </div>

        <div className="nvbar__actions">
          <button className="nvbar__iconBtn" aria-label="Notifications">
            <AlarmIc className="ic-24" />
          </button>
          <button className="nvbar__iconBtn" aria-label="Settings">
            <SettingsBlackIc className="ic-24" />
          </button>
        </div>
      </header>

      {/* DRAWER */}
      <aside className={`drawer ${open ? "open" : "collapsed"}`}>
        <nav className="drawer__nav">
          <NavItem to={ROUTES.dashboard} label="Dashboard"  icon={<DashboardIc className="ic-24" />} onClick={closeIfMobile} />
          <NavItem to={ROUTES.orders} label="Orders" icon={<OrderIc className="ic-24" />} onClick={closeIfMobile} />
          <NavItem to={ROUTES.inventory} label="Inventory"  icon={<InventoryIc className="ic-24" />} onClick={closeIfMobile} />
          <NavItem to={ROUTES.expenses} label="Expenses"  icon={<ExpensesIc className="ic-24" />} onClick={closeIfMobile} />
          <NavItem to={ROUTES.ShippingPage} label="Shipping" icon={<ShippingIc className="ic-24" />} onClick={closeIfMobile} />
          <NavItem to={ROUTES.ReportsPage} label="Reports" icon={<ReportsIc className="ic-24" />} onClick={closeIfMobile} />
          <NavItem to={ROUTES.settings} label="Settings" icon={<SettingsIc className="ic-24" />} onClick={closeIfMobile} />

        </nav>
        <div className="drawer__divider" />
      </aside>
      {/* Backdrop Mobile */}
      <button
        className={`drawer__backdrop ${isMobile && open ? "show" : ""}`}
        aria-hidden={!isMobile || !open}
        onClick={() => setOpen(false)}
      />
    </>
  );
}

function NavItem({ icon, label, badge, to, onClick }) {
  return (
    <NavLink to={to} onClick={onClick} className={({ isActive }) => `drawer__item ${isActive ? "is-active" : ""}`}>
      <span className="drawer__icon" aria-hidden>
        {icon}
      </span>
      <span className="drawer__label">{label}</span>
      {badge && <span className="drawer__badge">{badge}</span>}
    </NavLink>
  );
}

