import "/src/assets/main.css"

import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
<<<<<<< HEAD
import router from '/src/routes/routes.js'

const pinia = createPinia();

=======
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes/routes.js';

const pinia = createPinia();

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
>>>>>>> 8fcb3449419c3401b43597f6b57b331bd8fc567e

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
