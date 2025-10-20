import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "../routes/routePaths";
import MainLayout from "../layout/MainLayout";
import DashboardPage from "../../pages/dashboard/DashboardPage";
import OrdersListPage from "../../pages/orders/OrdersPage";
import AddOrderPage from "../../pages/orders/new/AddOrderCustomer";
import AddOrderItems from "@/pages/orders/new/AddOrderItems";
import AddOrderPayment from "@/pages/orders/new/AddOrderPayment";
import InventoryPage from "@/pages/inventory/InventoryPage";
import NewProductPage from "@/pages/inventory/NewProductPage";
import ExpensesListPage from "@/pages/expenses/ExpensesListPage";
import ExpenseNewPage from "@/pages/expenses/ExpenseNewPage";
import SettingsPage from "../../pages/settings/SettingsPage";
import ShippingPage from "../../pages/shipping/ShippingPage";
import ShippingNewPage from "../../pages/shipping/ShippingNewPage";
import ReportsPage from "../../pages/reports/ReportsPage";
import AddCityPage from "../../pages/shipping/AddCityPage";
import EditShippingPage from "../../pages/shipping/EditShippingPage";
import ViewExpensePage from "@/pages/expenses/ViewExpensePage";
import EditExpensePage from "@/pages/expenses/EditExpensePage";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path={ROUTES.orders} element={<OrdersListPage />} />
          <Route path={ROUTES.ordersNew} element={<AddOrderPage />} />
          <Route path={ROUTES.ordersNewItems} element={<AddOrderItems />} />
          <Route path={ROUTES.ordersNewPayment} element={<AddOrderPayment />} />
          <Route path={ROUTES.inventory} element={<InventoryPage />} />
          <Route path={ROUTES.inventoryNew} element={<NewProductPage />} />
          <Route path={ROUTES.expenses} element={<ExpensesListPage />} />
          <Route path={ROUTES.expensesNew} element={<ExpenseNewPage />} />
          <Route path={ROUTES.ShippingPage} element={<ShippingPage />} />
          <Route path={ROUTES.shippingNewPage} element={<ShippingNewPage />} />
          <Route path="/shipping/add-city" element={<AddCityPage />} />
          <Route path="/edit-shipping/:id" element={<EditShippingPage />} />
          <Route path="/expenses/:id/view" element={<ViewExpensePage />} />
          <Route path="/expenses/:id/edit" element={<EditExpensePage />} />
          <Route path={ROUTES.settings} element={<SettingsPage />} />
          <Route path={ROUTES.ReportsPage} element={<ReportsPage />} />
          <Route path="*" element={<div style={{ padding: 24 }}>Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
