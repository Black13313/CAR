export default [
    {
        name: "CustomerPage",
        path: "/Customers",
        component: () => import("../views/Customer/CustomerList.vue"),
        meta: {
            title: "Customers Page",
            requireAuth: true
        },
    },
]
