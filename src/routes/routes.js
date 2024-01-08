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
