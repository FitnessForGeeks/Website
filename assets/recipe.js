import axios from "axios";
import config from "./config";

const API_URL = config.apiServerUrl + "recipe";

export function getAll(options){
    if(!options){
        return axios.get(API_URL);
    }
    else {
        return axios.get(API_URL, { params: options });
    }
}

export function getByQuery(query){
    return axios.get(API_URL + "/search", {
        params: {
            query
        },
        withCredentials: true
    })
}