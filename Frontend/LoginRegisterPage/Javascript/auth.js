
import UsersApi from "../../api/users.js";


const login = async (e) => {
    e.preventDefault();
    const username = document.querySelector('#loginUsername').value;
    const password = document.querySelector('#loginPassword').value;
    try {
        // var userApi = new UsersApi();
        const response = await UsersApi.Login({ username: username, password: password });
        console.log(response);
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