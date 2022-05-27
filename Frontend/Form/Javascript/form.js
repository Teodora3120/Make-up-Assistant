const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const checkboxDropdown = document.querySelector(".checkbox-dropdown");
const checkboxDropdownUl = document.querySelector(".checkbox-dropdown ul");

hamburger.addEventListener("click", ()=>{
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", ()=>{
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

checkboxDropdown.addEventListener("click", () => {
    checkboxDropdown.classList.toggle("is-active");
})

checkboxDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
})