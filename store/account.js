import * as Account from "@/assets/account";

export const state = () => ({
    account: null,
    authenticating: true
})

export const mutations = {
    logIn(state, payload){
        state.account = payload;
        state.authenticating = false;
    },
    logOut(state){
        state.account = null;
    },
    eatRecipe(state, payload){
        state.account.remainingCalories = (state.account.remainingCalories || state.account.tdee) - payload.calories;
    },
    authenticating(state, payload){
        if(!state.authenticating)
            state.authenticating = true;
    }
}

export const actions = {
    authenticate(context){
        context.commit("authenticating");
        return new Promise((resolve, reject) => {
            Account
                .authenticate()
                .then(response => {
                    context.commit("logIn", response.data);
                    resolve(response);
                })
                .catch(err => {
                    reject(err)
                })
        });
    },
    logIn(context, payload){
        context.commit("authenticating");
        return new Promise((resolve, reject) => {
            Account
                .logIn(payload.username, payload.password)
                .then(response => {
                    context.commit("logIn", response.data);
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                })
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
    },
    eatRecipe(context, payload){
        Account.eatRecipe(payload.id, context.state.account.id)
        .then(res => {
            context.commit("eatRecipe", payload);
        });
    }
}

export const getters = {
    account(state){
        return state.account;
    },
    authenticating(state){
        return state.authenticating;
    }
}