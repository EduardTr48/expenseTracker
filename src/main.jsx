import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import Expense from "./components/Expense";
import Home from "./components/Home";
import AddExpense, { action as actionAddExpense } from "./components/AddExpense";
import { ExpensesProvider } from "./context/ExpensesContext";

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
                action: actionAddExpense,
            },
            {
                path: "/editExpense/:id",
                element: <AddExpense />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ExpensesProvider>
            <RouterProvider router={router} />
        </ExpensesProvider>
    </React.StrictMode>
);
