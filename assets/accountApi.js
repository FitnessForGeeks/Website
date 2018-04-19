import sha256 from "js-sha256";

const  API_URL = "http://localhost:4567";

export default class AccountApi{
    static signIn(username, password, stayLoggedIn, callback){
        const body =  {
            username,
            password: sha256(password)
        }
        fetch(API_URL + "/sign_in", {
            method: "post",
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(res => {
            if(stayLoggedIn){
                sessionStorage.setItem("loggedIn", "true");
            }
            if(callback)
                callback(res);
        })
        .catch(error => console.log(error));
    }
    static signUp(username, password, email, callback){
        const body = {
            username: username,
            password: sha256(password),
            email: email
        };

        fetch(API_URL + "/accounts", {
            method: "post",
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(callback)
        .catch(error => console.log(error));
    }
    static logOut(){
        sessionStorage.setItem("loggedIn", "false");
    }
    static get isLoggedIn(){
        return sessionStorage.getItem("loggedIn") === "true"
    }
}