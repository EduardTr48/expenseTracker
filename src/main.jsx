import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Layout from './Layout';
import Expense from './components/Expense';
import Home from './components/Home';
import AddExpense, { action as AddExpenseAction } from './components/AddExpense';
import { ExpensesProvider } from './context/ExpensesContext';
import EditExpense, { action as EditExpenseAction } from './components/EditExpense';
import ReportMonth from './components/ReportMonth';
import { IncomesProvider } from './context/IncomesContext';
import Incomes from './components/Incomes';
import AddIncome, { action as AddIncomeAction } from './components/AddIncome';
import EditIncome, { action as EditIncomeAction } from './components/EditIncome';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/expense',
                element: <Expense />,
            },
            {
                path: '/addExpense',
                element: <AddExpense />,
                action: AddExpenseAction,
            },
            {
                path: '/addIncome',
                element: <AddIncome />,
                action: AddIncomeAction,
            },
            {
                path: '/editIncome/:id',
                element: <EditIncome />,
                action: EditIncomeAction,
            },
            {
                path: '/editExpense/:id',
                element: <EditExpense />,
                action: EditExpenseAction,
            },
            {
                path: '/reportMonth',
                element: <ReportMonth />,
            },
            {
                path: '/incomes',
                element: <Incomes />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ExpensesProvider>
            <IncomesProvider>
                <RouterProvider router={router} />
            </IncomesProvider>
        </ExpensesProvider>
    </React.StrictMode>
);
