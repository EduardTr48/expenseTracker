import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import Expense from "./components/Expense";
import Home from "./components/Home";
import AddExpense, {
    action as AddExpenseAction,
} from "./components/AddExpense";
import { ExpensesProvider } from "./context/ExpensesContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import EditExpense, {
    action as EditExpenseAction,
} from "./components/EditExpense";
import ReportMonth from "./components/ReportMonth";
import { IncomesProvider } from "./context/IncomesContext";
import Incomes from "./components/Incomes";
import AddIncome, { action as AddIncomeAction } from "./components/AddIncome";
import EditIncome, {
    action as EditIncomeAction,
} from "./components/EditIncome";
import { createRoot } from "react-dom/client";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/expense",
                element: <Expense />,
            },
            {
                path: "/addExpense",
                element: <AddExpense />,
                action: AddExpenseAction,
            },
            {
                path: "/addIncome",
                element: <AddIncome />,
                action: AddIncomeAction,
            },
            {
                path: "/editIncome/:id",
                element: <EditIncome />,
                action: EditIncomeAction,
            },
            {
                path: "/editExpense/:id",
                element: <EditExpense />,
                action: EditExpenseAction,
            },
            {
                path: "/reportMonth",
                element: <ReportMonth />,
            },
            {
                path: "/incomes",
                element: <Incomes />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CategoriesProvider>
            <ExpensesProvider>
                <IncomesProvider>
                    <RouterProvider router={router} />
                </IncomesProvider>
            </ExpensesProvider>
        </CategoriesProvider>
    </React.StrictMode>
);
