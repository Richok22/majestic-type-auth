import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        showLogin: false,
    }),
    actions: {
        setShowLogin(value) {
            this.showLogin = value;
            console.log('showLogin set to:', value);
        },
    },
});
