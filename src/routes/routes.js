import { createRouter, createWebHistory } from 'vue-router'
import auth from "@/views/auth.vue";
import chooseMenu from "@/views/chooseMenu.vue";

export let routes = [
    {
        path: '/',
        name: 'auth',
        component: auth
    },
    {
        path: '/chooseMenu',
        name: 'chooseMenu',
        component: chooseMenu,
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
