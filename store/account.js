import * as Account from "@/assets/account";

export const state = () => ({
    account: null
})

export const mutations = {
    logIn(state, payload){
        state.account = payload;
    },
    logOut(state){
        state.account = null;
    }
}

export const actions = {
    authenticate(context){
        return new Promise((resolve, reject) => {
            Account
                .authenticate()
                .then(response => {
                    console.log(response);
                    context.commit("logIn", {});
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err.response)
                });
        });
    },
    logIn(context, payload){
        return new Promise((resolve, reject) => {
            Account.logIn(payload.username, payload.password)
                .then(response => {
                    context.dispatch("authenticate");
                    resolve();
                });
        });
    },
    logOut(context){
        return new Promise((resolve, reject) => {
            Account
                .logOut()
                .then(response => {
                    context.commit("logOut");
                    resolve();
                });
        });

    }
}

export const getters = {
    account(state){
        return state.account;
    }
}