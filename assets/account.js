import sha256 from "js-sha256";
import axios from "axios";

const ACCOUNT_API_URL = "http://localhost:5000/api/account";

export function logIn(username, password){
    const data = {
        username,
        password: sha256(password)
    }
    return axios.post(ACCOUNT_API_URL + "/login", data, { 
        withCredentials: true
    })
};

export function authenticate(){
    return axios.post(ACCOUNT_API_URL + "/authenticate", {}, { 
        withCredentials: true
    })
}

export function logOut(){
    return axios.post(ACCOUNT_API_URL + "/logout", null, { withCredentials: true});
};

export function register(username, password, email){
    const data = {
        username: username,
        password: sha256(password),
        email: email
    };
    return axios.post(ACCOUNT_API_URL, data)
};

export function eatRecipe(recipeId, accountId){
    return axios.post(ACCOUNT_API_URL + "/eatRecipe", {}, {
        params: {
            accountId,
            recipeId
        }
    })
}

export function getCurrentEatenRecipes(accountId){
    return axios.get(ACCOUNT_API_URL + `/eatenRecipes/today?accountId=${accountId}`);
}
