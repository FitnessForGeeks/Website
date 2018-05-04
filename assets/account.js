import sha256 from "js-sha256";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost";

export default {
    logIn(username, password){
        const data = {
            username,
            password: sha256(password)
        }
        return axios.post(API_URL + "/login", data, { 
            withCredentials: true
        })
    },
    logOut(){
        return axios.post(API_URL + "/logout", null, { withCredentials: true});
    },
    register(username, password, email){
        const data = {
            username: username,
            password: sha256(password),
            email: email
        };
        return axios.post(API_URL + "/register", data)
    },
    isLoggedIn(){
        return Cookies.get("sid") !== undefined;
    }
}