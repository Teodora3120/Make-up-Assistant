window.checkProducts=async function(){
    let dynamic=document.querySelector('.box');
     const local = localStorage.getItem("user");
     console.log("I AM IN THE FUNCTION!");
    if (local) {
        token = JSON.parse(localStorage.getItem('user')).token;
    } else {
        return window.location.href = "http://localhost:5000/Frontend/notLoggedIn.html";
    }
    try{
         var request=new XMLHttpRequest();
        const url='http://localhost:5000/api/products';
        request.open('GET', url, true);
        console.log("I AM REQUESTING THE OBJECTS");
        request.setRequestHeader('x-access-token', token);
        request.send();
        request.onreadystatechange = function () {
            console.log("onreadystechange IS FUNCTIONAL");
            if (request.readyState == XMLHttpRequest.DONE){
        console.log(JSON.parse(request.responseText));
        const products=JSON.parse(request.responseText);
    dynamic.innerHTML=products.map((item, index)=>`
    <div class="list-objects">    
        <p class="textlist">Id:${item.id}</p>
        <p class="textlist">Brand:${item.brand}</p>
        <p class="textlist">Name:${item.name}</p>
        <p class="textlist">Price:${item.price}</p>
        <p class="textlist">Price sign:${item.sign}</p>
        <p class="textlist">Link product:${item.product_link}</p>
        <p class="textlist">description:${item.description}</p>
        <p class="textlist">Rating:${item.rating}</p>
        <p class="textlist">API featured image:${item.api_featured_image}</p>
        <p class="textlist">Outfit colors:${item.outfitcolors}</p>
        <p class="textlist">For event:${item.event}</p>
        <p class="textlist">Eyecolor:${item.eyecolor}</p>
        <p class="textlist">Haircolor:${item.haircolor}</p>
        <p class="textlist">Vegan:${item.vegan}</p>
        <p class="textlist">Skin age:${item.skinage}</p>
        <p class="textlist">Skin type:${item.skintypes}</p>
    </div>
        `).join(" ");
            }
        }
    }catch (err) {
        console.log(err);
    }
}

window.modifyProduct=async function(){
    let dynamic=document.querySelector('.box');
    dynamic.innerHTML=`<p>modify product</p>`;
}

window.modifyProduct=async function(){
    let dynamic=document.querySelector('.box');
    dynamic.innerHTML=`<p>delete</p>`;
}

window.modifyProduct=async function(){
    let dynamic=document.querySelector('.box');
    dynamic.innerHTML=`<p>add product</p>`;
}
