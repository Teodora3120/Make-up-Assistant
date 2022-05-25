const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

document.querySelector(".cover").addEventListener('click', () => {
    const local = localStorage.getItem("user");
    if (local) {
        const user = JSON.parse(local);
        console.log(user);
    } else {
        console.log("User not logged in");
    }
})
