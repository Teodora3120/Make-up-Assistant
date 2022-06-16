window.addEventListener("load", async (e) => {
    let token = "";
    let products = [];
    const dynamic = document.querySelector('.container');
    const local = localStorage.getItem("user");
    if (local) {
        token = JSON.parse(localStorage.getItem('user')).token;
    } else {
       return window.location.href = "http://localhost:5000/Frontend/notLoggedIn.html";
    }
    e.preventDefault();
    try {
        const urlParams = new URLSearchParams(window.location.search);

        const skintypes = urlParams.get('skintypes');
        console.log(skintypes);

        const skinage = urlParams.get('skinage');
        console.log(skinage);

        const haircolor = urlParams.get('haircolor')
        console.log(haircolor);

        const eyecolor = urlParams.get('eyecolor')
        console.log(eyecolor);

        const event = urlParams.get('event')
        console.log(event);

        const outfitcolors = urlParams.get('outfitcolors')
        console.log(outfitcolors);
        
        const brands = urlParams.get('brands')
        console.log(brands);
       
        const vegan = urlParams.get('vegan')
        console.log(vegan);

        const body = {
            skintypes: skintypes,
            skinage: skinage,
            haircolor: haircolor,
            eyecolor: eyecolor,
            event: event,
            outfitcolors: outfitcolors,
            brands: brands,
            vegan: vegan
        }

        console.log(body);

        var request = new XMLHttpRequest();
        const url = "http://localhost:5000/api/products";
        request.open('POST', url, true);
        request.setRequestHeader('x-access-token', token);
        request.send(JSON.stringify(body));
        request.onreadystatechange = function () {
            if (request.readyState == XMLHttpRequest.DONE) {
                products = JSON.parse(request.responseText);

                if (Array.isArray(products) == false && products.message === "Invalid Token") {
                    console.log("This session has been expired. Click here to login again");
                    
                    return  dynamic.innerHTML =
                     `
                     <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                     <h3>Your session has expired.</h3>
                     <h4 style="margin-top:2em; font-weight: 400;">Click <a style="color: #1a0dab;" href="/Frontend/loginRegisterPage.html"> here </a> to login again.</h4>
                     </div>
                   `
                } else {
                    if(products.length === 0){
                        document.querySelector("#preferance-span").textContent = `We didn't find any products for the filters chosen by you. Please select other filters.`;
                        return;
                    }
                    console.log(products);
                    const newArr = products.slice(0, 100);
                    document.querySelector("#preferance-span").textContent = `Showing ${newArr.length} products out of ${products.length}`;
                    dynamic.innerHTML = newArr.map((item, index) =>
                    `
                    <div class="card-wrapper">
                        <div class="box-content">
                        <img class="grid-img" src="${item.api_featured_image}">
                        <h2>${item.name}</h2>
                        <p style="padding: 1em">${(item.description.split(".")[0])? item.description.split(".")[0] + "." : "No description"}</p>
                        <p style="font-weight: 600">${item.price_sign ? item.price_sign: ""}${item.price ? item.price: "Unknown price"} </p>
                        <p style="padding: 1em; color: #9DA993">${item.brand}</p>
                        <div class="h_container"  id="heart${index}">
                            <i id="heart" class="fas fa-heart"></i>
                        </div>
                        </div>
                    </div>
                    `
                ).join(" ");
    
                products.slice(0, 100).map((item, index) => {
                    document.getElementById(`heart${index}`).addEventListener("click", () =>{
                        document.querySelector("#heart").classList.toggle("active");
                        request.open('PATCH', `${url}/${item.id}`, true);
                        request.setRequestHeader('x-access-token', token);
                        request.send(item.id);
                    })
                })
                }

            }
        }
    } catch (err) {
        console.log(err);
    }
});

