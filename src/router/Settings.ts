export default [
    {
        name: "Setting Page",
        path: "/Settings",
        component: () => import("../views/Setting/Setting.vue"),
        meta: {
            title: "Setting Page",
            requireAuth: true
        },
    },
    {
        name: "Excagnge Page",
        path: "/excagnge",
        component: () => import("../views/Setting/Exchange/Exchange.vue"),
        meta: {
            title: "Excagnge Page",
            requireAuth: true
        },
    },
]
