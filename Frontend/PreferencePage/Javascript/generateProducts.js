window.addEventListener("load", async (e) => {
    let token = "";
    let products = [];
    const dynamic = document.querySelector('.container');
    const local = localStorage.getItem("user");
    if (local) {
        token = JSON.parse(localStorage.getItem('user')).token;
    }
    e.preventDefault();
    console.log('Page is loaded');
    try {
        // let request = new XMLHttpRequest();
        // request.open('GET', 'http://localhost:5000/api/products');
        // request.send();
        // console.log(request.status);
        // console.log(request.getResponseHeader);
        // fetch('http://localhost:5000/api/products')
        // .then(response => response.json())
        // .then(data => console.log(data));

        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:5000/api/products', true);
        request.setRequestHeader('x-access-token', token);
        request.send();
        request.onreadystatechange = function () {
            if (request.readyState == XMLHttpRequest.DONE) {
                products = JSON.parse(request.responseText);
                console.log(products);
                document.querySelector("#preferance-span").textContent = `Showing ${products.slice(0, 100).length} products out of ${products.length}`;
                dynamic.innerHTML = products.slice(0, 100).map((item, index) =>
                `
                <div style="width: 45%;" id="card${index}">
                    <div class="box-content">
                    <img class="grid-img" src="${item.api_featured_image}">
                    <h2>${item.name}</h2>
                    <p>${item.price_sign}${item.price}</p>
                    <p>${item.brand}</p>
                    <button class="showmore"><a href="${window.location.protocol}//${window.location.host}/api/todos/${products[index].id}">See more details</a></button>
                    </div>
                </div>
                `
            ).join(" ");
            }
        }
    } catch (err) {
        console.log(err);
        // document.querySelector("#login-error").textContent = 'There has been an error';
    }
});

