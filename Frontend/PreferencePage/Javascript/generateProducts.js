window.addEventListener("load", async (e) => {
    let token = "";
    let products = [];
    const dynamic = document.querySelector('.container');
    const local = localStorage.getItem("user");
    if (local) {
        token = JSON.parse(localStorage.getItem('user')).token;
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
                console.log(products);
                document.querySelector("#preferance-span").textContent = `Showing ${products.slice(0, 100).length} products out of ${products.length}`;
                dynamic.innerHTML = products.slice(0, 100).map((item, index) =>
                `
                <div class="card-wrapper">
                    <div class="box-content">
                    <img class="grid-img" src="${item.api_featured_image}">
                    <h2>${item.name}</h2>
                    <p style="padding: 1em">${item.description}</p>
                    <p style="font-weight: 600">${item.price_sign}${item.price}</p>
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
                    request.open('PATCH', `${url}/${item.id}`, true);
                    request.setRequestHeader('x-access-token', token);
                    request.send(item.id);
                })
            })

            }
        }
    } catch (err) {
        console.log(err);
    }
});

