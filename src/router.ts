import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { error, user } from "./store";
import { getUser } from "./api/user";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("./layouts/default.vue"),
        children: [
            {
                path: "/",
                component: () => import("./pages/index.vue")
            },
            {
                path: "/auth/login",
                component: () => import("./pages/auth/login.vue")
            },
            {
                path: "/admin",
                component: () => import("./pages/admin/index.vue")
            },
            {
                path: "/admin/user",
                component: () => import("./pages/admin/user.vue")
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to) => {
    try {
        const data = (await getUser()).data;
        if (!data.success) throw new Error();

        user.value = data.data.user;
    } catch (error) {
        user.value = null;
    }

    if (to.path.startsWith("/auth") && !!user.value) {
        return router.push("/admin");
    }

    if (to.path.startsWith("/admin")) {
        if (!user.value) {
            return router.push("/auth/login")
        }

        if (!user.value.pluralKey) {
            error.value = "You must setup your Simply Plural API key!"
            if (to.path !== "/admin/user") {
                router.push("/admin/user")
            }
            return;
        }
    }
})

export { router };