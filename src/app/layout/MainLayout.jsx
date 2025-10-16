// src/app/layout/MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import "./../../styles/app-shell.css";
import Navbar from "./Navbar";

export default function MainLayout() {
  const { pathname } = useLocation();
  const noCardPaths = ["/orders/new/items", "/orders/new/payment", "/orders/new", "/expenses/new", "/shipping/new"];
  const wrapWithCard = !noCardPaths.includes(pathname);

  return (
    <div className="app-shell">
      <Navbar title="Dibo Divo" subtitle="Management System" />
      <main className="app-content">
        <div className="page-center">
          {wrapWithCard ? (
            <div className="page-card">
              <Outlet />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
}
