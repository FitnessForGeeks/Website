import * as Account from "@/assets/account";
import moment from "moment";

function getBMR(height, weight, age, isMale){
    return parseInt(height * 6.25 + weight * 9.99 - age * 4.92 + (isMale? 5 : -161));
}

export const state = () => ({
    account: null
})

export const mutations = {
    logIn(state, payload){
        payload.age = moment().diff(moment(payload.birthdate), "years");
        state.account = Object.assign({}, { BMR: getBMR(payload.height, payload.weight, payload.age, payload.isMale ) }, payload);
    },
    logOut(state){
        state.account = null;
    },
    eatRecipe(state, payload){
        state.account.remainingCalories = (state.account.remainingCalories || state.account.BMR) - payload.calories;
    }
}

export const actions = {
    authenticate(context){
        return new Promise((resolve, reject) => {
            Account
                .authenticate()
                .then(response => {
                    console.log(response);
                    context.commit("logIn", response.data);
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err)
                });
        });
    },
    logIn(context, payload){
        return new Promise((resolve, reject) => {
            Account
                .logIn(payload.username, payload.password)
                .then(response => {
                    context.dispatch("authenticate");
                    resolve();
                })
                .catch(err => {
                    console.log(err.message)
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
    },
    eatRecipe(context, payload){
        context.commit("eatRecipe", payload);
    }
}

export const getters = {
    account(state){
        return state.account;
    },
    test(state){
        return "test"
    }
}