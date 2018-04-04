let API_URL = "http://localhost:4567";
class AccountApi{
    static signIn(username, password){
        fetch(API_URL + "/user", {
            method: "get",
            body: {
                username,
                password
            }
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.log(error));
    }
    static signUp(username, password, email){
        fetch(API_URL + "/user", {
            method: "post",
            body: {
                username,
                password,
                email
            }
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.log(error));
    }
}