import { defineStore } from 'pinia';

export const useChooseMenuStores = defineStore('chooseUseMenuStore', {
    state: () => {
        return {
            characters: [
                {
                    name: "Richok Manson",
                    static: 1,
                    isAdmin: true,
                    cash: 10000,
                    bank_cash: 2000,
                    lvl: 1,
                },
                {
      /*              name: "Character 3",
                    static: 3,
                    isAdmin: false,
                    cash: 8000,
                    bank_cash: 4000,
                    lvl: 3,*/
                },
                {

                },
            ],
        }
    },
})
