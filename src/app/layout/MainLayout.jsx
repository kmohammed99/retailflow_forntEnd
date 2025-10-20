// src/app/layout/MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import "./../../styles/app-shell.css";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";

export default function MainLayout() {
  const { pathname } = useLocation();
  const noCardPaths = [
    "/orders/new/items",
    "/orders/new/payment",
    "/orders/new",
    "/expenses/new",
    "/shipping/new",
    "/inventory/new"
  ];
  const wrapWithCard = !noCardPaths.includes(pathname);

  return (
    <div className="app-shell">
      {/* ✅ التوستر هنا عشان يشتغل في كل الصفحات */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
            fontSize: "14px",
          },
        }}
      />

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
