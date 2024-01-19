<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router'
import auth from "@/views/auth.vue";
import chooseMenu from "@/views/chooseMenu.vue";

let routes = [
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
=======
// Assuming this is your routes.js file
import { createRouter, createWebHistory } from 'vue-router';
import Auth from '/src/views/auth.vue';
import App from '/src/App.vue';

export const routes = [
    {
        name: 'auth',
        path: '/',
        component: Auth
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
>>>>>>> 8fcb3449419c3401b43597f6b57b331bd8fc567e
