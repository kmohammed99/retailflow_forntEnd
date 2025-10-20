import ReportsPage from "../../pages/reports/ReportsPage";
import AddCityPage from "../../pages/shipping/AddCityPage";
import EditShippingCompanyPage from "../../pages/shipping/EditShippingPage";

// src/app/routes/routePaths.jsx
export const ROUTES = Object.freeze({
    dashboard: "/",
    orders: "/orders",
    ordersNew: "/orders/new",
    ordersNewItems: "/orders/new/items",
    ordersNewPayment: "/orders/new/payment",
    inventory: "/inventory",
    inventoryNew: "/inventory/new",
    expenses: "/expenses",
    expensesNew: "/expenses/new",
    expensesView: "/expenses/:id/view",
    expensesEdit: "/expenses/:id/edit",
    ShippingPage: "/shipping",
    shippingNewPage: "/shipping/New",
    AddCityPage: "/shipping/New/Addcity",
    EditShippingCompanyPage: "/shipping/EditCompany",
    ReportsPage: "/reports",
    settings: "/settings",
});
