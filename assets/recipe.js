import axios from "axios";

const API_URL = "http://localhost:5000/api/recipe";

export function getAll(){
    return axios.get(API_URL, { withCredentials: true });
}

export function getByQuery(query){
    return axios.get(API_URL + "/search", {
        params: {
            query
        },
        withCredentials: true
    })
}