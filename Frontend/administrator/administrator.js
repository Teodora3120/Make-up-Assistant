let dynamic=document.querySelector('.box');
let idvalue="";
var product=[];
let originalproduct=[];
var el="";
window.checkProducts=async function(){
    //let dynamic=document.querySelector('.box');
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
        <p class="textlist" id="id" value="${item.id}">Id:${item.id}</p>
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
        <button type="button" id="modify-btn" class="submit-btn" onclick="goToModify(${item.id})">Modify</button>
        <button type="button" id="delete-btn" class="submit-btn" onclick="goToDelete(${item.id})">Delete</button>
    </div>
        `).join(" ");
            }
        }
    }catch (err) {
        console.log(err);
    }
}

window.goToModify=async function(id)
{
    idvalue=id;
    showProduct();
}
window.goToDelete=async function(id){
    idvalue=id;
    deleteProductById();
}
window.modifyProduct=async function(){
    idvalue="";
    const local = localStorage.getItem("user");
    console.log("I AM IN THE FUNCTION!");
   if (local) {
       token = JSON.parse(localStorage.getItem('user')).token;
   } else {
       return window.location.href = "http://localhost:5000/Frontend/notLoggedIn.html";
   }
    dynamic.innerHTML=`
    <p>Choose the id you want to modify</p>
    <form id="modify" class="input-modify" method="post">
        <input type="text" id="id" class="input-id" placeholder="" required>
        <h5 id="id-error" style="color: red; font-weight: 400; text-align: center; margin-top: 2em;"></h5>
        <button type="button" id="modify-btn" class="submit-btn" onclick="showProduct()">Find product</button>
      </form>
    `;
}
addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      //showProduct();
    }
  });
window.showProduct=async function(){
    if(idvalue=="")
    idvalue=document.querySelector("#id").value;
    console.log("THE VALUE OF ID: "+idvalue);
    const local = localStorage.getItem("user");
    console.log(idvalue);
    if (local) {
        token = JSON.parse(localStorage.getItem('user')).token;
    } else {
        return window.location.href = "http://localhost:5000/Frontend/notLoggedIn.html";
    }
    try{
         var request=new XMLHttpRequest();
        const url='http://localhost:5000/api/products/'+idvalue+"/";
        console.log(url);
        request.open('GET', url, true);
        console.log("I AM REQUESTING THE OBJECT");
        request.setRequestHeader('x-access-token', token);
        request.send();
        request.onreadystatechange = function () {
            console.log("onreadystechange IS FUNCTIONAL");
            if (request.readyState == XMLHttpRequest.DONE){
        console.log(JSON.parse(request.responseText));
        product=JSON.parse(request.responseText);
        originalproduct=JSON.parse(request.responseText);
        if(product.product_type==='lip_liner' || product.product_type==='lipstick' || product.product_type==='eyeliner' || product.product_type==='eyeshadow' || product.product_type==='blush' || product.product_type==='bronzer' || product.product_type==='mascara')
        {
            dynamic.innerHTML=
            `
        <form id="modify" class="input-modify" method="post">
        <p>Name</p>
        <input type="text" id="name" class="input-id" placeholder="" value="${product.name}">
        <p>Price</p>
        <input type="text" id="price" class="input-id" placeholder="" value="${product.price}">
        <p>Price sign</p>
        <input type="text" id="price-sign" class="input-id" placeholder=""  value="${product.price_sign}">
        <p>Link of the product</p>
        <input type="text" id="product-link" class="input-id" placeholder="" value="${product.product_link}">
        <p>Description</p>
        <input type="text" id="description" class="input-id" placeholder=""  value="${product.description}">
        <p>Rating</p>
        <input type="text" id="rating" class="input-id" placeholder="" value="${product.rating}">
        <p>Category</p>
        <input type="text" id="category" class="input-id" placeholder="" value="${product.category}">
        <p>Image link</p>
        <input type="text" id="featured_image" class="input-id" placeholder="" value="${product.api_featured_image}">
        <h5 id="id-error" style="color: red; font-weight: 400; text-align: center; margin-top: 2em;"></h5>
      </form>
      <label id="brand1" for="brandoption">Brands<br></label>
                <select name="brandoption" id="brand" size="10">
                <option value="nyx">Nyx</option>
                <option value="l'oreal">L'oreal</option>
                <option value="covergirl">Covergirl</option>
                <option value="dior">Dior</option>
                <option value="benefit">Benefit</option>
                <option value="smashbox">Smashbox</option>
                <option value="maybelline">Maybelline</option>
                <option value="physicians formula">Physicians formula</option>
                <option value="e.l.f">e.l.f</option>
                <option value="clinique">Clinique</option>
                </select>
        <label id="producttype1" for="producttypeoption">Type of product<br></label>
                <select name="producttypeoption" id="typeproduct" size="8">
                <option id="foundation" value="foundation">Foundation</option>
                <option id="lipliner" value="lip_liner">Lip Liner</option>
                <option id="lipstick" value="lipstick">Lipstick</option>
                <option id="eyeliner" value="eyeliner">Eyeliner</option>
                <option id="eyeshadow" value="eyeshadow">Eyeshadow</option>
                <option id="blush" value="blush">Blush</option>
                <option id="bronzer" value="bronzer">Bronzer</option>
                <option id="mascara" value="mascara">Mascara</option>
                </select>
      <label id="outfitcolor1" for="outfitcolors">Outfit colors<br></label>
                <select name="outfitcolors" id="outfitcolors" size="5">
                <option value="warm">Warm colors</option>
                <option value="cold">Cold colors</option>
                <option value="dark">Dark colors</option>
                <option value="light">Light colors</option>
                <option value="neutral">Neutral colors</option>
                </select>
        <label id="event1" for="eventoption">Event<br></label>
                <select name="eventoption" id="event" size="8">
                <option value="party">Party</option>
                <option value="goingOut">Going out</option>
                <option value="date">Date</option>
                <option value="funeral">Funeral</option>
                <option value="wedding">Wedding</option>
                <option value="bride">Bride</option>
                <option value="christmas">Christmas</option>
                <option value="newYearsEve">New Year's Eve</option>
                </select>
        <label id="eyecolor1" for="eyecoloroption">Eye color<br></label>
                <select name="eyecoloroption" id="eyecolor" size="5">
                <option value="green">Green</option>
                <option value="brown">Brown</option>
                <option value="hazel">Hazel</option>
                <option value="blue">Blue</option>
                <option value="black">Black</option>
                </select>
         <label id="haircolor1" for="haircoloroption">Hair color<br></label>
                <select name="haircoloroption" id="haircolor" size="5">
                <option value="blonde">Blonde</option>
                <option value="brunette">Brunette</option>
                <option value="brown">Brown</option>
                <option value="red">Red</option>
                <option value="others">Others</option>
                </select>
         <label id="vegan1" for="veganoption">Vegan<br></label>
                <select name="veganoption" id="vegan" size="2">
                <option value="true">Yes</option>
                <option value="false">No</option>
                </select>
        <button type="button" class="submit-btn" onclick="modifyProduct()">Cancel</button>
        <button type="button" class="submit-btn" onclick="beginModifyProduct()">Modify</button>
        `;
        var selectoutfitcolors=document.getElementById("outfitcolors");
        var selectevent=document.getElementById("event");
        var selecteyecolor=document.getElementById("eyecolor");
        var selecthaircolor=document.getElementById("haircolor");
        var selectvegan=document.getElementById("vegan");
        var selectbrand=document.getElementById("brand");
        var selecttypeproduct=document.getElementById("typeproduct");
        selectoutfitcolors.value=product.outfitcolors;
        selectevent.value=product.event;
        selecteyecolor.value=product.eyecolor;
        selecthaircolor.value=product.haircolor;
        selectvegan.value=product.vegan;
        selectbrand.value=product.brand;
        selecttypeproduct.value=product.product_type;
    }
        else{
            dynamic.innerHTML=
            `
        <form id="modify" class="input-modify" method="post">
        <p>Name</p>
        <input type="text" id="name" class="input-id" placeholder="" value="${product.name}">
        <p>Price</p>
        <input type="text" id="price" class="input-id" placeholder="" value="${product.price}">
        <p>Price sign</p>
        <input type="text" id="price-sign" class="input-id" placeholder=""  value="${product.price_sign}">
        <p>Link of the product</p>
        <input type="text" id="product-link" class="input-id" placeholder="" value="${product.product_link}">
        <p>Description</p>
        <input type="text" id="description" class="input-id" placeholder=""  value="${product.description}">
        <p>Rating</p>
        <input type="text" id="rating" class="input-id" placeholder="" value="${product.rating}">
        <p>Category</p>
        <input type="text" id="category" class="input-id" placeholder="" value="${product.category}">
        <p>Image link</p>
        <input type="text" id="featured_image" class="input-id" placeholder="" value="${product.api_featured_image}">
        <h5 id="id-error" style="color: red; font-weight: 400; text-align: center; margin-top: 2em;"></h5>
      </form>
      <label id="brand1" for="brandoption">Brands<br></label>
                <select name="brandoption" id="brand" size="10">
                <option value="nyx">Nyx</option>
                <option value="l'oreal">L'oreal</option>
                <option value="covergirl">Covergirl</option>
                <option value="dior">Dior</option>
                <option value="benefit">Benefit</option>
                <option value="smashbox">Smashbox</option>
                <option value="maybelline">Maybelline</option>
                <option value="physicians formula">Physicians formula</option>
                <option value="e.l.f">e.l.f</option>
                <option value="clinique">Clinique</option>
                </select>
        <label id="producttype1" for="producttypeoption">Type of product<br></label>
                <select name="producttypeoption" id="typeproduct" size="8">
                <option id="foundation" value="foundation">Foundation</option>
                <option id="lipliner" value="lip_liner">Lip Liner</option>
                <option id="lipstick" value="lipstick">Lipstick</option>
                <option id="eyeliner" value="eyeliner">Eyeliner</option>
                <option id="eyeshadow" value="eyeshadow">Eyeshadow</option>
                <option id="blush" value="blush">Blush</option>
                <option id="bronzer" value="bronzer">Bronzer</option>
                <option id="mascara" value="mascara">Mascara</option>
                </select>
      <label id="outfitcolor1" for="outfitcolors">Outfit colors<br></label>
                <select name="outfitcolors" id="outfitcolors" size="5">
                <option value="warm">Warm colors</option>
                <option value="cold">Cold colors</option>
                <option value="dark">Dark colors</option>
                <option value="light">Light colors</option>
                <option value="neutral">Neutral colors</option>
                </select>
        <label id="event1" for="eventoption">Event<br></label>
                <select name="eventoption" id="event" size="8">
                <option value="party">Party</option>
                <option value="goingOut">Going out</option>
                <option value="date">Date</option>
                <option value="funeral">Funeral</option>
                <option value="wedding">Wedding</option>
                <option value="bride">Bride</option>
                <option value="christmas">Christmas</option>
                <option value="newYearsEve">New Year's Eve</option>
                </select>
        <label id="eyecolor1" for="eyecoloroption">Eye color<br></label>
                <select name="eyecoloroption" id="eyecolor" size="5">
                <option value="green">Green</option>
                <option value="brown">Brown</option>
                <option value="hazel">Hazel</option>
                <option value="blue">Blue</option>
                <option value="black">Black</option>
                </select>
        <label id="haircolor1" for="haircoloroption">Hair color<br></label>
                <select name="haircoloroption" id="haircolor" size="5">
                <option value="blonde">Blonde</option>
                <option value="brunette">Brunette</option>
                <option value="brown">Brown</option>
                <option value="red">Red</option>
                <option value="others">Others</option>
                </select>
        <label id="vegan1" for="veganoption">Vegan<br></label>
                <select name="veganoption" id="vegan" size="2">
                <option value="true">Yes</option>
                <option value="false">No</option>
                </select>
        <label id="skinage1" for="skinageoption">Skin Age<br></label>
                <select name="skinageoption" id="skinage" size="3">
                <option value="teen"> Teen (16-20 years)</option>
                <option value="young"> Young (20-40 years)</option>
                <option value="mature"> Mature (40+ years)</option>
                </select>
        <label id="skintypes1" for="skintypesoption">Skin types<br></label>
                <select name="skintypesoption" id="skintypes" size="6">
                <option value="oily">Oily</option>
                <option value="dry">Dry</option>
                <option value="mixed">Mixed</option>
                <option value="dryacneic">Dry and acneic</option>
                <option value="oilyacneic">Oily and acneic</option>
                <option value="mixedacneic">Mixed and acneic</option>
                </select>
        <button type="button" class="submit-btn" onclick="modifyProduct()">Cancel</button>
        <button type="button" class="submit-btn" onclick="beginModifyProduct()">Modify</button>
        `;
        var selectoutfitcolors=document.getElementById("outfitcolors");
        var selectevent=document.getElementById("event");
        var selecteyecolor=document.getElementById("eyecolor");
        var selecthaircolor=document.getElementById("haircolor");
        var selectvegan=document.getElementById("vegan");
        var selectbrand=document.getElementById("brand");
        var selectskinage=document.getElementById("skinage");
        var selectskintypes=document.getElementById("skintypes");
        var selecttypeproduct=document.getElementById("typeproduct");
        selectoutfitcolors.value=product.outfitcolors;
        selectevent.value=product.event;
        selecteyecolor.value=product.eyecolor;
        selecthaircolor.value=product.haircolor;
        selectvegan.value=product.vegan;
        selectbrand.value=product.brand;
        selectskinage.value=product.skinage;
        selectskintypes.value=product.skintypes;
        selecttypeproduct.value=product.product_type;
        }
          }
        }
    }catch (err) {
        console.log(err);
    }
   
}

window.beginModifyProduct=async function(){
    const local = localStorage.getItem("user");
    var modifiedproduct=product;
    if (local) {
        token = JSON.parse(localStorage.getItem('user')).token;
    } else {
        return window.location.href = "http://localhost:5000/Frontend/notLoggedIn.html";
    }
     if(product.product_type==='lip_liner' || product.product_type==='lipstick' || product.product_type==='eyeliner' || product.product_type==='eyeshadow' || product.product_type==='blush' || product.product_type==='bronzer' || product.product_type==='mascara')
    {
        modifiedproduct.name=document.getElementById("name").value;
        modifiedproduct.price=document.getElementById("price").value;
        modifiedproduct.price_sign=document.getElementById("price-sign").value;
        modifiedproduct.product_link=document.getElementById("product-link").value;
        modifiedproduct.description=document.getElementById("description").value;
        modifiedproduct.rating=document.getElementById("rating").value;
        modifiedproduct.category=document.getElementById("category").value;
        modifiedproduct.api_featured_image=document.getElementById("featured_image").value;
        modifiedproduct.outfitcolors=document.getElementById("outfitcolors").value;
        modifiedproduct.event=document.getElementById("event").value;
        modifiedproduct.eyecolor=document.getElementById("eyecolor").value;
        modifiedproduct.haircolor=document.getElementById("haircolor").value;
        modifiedproduct.vegan=document.getElementById("vegan").value;
        modifiedproduct.brand=document.getElementById("brand").value;
        modifiedproduct.product_type=document.getElementById("typeproduct").value;
    }else{
        modifiedproduct.name=document.getElementById("name").value;
        modifiedproduct.price=document.getElementById("price").value;
        modifiedproduct.price_sign=document.getElementById("price-sign").value;
        modifiedproduct.product_link=document.getElementById("product-link").value;
        modifiedproduct.description=document.getElementById("description").value;
        modifiedproduct.rating=document.getElementById("rating").value;
        modifiedproduct.category=document.getElementById("category").value;
        modifiedproduct.api_featured_image=document.getElementById("featured_image").value;
        modifiedproduct.outfitcolors=document.getElementById("outfitcolors").value;
        modifiedproduct.event=document.getElementById("event").value;
        modifiedproduct.eyecolor=document.getElementById("eyecolor").value;
        modifiedproduct.haircolor=document.getElementById("haircolor").value;
        modifiedproduct.vegan=document.getElementById("vegan").value;
        modifiedproduct.brand=document.getElementById("brand").value;
        modifiedproduct.skinage=document.getElementById("skinage").value;
        modifiedproduct.skintypes=document.getElementById("skintypes").value;
        modifiedproduct.product_type=document.getElementById("typeproduct").value;
    }
    console.log("Begin to modify!");
    console.log("THIS IS THE ORIGINAL PRODUCT"+originalproduct.event);
    console.log("THIS IS THE MODIFIED PRODUCT"+product.event);
    try{
        var request=new XMLHttpRequest();
       const url='http://localhost:5000/api/products/updateproduct';
       console.log(url);
       request.open('PUT', url, true);
       console.log("I AM REQUESTING THE OBJECT");
       request.setRequestHeader('x-access-token', token);
       request.send(JSON.stringify(product));
    }catch (err) {
        console.log(err);
    }
    try{
        dynamic.innerHTML=`
    <p>Choose the id you want to modify</p>
    <form id="modify" class="input-modify" method="post">
        <input type="text" id="id" class="input-id" placeholder="" required>
        <h5 id="id-error" style="color: red; font-weight: 400; text-align: center; margin-top: 2em;"></h5>
        <button type="button" class="submit-btn" onclick="showProduct()">Find product</button>
      </form>
    `;
    }catch (err) {
        console.log(err);
    }
    
}

window.deleteProduct=async function(){
    idvalue="";
    const local = localStorage.getItem("user");
    console.log("I AM IN THE FUNCTION!");
   if (local) {
       token = JSON.parse(localStorage.getItem('user')).token;
   } else {
       return window.location.href = "http://localhost:5000/Frontend/notLoggedIn.html";
   }
    dynamic.innerHTML=`
    <p>Choose the id you want to delete</p>
    <form id="delete" class="input-delete" method="post">
        <input type="text" id="id-delete" class="input-id" placeholder="" required>
        <h5 id="id-error" style="color: red; font-weight: 400; text-align: center; margin-top: 2em;"></h5>
        <button type="button" id="delete-btn" class="submit-btn" onclick="deleteProductById()">Find product</button>
      </form>
    `;
}

window.deleteProductById=async function(){
    if(idvalue=="")
    idvalue=document.querySelector("#id-delete").value;
    const local = localStorage.getItem("user");
    console.log("I AM IN THE FUNCTION!");
   if (local) {
       token = JSON.parse(localStorage.getItem('user')).token;
   } else {
       return window.location.href = "http://localhost:5000/Frontend/notLoggedIn.html";
   }
   try{
    var request=new XMLHttpRequest();
   const url='http://localhost:5000/api/products/'+idvalue+"/";
   console.log(url);
   request.open('GET', url, true);
   console.log("I AM REQUESTING THE OBJECT");
   request.setRequestHeader('x-access-token', token);
   request.send();
   request.onreadystatechange = function () {
    console.log("onreadystechange IS FUNCTIONAL");
    if (request.readyState == XMLHttpRequest.DONE){
console.log(JSON.parse(request.responseText));
product=JSON.parse(request.responseText);
if(product.product_type==='lip_liner' || product.product_type==='lipstick' || product.product_type==='eyeliner' || product.product_type==='eyeshadow' || product.product_type==='blush' || product.product_type==='bronzer' || product.product_type==='mascara')
    {
        dynamic.innerHTML=`
        <p>Name: ${product.name}</p>
        <p>Brand: ${product.brand}</p>
        <p>Price: ${product.price}</p>
        <p>Sign of price: ${product.price_sign}</p>
        <p>Link of product: ${product.product_link}</p>
        <p>Description: ${product.description}</p>
        <p>rating: ${product.rating}</p>
        <p>Type of product: ${product.product_type}</p>
        <p>Featured image: ${product.api_featured_image}</p>
        <p>Outfit colors: ${product.outfitcolors}</p>
        <p>Event: ${product.event}</p>
        <p>Eye color: ${product.eyecolor}</p>
        <p>Hair color: ${product.haircolor}</p>
        <p>Vegan: ${product.vegan}</p>
        <button type="button" class="submit-btn" onclick="deleteProduct()">Cancel</button>
        <button type="button" class="submit-btn" onclick="beginDeleteproduct()">Delete</button>
        `;
    } else{
         dynamic.innerHTML=`
        <p>Name: ${product.name}</p>
        <p>Brand: ${product.brand}</p>
        <p>Price: ${product.price}</p>
        <p>Sign of price: ${product.price_sign}</p>
        <p>Link of product: ${product.product_link}</p>
        <p>Description: ${product.description}</p>
        <p>rating: ${product.rating}</p>
        <p>Type of product: ${product.product_type}</p>
        <p>Featured image: ${product.api_featured_image}</p>
        <p>Outfit colors: ${product.outfitcolors}</p>
        <p>Event: ${product.event}</p>
        <p>Eye color: ${product.eyecolor}</p>
        <p>Hair color: ${product.haircolor}</p>
        <p>Skin age: ${product.skinage}</p>
        <p>Skin type: ${product.skintypes}</p>
        <p>Vegan: ${product.vegan}</p>
        <button type="button" class="submit-btn" onclick="deleteProduct()">Cancel</button>
        <button type="button" class="submit-btn" onclick="beginDeleteproduct()">Delete</button>
        `;
    }
    }
}
   }catch (err) {
    console.log(err);
}
}

window.beginDeleteproduct=async function(){
    const local = localStorage.getItem("user");
    console.log("I AM IN THE FUNCTION!");
   if (local) {
       token = JSON.parse(localStorage.getItem('user')).token;
   } else {
       return window.location.href = "http://localhost:5000/Frontend/notLoggedIn.html";
   }
   try{
    var request=new XMLHttpRequest();
   const url='http://localhost:5000/api/products/'+idvalue+"/";
   console.log(url);
   request.open('DELETE', url, true);
   console.log("I AM REQUESTING THE OBJECT");
   request.setRequestHeader('x-access-token', token);
   request.send();
  
}catch (err) {
    console.log(err);
}
dynamic.innerHTML=`
    <p>Choose the id you want to delete</p>
    <form id="delete" class="input-delete" method="post">
        <input type="text" id="id-delete" class="input-id" placeholder="" required>
        <h5 id="id-error" style="color: red; font-weight: 400; text-align: center; margin-top: 2em;"></h5>
        <button type="button" id="delete-btn" class="submit-btn" onclick="deleteProductById()">Find product</button>
      </form>
    `;
}

window.addProduct=async function(){
    let dynamic=document.querySelector('.box');
    dynamic.innerHTML=`<p>add product</p>`;
}
