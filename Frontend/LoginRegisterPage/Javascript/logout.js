const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
}

document.querySelectorAll("#logout-link").forEach((n) => {
    const userString = localStorage.getItem("user");
    console.log(userString);
    let user = undefined;
    if (userString) {
        user = JSON.parse(userString);
        if (user.token) {
            n.addEventListener("click", logout);
            n.textContent = "Logout";
        }
    }else {
        n.textContent = "Login & Register";
    }
})