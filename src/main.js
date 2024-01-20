import "/src/assets/main.css"

import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import router from '/src/routes/routes.js'

const pinia = createPinia();

import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes/routes.js';

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
