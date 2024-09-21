export default [
    {
        name: "UsersPage",
        path: "/Users",
        component: () => import("../views/UserandRole/Users/Users.vue"),
        meta: {
            title: "User Page",
            requireAuth: true
        },
    },
    {
        name: "UserForm",
        path: "/users/form",
        component: () => import("../views/UserandRole/Users/From/UserForm.vue"),
        meta: {
            title: "User Form Page",
            requireAuth: true
        },
    },
    {
        name: "UserEdit",
        path: "/users/:id/from",
        component: () => import("../views/UserandRole/Users/From/UserForm.vue"),
        meta: {
            title: "UserEdit Page",
            requireAuth: true
        },
    },
    {
        name: "ChangePassword",
        path: "/users/changepassword/:id",
        component: () => import("../views/UserandRole/Users/ChangePassword.vue"),
        meta: {
            title: "Change Password Page",
            requireAuth: true
        },
    },
    {
        name: "AddOnlineAccountList",
        path: "/Roles/AddOnlineAccountList",
        component: () => import("../views/UserandRole/Users/ClearUser/ClearUserOnline.vue"),
        meta: {
            title: "AddOnlineAccountList Page",
            requireAuth: true
        },
    },
    {
        name: "RoleMenu",
        path: "/Roles/Menu/:id/:name",
        component: () => import("../views/UserandRole/Role/RoleMenu.vue"),
        meta: {
            title: "RoleMenu Page",
            requireAuth: true
        },
    },
]
