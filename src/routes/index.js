import React from "react"
import { Redirect } from "react-router-dom"
// User profile
import UserProfile from "../pages/Authentication/UserProfile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import ChangePwd from "../pages/Authentication/ChangePassword"

// Admin
import Dashboard from "../pages/Dashboard/index"
import Stock from "../pages/Stock/index"
import AddStock from "../pages/Stock/addStock"
// import CreateTobacco from "../pages/Stock/CreateTobacco"

// Branch
import Branch from "../pages/Branch/index"
import addBranch from "../pages/Branch/addBranch"
import BranchDetails from "../pages/Branch/branch"

// Distributor
import Distributor from "../pages/Distributor/distributor"
import AddDistributor from "pages/Distributor/addDistributor"
import DistributorDetails from "pages/Distributor/details"

// Manager
import Managers from "../pages/managers/managers"
import addManager from "../pages/managers/addManager"
import updateManager from "pages/managers/updateManager"

// Supplier
import Suppliers from "../pages/Supplier/suppliers"
import AddSupplier from "pages/Supplier/addSupplier"
import details from "pages/Supplier/details"

// Employees
import Employees from "pages/Employees/employees"
import addEmployee from "pages/Employees/addEmployee"
import updateEmployee from "pages/Employees/updateEmployee"
import Invoice from "pages/Stock/invoice"

// Beedis
import Beedis from "pages/Beedis/Beedis"
import AddBeedis from "pages/Beedis/addBeedis"
import ReportedBeedi from "pages/Beedis/ReportedBeedi"
import ReportedBeediBranches from "pages/Beedis/branches"
import ReportedBeediBranch from "pages/Beedis/branch"

// Chennilu
import Chennilu from "pages/Chennilu/index"
import AddChennilu from "pages/Chennilu/AddChennillu"

// Production
import Products from "pages/Production/products"
import AddProduct from "pages/Production/AddProduct"
import Cartons from "pages/Production/Cartons"
import ProductDetails from "pages/Production/ProductDetails"

// Inventory
import Inventory from "pages/Inventory/Index"
import AddInventory from "pages/Inventory/AddInventory"

import InventoryLogs from "pages/Inventory/InventoryLogs"
import AddInventoryLogs from "pages/Inventory/AddInventoryLogs"
import InventoryLogDetails from "pages/Inventory/InventoryLogDetails"
import InventoryDetails from "pages/Inventory/InventoryDetails"
import CreateTobacco from "pages/Inventory/CreateTobacco"

// Salary
import Salary from "pages/Salary/Index"
import EmployeeSalary from "pages/Salary/EmployeeSalary"
import SalaryLogs from "pages/Salary/SalaryLogs"
import SalaryDetails from "pages/Salary/details"

// Sale
import AddSale from "pages/Sales/add"
import Sales from "pages/Sales/index"
import SaleDetails from "pages/Sales/details"

// Users
import Users from "pages/Users/Index"
import LoginActivity from "pages/Users/LoginActivity"

// Ledger
import Ledger from "pages/Ledger/Index"
import AddLedger from "pages/Ledger/Add"
import LedgerDetails from "pages/Ledger/Details"

// Settings
import Settings from "pages/Settings/Index"

// Reports
import Reports from "pages/Reports/Index.jsx"

// Logs
import Logs from "pages/Logs/Index.jsx"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/reports", component: Reports },
  { path: "/logs", component: Logs },

  { path: "/stock", component: Stock },
  { path: "/stock/add", component: AddStock },
  // { path: "/stock/create-tobacco", component: CreateTobacco },
  { path: "/branch/add", exact: true, component: addBranch },
  { path: "/branch/:id/stock/add", component: BranchDetails },
  { path: "/branch/:id/stock", component: BranchDetails },
  { path: "/branch/:id/employees/:employeeid", component: BranchDetails },
  { path: "/branch/:id/employees", component: BranchDetails },
  { path: "/branch/:id/add-employee", component: BranchDetails },

  { path: "/branch/:id/distribution", component: BranchDetails },
  { path: "/branch/:id/add-distribution", component: BranchDetails },

  { path: "/branch/:id/production", component: BranchDetails },
  { path: "/branch/:id/add-production", component: BranchDetails },

  { path: "/branch/:id", component: BranchDetails },
  { path: "/branch", component: Branch },

  { path: "/distributors", component: Distributor },
  { path: "/distributor/add", component: AddDistributor },
  { path: "/distributor/:id", component: DistributorDetails },

  { path: "/managers", exact: true, component: Managers },
  { path: "/managers/add", component: addManager },
  { path: "/managers/:id", component: updateManager },

  { path: "/stock", component: Stock },
  { path: "/suppliers", component: Suppliers },
  { path: "/suppliers/add", component: AddSupplier },
  { path: "/suppliers/:id", component: details },

  { path: "/employees", component: Employees },
  { path: "/employees/add", component: addEmployee },
  { path: "/employees/:id", component: updateEmployee },

  { path: "/beedis", component: Beedis },
  { path: "/beedis/add", component: AddBeedis },
  { path: "/beedis/branches", component: ReportedBeediBranches },
  { path: "/beedis/branches/:id", component: ReportedBeediBranch },
  { path: "/beedis/:id", component: ReportedBeedi },

  { path: "/stock/invoice", component: Invoice },

  { path: "/chennilu", component: Chennilu },
  { path: "/chennilu/add", component: AddChennilu },

  // products
  { path: "/products", component: Products },
  { path: "/products/add", component: AddProduct },
  { path: "/products/cartons", component: Cartons },
  { path: "/products/:id", component: ProductDetails },

  // inventory
  { path: "/inventory", component: Inventory },
  { path: "/inventory/add", component: AddInventory },
  { path: "/inventory/create-tobacco", component: CreateTobacco },
  { path: "/inventory/logs", component: InventoryLogs },
  { path: "/inventory/:id", component: InventoryDetails },
  { path: "/inventory/logs/:id", component: InventoryLogDetails },
  { path: "/inventory/logs/add", component: AddInventoryLogs },

  // salary
  { path: "/salary", component: Salary },
  { path: "/salary/employee", component: EmployeeSalary },
  { path: "/salary/logs", component: SalaryLogs },
  { path: "/salary/logs/:id", component: SalaryDetails },

  // sale
  { path: "/sales", component: Sales },
  { path: "/sales/add", component: AddSale },
  { path: "/sales/:id", component: SaleDetails },

  // ledger
  { path: "/ledger", component: Ledger },
  { path: "/ledger/add", component: AddLedger },
  { path: "/ledger/:id", component: LedgerDetails },

  // users
  { path: "/users", component: Users },
  { path: "/users/login-activity", component: LoginActivity },

  // settings
  { path: "/settings", component: Settings },

  //profile
  {
    path: "/profile",
    component: UserProfile,
  },

  // this route should be at the end of all other routes
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
]

const publicRoutes = [
  {
    path: "/logout",
    component: Logout,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/forgot-password",
    component: ForgetPwd,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/reset-password",
    component: ChangePwd,
  },
]

export { authProtectedRoutes, publicRoutes }
