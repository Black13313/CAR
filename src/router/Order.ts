export default [
    {
        name: "OrderFromPage",
        path: "/order/from",
        component: () => import("../views/Order/OrderFrom.vue"),
        meta: {
            title: "Order From Page",
            requireAuth: true
        },
    },
    {
        name: "OrderPay",
        path: "/order/pay/:id",
        component: () => import("../views/Order/OrderPay.vue"),
        meta: {
            title: "Order Pay Page",
            requireAuth: true
        },
    },
    {
        name: "OrderReceipt",
        path: "/order/pay/:id/receipt",
        component: () => import("../views/Order/Order.receipt.vue"),
        meta: {
            title: "Order Receipt Page",
            requireAuth: true
        },
    },
]
