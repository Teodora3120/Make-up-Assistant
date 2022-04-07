const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    
    burger.addEventListener('click', ()=>{
     // toggle nave
    nav.classList.toggle('nav-active');

    // animatiomation of li
    navLinks.forEach((link, index)=>{
        if(link.style.animation){
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 2 + 0.3}s`;
        }
      
    })
    // burger animation
    burger.classList.toggle('toggle');
    });
}

const app = () =>{
    navSlide();
}

app(); /* am ramas la minutul 22:10 link : https://www.youtube.com/watch?v=gXkqy0b4M5g */
