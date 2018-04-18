let API_URL = "http://localhost:4567";

export default class AccountApi{
    static signIn(username, password, callback){
        fetch(API_URL + "/accounts", {
            method: "get",
            body: {
                username,
                password
            }
        })
        .then(response => response.json())
        .then(callback)
        .catch(error => console.log(error));
    }
    static signUp(username, password, email){
        const body = {
            username: username,
            password: password,
            email: email
        };

        fetch(API_URL + "/accounts", {
            method: "post",
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.log(error));
    }
}