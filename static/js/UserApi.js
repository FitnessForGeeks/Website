let API_URL = "http://localhost:4567";

class UserApi{
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
        const body = {
            username: username,
            password: password,
            email: email
        };

        fetch(API_URL + "/users", {
            method: "post",
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.log(error));
    }
}