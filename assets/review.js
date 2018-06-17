import axios from "axios";

const API_URL = "http://localhost:5000/api/review";

export function getAllByAccountId(id){
    return axios.get(API_URL, {
        withCredentials: true,
        params: {
            id
        } 
    })
}