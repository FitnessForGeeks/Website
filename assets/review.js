import axios from "axios";

const API_URL = "http://localhost:5000/api/review";

export function getAllByRecipeId(id, pageNumber, options){
    const params ={
        id,
        pageNumber
    };

    if(options.sortType){
        params.sortText = options.sortType.text;
        params.isAscending = options.sortType.isAscending;
    }

    return axios.get(API_URL, {
        withCredentials: true,
        params: params
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