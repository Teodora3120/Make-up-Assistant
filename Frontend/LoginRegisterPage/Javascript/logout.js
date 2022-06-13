const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
}

/* document.querySelectorAll("#logout-button").forEach((n) => {
    n.addEventListener("click", logout);
    n.textContent = "Login/Register";
    
}) */