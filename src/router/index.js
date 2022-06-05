import { createRouter, createWebHistory } from "vue-router";

import LoginPage from '../views/user/LoginPage'
import SignupPage from '../views/user/SignupPage'
import DashboardPage from '../views/dashboard/DashboardPage'

import EmployeeAddPage from '../views/employee/EmployeeAddPage'
import EmployeeEditPage from '../views/employee/EmployeeEditPage'
import EmployeeDetailPage from '../views/employee/EmployeeDetailPage'

const routes =  [
    {
        path: "/",
        name: "login",
        component: LoginPage
    },
    {
        path: "/signup",
        name: "signup",
        component: SignupPage
    },
    {
        path:"/dashboard",
        name: "dashboard",
        component: DashboardPage
    },
    {
        path:"/employee-add",
        name: "employeeAdd",
        component: EmployeeAddPage
    },
    {
        path:"/employee/:id",
        name: "employeeDetail",
        component: EmployeeDetailPage
    },
    {
        path:"/employee-edit/:id",
        name: "employeeEditUpdate",
        component: EmployeeEditPage
    }
]

let router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;