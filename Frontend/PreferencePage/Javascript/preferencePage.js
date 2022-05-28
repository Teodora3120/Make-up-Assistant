const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const heartButton = document.querySelector("#heart");

hamburger.addEventListener("click", ()=>{
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", ()=>{
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

heartButton.addEventListener("click", () => {
    heartButton.classList.toggle("active");
})
