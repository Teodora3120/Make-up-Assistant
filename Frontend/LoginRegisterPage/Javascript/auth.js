
// import UsersApi from "../../api/users.js";


function handleLoginAnimation(){
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementById("btn");
    x.style.left="33%";
    y.style.left="120%";
    z.style.left="0px";
  }


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
            }
        }
    } catch (err) {
        console.log(err);
        document.querySelector("#login-error").textContent = 'There has been an error';
    }
}

const register = async (e) => {
    e.preventDefault();
    const username = document.querySelector('#registerUsername').value;
    const password = document.querySelector('#registerPassword').value;

    try {
        const http = new XMLHttpRequest();
        const url = 'http://localhost:5000/api/users/register';
        let result;
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http.send(JSON.stringify({ username: username, password: password }));
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                result = JSON.parse(http.responseText);
                if (result.message === "OK") {
                    // remove logged in user first 
                        document.querySelector("#register-error").textContent = "";
                        document.querySelector("#registerUsername").textContent = "";
                        document.querySelector("#registerPassword").textContent = "";
                        handleLoginAnimation();
                } else {
                    document.querySelector("#register-error").textContent = result.message;
                }
            }
        }
    } catch (err) {
        console.log(err);
        document.querySelector("#register-error").textContent = 'There has been an error';
    }
}

const login_form = document.getElementById("login");
login_form.addEventListener('submit', login);

const register_form = document.getElementById("register");
register_form.addEventListener('submit', register);



