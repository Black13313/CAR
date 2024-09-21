import {createRouter, createWebHashHistory} from "vue-router";
import User from "./User";
import Order from "./Order";
import Customer from "./Customer";
import Settings from "./Settings";


const routes = [
    {
        name: "NotFoundPage",
        path: "/:pathMatch(.*)*",
        component: () => import("@/views/NotFoundPage.vue"),
        meta: {
            title: "Page not found",
        },
    },
    {
        name: "HomePage",
        path: "/Orders",
        component: () => import("@/views/HomePage/Home.vue"),
        meta: {
            title: "Home Page",
            requireAuth: true
        },
    },
    {
        name: "LoginPage",
        path: "/login",
        component: () => import("@/views/HomePage/LoginPage.vue"),
        meta: {
            title: "Login Page",
            requireAuth: true
        },
    },
    {
        name: "RolePage",
        path: "/Roles",
        component: () => import("../views/UserandRole/Role/Role.vue"),
        meta: {
            title: "Role Page",
            requireAuth: true
        },
    },
    {
        name: "ChangePasswordPage",
        path: "/ChangePW",
        component: () => import("../views/Setting/ChagePassword.vue"),
        meta: {
            title: "Change Password Page",
            requireAuth: true
        },
    },

    ...Order,
    ...User,
    ...Customer,
    ...Settings,
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


export default router;
