
// import UsersApi from "../../api/users.js";

const login = async (e) => {
    e.preventDefault();
    const username = document.querySelector('#loginUsername').value;
    const password = document.querySelector('#loginPassword').value;
    try {
        const http = new XMLHttpRequest();
        const url = 'http://localhost:5000/api/users/login';
        let result;
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http.send(JSON.stringify({ username: username, password: password }));
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                result = JSON.parse(http.responseText);
                if (result.message === "OK" && result.token) {
                    // remove logged in user first 
                    localStorage.removeItem("user");
                    // set new user in localStorage
                    localStorage.setItem("user", JSON.stringify({ _id: result._id, token: result.token, username: result.username }));
                    window.location.href = "http://localhost:5000/";
                } else {
                    document.querySelector("#login-error").textContent = result.message;
                }
                console.log(result);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const register = async () => {
    const username = document.querySelector('#registerUsername').value;
    console.log(username);
    const password = document.querySelector('#registerPassword').value;
    console.log(password);
}

const login_form = document.getElementById("login");
login_form.addEventListener('submit', login);



