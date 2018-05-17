export const state = () => ({
    loggedIn: false
})

export const mutations = {
    logIn(state){
        state.loggedIn = true;
    },
    logOut(state){
        state.loggedIn = false;
    }
}

export const getters = {
    loggedIn(state){
        return state.loggedIn;
    }
}