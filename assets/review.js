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

export function getAllByAccountIdWithPage(id, pageNumber){
    return axios.get(API_URL, {
        withCredentials: true,
        params: {
            id,
            pageNumber
        } 
    })
}

export function post(accountId, recipeId, rating, text){
    const body = {
        accountId,
        recipeId,
        rating,
        text
    };
    return axios.post(API_URL, body);
}