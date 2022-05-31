
let selectBox = document.getElementById("filter");

window.addEventListener("load", async (e) => {
    let token = "";
    let products = [];
    const dynamic = document.querySelector('.container');
    const local = localStorage.getItem("user");
    if (local) {
        token = JSON.parse(localStorage.getItem('user')).token;
    }else {
       return window.location.href = "http://localhost:5000/Frontend/notLoggedIn.html";
    }
    e.preventDefault();
    try {
         
        var request = new XMLHttpRequest();
        const url = "http://localhost:5000/api/products/filter";
        request.open('POST', url, true);
        request.setRequestHeader('x-access-token', token);
        request.send(JSON.stringify({product_type: "all"}));
        request.onreadystatechange = function () {
            if (request.readyState == XMLHttpRequest.DONE) {
                products = JSON.parse(request.responseText);
                console.log(products);
                dynamic.innerHTML = products.map((item, index) =>
                `<div>
                    <div class="box-content">
                    <h2 style=" ${index === 0 ? "font-style: italic" : "color:black"}; padding: 0.4em; text-align: left;">Number ${index + 1}</h2>
                    <div class="like">
                    <div class="h_container">
                    <i id="heart" class="fas fa-heart"></i>
                    </div>
                    <p>${item.rating} people liked this</p>
                    </div>
                    <img class="grid-img" src="${item.api_featured_image}">
                    <h2>${item.name}</h2>
                    <a href="${item.product_link}" style="padding: 1em; color: #156068">You can find it here</a>
                    <p style="padding: 1em; color: #9DA993">${item.brand}</p>
                    <small style="margin-bottom: .5em">${item.price_sign ? item.price_sign: ""}${item.price ? item.price: "Unknown price"}</small>
                    </div>
                </div>
                `
            ).join(" ");
            }
            dynamic.innerHTML += ` <div class="select-container">

            <h4 style="margin-top: 2em; font-style: italic;">Download</h4>
            <div class="cta">
              <button class="cta-select">PDF</button>
              <button class="cta-select">RSS</button>
            </div>
          </div>`
        } 

         selectBox.addEventListener("change", ()=>{
            if(selectBox !== undefined){  
                var selectedValue = selectBox.options[selectBox.selectedIndex].value;
                console.log(selectedValue);
                var request = new XMLHttpRequest();
                const url = "http://localhost:5000/api/products/filter";
                request.open('POST', url, true);
                request.setRequestHeader('x-access-token', token);
                request.send(JSON.stringify({product_type: selectedValue}));
                request.onreadystatechange = function () {
                    if (request.readyState == XMLHttpRequest.DONE) {
                        products = JSON.parse(request.responseText);
                        console.log(products);
                        dynamic.innerHTML = products.map((item, index) =>
                        `<div>
                            <div class="box-content">
                            <h2 style=" ${index === 0 ? "font-style: italic" : "color:black"}; padding: 0.4em; text-align: left;">Number ${index + 1}</h2>
                            <div class="like">
                            <div class="h_container">
                            <i id="heart" class="fas fa-heart"></i>
                            </div>
                            <p>${item.rating} people liked this</p>
                            </div>
                            <img class="grid-img" src="${item.api_featured_image}">
                            <h2>${item.name}</h2>
                            <p style="padding: 1em">${item.description}</p>
                            <p style="padding: 1em; color: #9DA993">${item.brand}</p>
                            <small style="margin-bottom: .5em">${item.price}</small>
                            </div>
                        </div>
                        `
                    ).join(" ");
                    }
                    dynamic.innerHTML += ` <div class="select-container">

                    <h4 style="margin-top: 2em; font-style: italic;">Download</h4>
                    <div class="cta">
                      <button class="cta-select">PDF</button>
                      <button class="cta-select">RSS</button>
                    </div>
                  </div>`
                } 
            }
        }) 
    } catch (err) {
        console.log(err);
    }
});

