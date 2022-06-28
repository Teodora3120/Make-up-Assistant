let dynamic=document.querySelector('.box');
let idvalue="";
var product=[];
let originalproduct=[];
var el="";
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
        if (Array.isArray(products) == false && products.message === "Invalid Token") {
            console.log("This session has been expired. Click here to login again");

            return dynamic.innerHTML =
                `
                 <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                 <h3>Your session has expired.</h3>
                 <h4 style="margin-top:2em; font-weight: 400;">Click <a style="color: #1a0dab;" href="/Frontend/loginRegisterPage.html"> here </a> to login again.</h4>
                 </div>
                 `
        }
        dynamic.innerHTML=`
        <div class="filter-check">
        <h2>Filter</h2>
        <label id="filterbrand1" for="filterbrandoption">Brand<br></label>
                <select name="filterbrandoption" id="filterbrand">
                <option id="choose" value="choose" selected>Choose</option>
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
        <label id="filterproducttype1" for="filterproducttypeoption">Type of product<br></label>
                <select name="filterproducttypeoption" id="filtertypeproduct">
                <option id="choose" value="choose" selected>Choose</option>
                <option id="foundation" value="foundation">Foundation</option>
                <option id="lipliner" value="lip_liner">Lip Liner</option>
                <option id="lipstick" value="lipstick">Lipstick</option>
                <option id="eyeliner" value="eyeliner">Eyeliner</option>
                <option id="eyeshadow" value="eyeshadow">Eyeshadow</option>
                <option id="blush" value="blush">Blush</option>
                <option id="bronzer" value="bronzer">Bronzer</option>
                <option id="mascara" value="mascara">Mascara</option>
                </select>
        <label id="filteroutfitcolor1" for="filteroutfitcolors">Outfit colors<br></label>
                <select name="filteroutfitcolors" id="filteroutfitcolors">
                <option id="choose" value="choose" selected>Choose</option>
                <option value="warm">Warm colors</option>
                <option value="cold">Cold colors</option>
                <option value="dark">Dark colors</option>
                <option value="light">Light colors</option>
                <option value="neutral">Neutral colors</option>
                </select>
        <label id="filterevent1" for="filtereventoption">Event<br></label>
                <select name="filtereventoption" id="filterevent">
                <option id="choose" value="choose" selected>Choose</option>
                <option value="party">Party</option>
                <option value="goingOut">Going out</option>
                <option value="date">Date</option>
                <option value="funeral">Funeral</option>
                <option value="wedding">Wedding</option>
                <option value="bride">Bride</option>
                <option value="christmas">Christmas</option>
                <option value="newYearsEve">New Year's Eve</option>
                </select>
        <label id="filtereyecolor1" for="filtereyecoloroption">Eye color<br></label>
                <select name="filtereyecoloroption" id="filtereyecolor">
                <option id="choose" value="choose" selected>Choose</option>
                <option value="green">Green</option>
                <option value="brown">Brown</option>
                <option value="hazel">Hazel</option>
                <option value="blue">Blue</option>
                <option value="black">Black</option>
                </select>
        <label id="filterhaircolor1" for="filterhaircoloroption">Hair color<br></label>
                <select name="filterhaircoloroption" id="filterhaircolor">
                <option id="choose" value="choose" selected>Choose</option>
                <option value="blonde">Blonde</option>
                <option value="brunette">Brunette</option>
                <option value="brown">Brown</option>
                <option value="red">Red</option>
                <option value="others">Others</option>
                </select>
        <label id="filtervegan1" for="filterveganoption">Vegan<br></label>
                <select name="filterveganoption" id="filtervegan">
                <option id="choose" value="choose" selected>Choose</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
                </select>
        <label id="filterskinage1" for="filterskinageoption">Skin Age<br></label>
                <select name="filterskinageoption" id="filterskinage">
                <option id="choose" value="choose" selected>Choose</option>
                <option value="teen"> Teen (16-20 years)</option>
                <option value="young"> Young (20-40 years)</option>
                <option value="mature"> Mature (40+ years)</option>
                </select>
        <label id="filterskintypes1" for="filterskintypesoption">Skin types<br></label>
                <select name="filterskintypesoption" id="filterskintypes">
                <option id="choose" value="choose" selected>Choose</option>
                <option value="oily">Oily</option>
                <option value="dry">Dry</option>
                <option value="mixed">Mixed</option>
                <option value="dryacneic">Dry and acneic</option>
                <option value="oilyacneic">Oily and acneic</option>
                <option value="mixedacneic">Mixed and acneic</option>
                </select>
        <button type="button" class="toggle-btn" onclick="setFilter()">Submit</button>
        </div>
        <div id="filtered-elements">
        </div>
        `;
        dynamic=document.querySelector("#filtered-elements");
    dynamic.innerHTML=products.map((item, index)=>`
    <div class="list-objects" id="filter-products">    
        <p class="textlist" id="id" value="${item.id}">Id:${item.id}</p>
        <p class="textlist">Brand:${item.brand}</p>
        <p class="textlist">Name:${item.name}</p>
        <p class="textlist">Price:${item.price}</p>
        <p class="textlist">Price sign:${item.price_sign}</p>
        <p class="textlist">Category:${item.category}</p>
        <p class="textlist">Product type:${item.product_type}</p>
        <p class="textlist">Link product:${item.product_link}</p>
        <p class="textlist">Description:${item.description}</p>
        <p class="textlist">Rating:${item.rating}</p>
        <p class="textlist">Image:${item.api_featured_image}</p>
        <p class="textlist">Outfit colors:${item.outfitcolors}</p>
        <p class="textlist">For event:${item.event}</p>
        <p class="textlist">Eyecolor:${item.eyecolor}</p>
        <p class="textlist">Haircolor:${item.haircolor}</p>
        <p class="textlist">Vegan:${item.vegan}</p>
        <p class="textlist">Skin age:${item.skinage}</p>
        <p class="textlist">Skin type:${item.skintypes}</p>
        <button type="button" id="modify-btn" class="toggle-btn" onclick="goToModify(${item.id})">Modify</button>
        <button type="button" id="delete-btn" class="toggle-btn" onclick="goToDelete(${item.id})">Delete</button>
    </div>
        `).join(" ");
            }
        }
    }catch (err) {
        console.log(err);
    }
}

window.setFilter=async function(){
    dynamic=document.querySelector('#filtered-elements');
    product=[];
    idvalue='';
    const local = localStorage.getItem("user");
    var filter=[];
   if (local) {
       token = JSON.parse(localStorage.getItem('user')).token;
   } else {
       return window.location.href = "http://localhost:5000/Frontend/notLoggedIn.html";
   }
    filter.outfitcolors=document.getElementById("filteroutfitcolors").value;
    filter.event=document.getElementById("filterevent").value;
    filter.eyecolor=document.getElementById("filtereyecolor").value;
    filter.haircolor=document.getElementById("filterhaircolor").value;
    filter.vegan=document.getElementById("filtervegan").value;
    filter.brand=document.getElementById("filterbrand").value;
    filter.skinage=document.getElementById("filterskinage").value;
    filter.skintypes=document.getElementById("filterskintypes").value;
    filter.product_type=document.getElementById("filtertypeproduct").value;
    try{
        var request=new XMLHttpRequest();
       const url='http://localhost:5000/api/products/filtercheck';
       console.log(url);
       request.open('POST', url, true);
       console.log("I AM REQUESTING THE OBJECTS");
       request.setRequestHeader('x-access-token', token);
       console.log("THE FILTER IS: " + JSON.stringify(filter));
       request.send(JSON.stringify({brand:filter.brand,outfitcolors:filter.outfitcolors,event:filter.event, 
        eyecolor:filter.eyecolor, haircolor:filter.haircolor, vegan:filter.vegan, skinage:filter.skinage,
         skintypes:filter.skintypes, product_type:filter.product_type}));
       request.onreadystatechange = function () {
        console.log("onreadystechange IS FUNCTIONAL");
        if (request.readyState == XMLHttpRequest.DONE){
            dynamic=document.querySelector('#filtered-elements');
    console.log(JSON.parse(request.responseText));
    product=JSON.parse(request.responseText);
    //console.log("THE FILTERED PRODUCTS ARE" + products1.brand);
    
    if (Array.isArray(product) == false && product.message === "Invalid Token") {
        console.log("This session has been expired. Click here to login again");

        return dynamic.innerHTML =
            `
             <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
             <h3>Your session has expired.</h3>
             <h4 style="margin-top:2em; font-weight: 400;">Click <a style="color: #1a0dab;" href="/Frontend/loginRegisterPage.html"> here </a> to login again.</h4>
             </div>
             `
    }
    dynamic.innerHTML=product.map((item1, index)=>`
    <div class="list-objects" id="filter-products">    
        <p class="textlist" id="id" value="${item1.id}">Id:${item1.id}</p>
        <p class="textlist">Brand:${item1.brand}</p>
        <p class="textlist">Name:${item1.name}</p>
        <p class="textlist">Price:${item1.price}</p>
        <p class="textlist">Price sign:${item1.price_sign}</p>
        <p class="textlist">Category:${item1.category}</p>
        <p class="textlist">Product type:${item1.product_type}</p>
        <p class="textlist">Link product:${item1.product_link}</p>
        <p class="textlist">description:${item1.description}</p>
        <p class="textlist">Rating:${item1.rating}</p>
        <p class="textlist">API featured image:${item1.api_featured_image}</p>
        <p class="textlist">Outfit colors:${item1.outfitcolors}</p>
        <p class="textlist">For event:${item1.event}</p>
        <p class="textlist">Eyecolor:${item1.eyecolor}</p>
        <p class="textlist">Haircolor:${item1.haircolor}</p>
        <p class="textlist">Vegan:${item1.vegan}</p>
        <p class="textlist">Skin age:${item1.skinage}</p>
        <p class="textlist">Skin type:${item1.skintypes}</p>
        <button type="button" id="modify-btn" class="toggle-btn" onclick="goToModify(${item1.id})">Modify</button>
        <button type="button" id="delete-btn" class="toggle-btn" onclick="goToDelete(${item1.id})">Delete</button>
    </div>
        `).join(" ");
        }
    }
    }catch (err) {
        console.log(err);
    }
    dynamic=document.querySelector('.box');
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
    dynamic=document.querySelector('.box');
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
        <h5 id="id-error" style="color: red; font-weight: 400; text-align: left; margin-top: 2em;"></h5>
        <button type="button" id="modify-btn" class="toggle-btn" onclick="showProduct()">Find product</button>
      </form>
    `;
}
window.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      //showProduct();
    }
  });
window.showProduct=async function(){
    dynamic=document.querySelector('.box');
    console.log("IDVALUE IS "+idvalue);
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
        idvalue="";
        if (Array.isArray(product) == false && product.message === "Invalid Token") {
            console.log("This session has been expired. Click here to login again");

            return dynamic.innerHTML =
                `
                 <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                 <h3>Your session has expired.</h3>
                 <h4 style="margin-top:2em; font-weight: 400;">Click <a style="color: #1a0dab;" href="/Frontend/loginRegisterPage.html"> here </a> to login again.</h4>
                 </div>
                 `
        }
        if(product===-1)
        {
            dynamic=document.querySelector('#id-error');
            dynamic.innerHTML=`
            <p>Id doesn't exist!</p>
            `;
            dynamic=document.querySelector('.box');
        }
        else   
        if(product.product_type==='lip_liner' || product.product_type==='lipstick' || product.product_type==='eyeliner' || product.product_type==='eyeshadow' || product.product_type==='blush' || product.product_type==='bronzer' || product.product_type==='mascara')
        {
            dynamic.innerHTML=
            `
        <div class="filter-check">
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
        <button type="button" class="toggle-btn" onclick="modifyProduct()">Cancel</button>
        <button type="button" class="toggle-btn" onclick="beginModifyProduct()">Modify</button>
        </div>
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
        <div class="filter-check">
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
        <button type="button" class="toggle-btn" onclick="modifyProduct()">Cancel</button>
        <button type="button" class="toggle-btn" onclick="beginModifyProduct()">Modify</button>
        </div>
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
    dynamic=document.querySelector('.box');
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
        <h5 id="id-error" style="color: red; font-weight: 400; text-align: left; margin-top: 2em;"></h5>
        <button type="button" class="toggle-btn" onclick="showProduct()">Find product</button>
      </form>
    `;
    }catch (err) {
        console.log(err);
    }
    
}

window.deleteProduct=async function(){
    idvalue="";
    dynamic=document.querySelector('.box');
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
        <h5 id="id-error" style="color: red; font-weight: 400; text-align: left; margin-top: 2em;"></h5>
        <button type="button" id="delete-btn" class="toggle-btn" onclick="deleteProductById()">Find product</button>
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
//idvalue="";
if (Array.isArray(product) == false && product.message === "Invalid Token") {
    console.log("This session has been expired. Click here to login again");

    return dynamic.innerHTML =
        `
         <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
         <h3>Your session has expired.</h3>
         <h4 style="margin-top:2em; font-weight: 400;">Click <a style="color: #1a0dab;" href="/Frontend/loginRegisterPage.html"> here </a> to login again.</h4>
         </div>
         `
}
if(product===-1)
{
    dynamic=document.querySelector('#id-error');
    dynamic.innerHTML=`
        <p>Id doesn't exist!</p>
    `;
    
}
else{
    dynamic=document.querySelector('.box');
    console.log("I PASS THROUGH HERE!");
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
        <button type="button" class="toggle-btn" onclick="deleteProduct()">Cancel</button>
        <button type="button" class="toggle-btn" onclick="beginDeleteproduct()">Delete</button>
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
        <button type="button" class="toggle-btn" onclick="deleteProduct()">Cancel</button>
        <button type="button" class="toggle-btn" onclick="beginDeleteproduct()">Delete</button>
        `;
    }
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
        <h5 id="id-error" style="color: red; font-weight: 400; text-align: left; margin-top: 2em;"></h5>
        <button type="button" id="delete-btn" class="toggle-btn" onclick="deleteProductById()">Find product</button>
      </form>
    `;
}

window.addProduct=async function(){
    let dynamic=document.querySelector('.box');
    dynamic.innerHTML=`
    <p>Insert data about the product you wish to add</p>
    <br>
    <p>ALL FIELDS ARE REQUIRED!</p>
    <br>
    <p>Product name:</p>
    <input type="text" id="productName" class="input-id" placeholder="" required>
    <br><p>Price: </p>
    <input type="text" id="price" class="input-id" placeholder="" required>
    <br>
    <p>Price sign</p>
    <input type="text" id="price-sign" class="input-id" placeholder="" required>
    <br>
    <p>Product link: </p>
    <input type="text" id="product-link" class="input-id" placeholder="" required>
    <br>
    <p>Product image link: </p>
    <input type="text" id="product-image-link" class="input-id" placeholder="" required>
    <br><p>Description</p>
    <input type="text" id="description" class="input-id" placeholder=""  required>
    <br><p>Brand name</p>
    <input type="text" id="brandName" class="input-id" placeholder="" required>
    <br><p>Category</p>
    <select id="category" class="input-id" required>
        <option value="lipstick">lipstick</option>
        <option value="powder">Powder</option>
        <option value="pencil">Pencil</option>
        <option value="palette">Palette</option>
        <option value="cream">Cream</option>
        <option value="lipGloss">Lip gloss</option>
        <option value="concealer">Concealer</option>
        <option value="mineral">Mineral</option>
        <option value="gel">Gel</option>
    </select>
    <br><p>Product type</p>
    <select id="productType" class="input-id" required>
        <option value="foundation">Foundation</option>
        <option value="eyeliner">Eyeliner</option>
        <option value="lipstick">Lipstick</option>
        <option value="blush"></option>
        <option value="mascara"></option>
        <option value="eyeshadow"></option>
        <option value="nailPolish"></option>
        <option value="eyebrow"></option>
        <option value="bronzer"></option>
        <option value="lipLiner"></option>
    </select>
    <br><p>Skin type</p>
    <select id="skinType" class="input-id" required>
        <option value="dry">Dry</option>
        <option value="oily">Oily</option>
        <option value="mixed">Mixed</option>
        <option value="dryAcneic">Dry & Acneic</option>
        <option value="oilyAcneic">Oily & Acneic</option>
        <option value="mixedAcneic">Mixed & Acneic</option>
    </select>
    <br><p>Skin age</p>
    <select id="skinAge" class="input-id" required>
        <option value="teen">Teen(16-20 yrs old)</option>
        <option value="young">Young(20-40)</option>
        <option value="mature">Mature(40+)</option>
    </select>
    <br><p>Hair color</p>
    <select id="haircolor" class="input-id" required>
        <option value="blonde">Blonde</option>
        <option value="brunette">Brunette</option>
        <option value="red">Red</option>
        <option value="brown">Brown</option>
        <option value="others">Others</option>
    </select>
    <br><p>Eye color</p>
    <select id="eyecolor" class="input-id" required>
        <option value="blue">Blue</option>
        <option value="brown">Brown</option>
        <option value="hazel">Hazel</option>
        <option value="green">Green</option>
        <option value="black">Black</option>
    </select>
    <br><p>Event</p>
    <select id="event" class="input-id" required>
        <option value="party">Party</option>
        <option value="goingOut">Going Out</option>
        <option value="date">Date</option>
        <option value="wedding">Wedding</option>
        <option value="bride">Bride</option>
        <option value="funeral">Funeral</option>
        <option value="christmas">Christmas</option>
        <option value="newYearsEve">New Year's Eve</option>
    </select>
    <br><p>Outfit colors</p>
    <select id="outfitColors" class="input-id" required>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="neutral">Neutral</option>
        <option value="cold">Cold</option>
        <option value="warm">Warm</option>
    </select>
    <br><p>Vegan</p>
    <select id="vegan" class="input-id" required>
        <option value="true">Yes</option>
        <option value="false">No</option>
    </select>
    <br>
    <br>
    <button type="button" id="productAddbttn" class="submit-bttn" onclick="addProductForm()">Add</button>
    `;
}

window.addProductForm = async function(){
    product = {
        brand: document.querySelector("#brandName").value,
        name: document.querySelector("#productName").value,
        price: document.querySelector("#price").value,
        price_sign: document.querySelector("#price-sign").value,
        product_link: document.querySelector("#product-link").value,
        description: document.querySelector("#description").value,
        rating: 0,
        category: document.querySelector("#category").value,
        product_type: document.querySelector("#productType").value,
        product_api_url: "",
        api_featured_image: document.querySelector("#product-image-link").value,
        skintypes: document.querySelector("#skinType").value,
        skinage: document.querySelector("#skinAge").value,
        haircolor: document.querySelector("#haircolor").value,
        eyecolor: document.querySelector("#eyecolor").value,
        event: document.querySelector("#event").value,
        outfitcolors: document.querySelector("#outfitColors").value,
        vegan: document.querySelector("#vegan").value
    }
    addProductAPI(product, ()=>{alert("Trimis cu succes!")}, ()=>{alert("Eroare la trimitere!")})
}

window.addProductAPI = function (product, onSuccess, onError){
    const local = localStorage.getItem("user");
    if (local) {
        token = JSON.parse(localStorage.getItem('user')).token;
    } else {
        return window.location.href = "http://localhost:5000/Frontend/notLoggedIn.html";
    }
    var request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                onSuccess()
            }else{
                onError()
            }
        }
    }

    const url = "http://localhost:5000/api/products/add";
    request.open('POST', url, true);
    request.setRequestHeader('x-access-token', token);
    request.send(JSON.stringify(product))
    console.log("Produsul a fost adaugat cu succes in baza de date!")
}

window.csvMenu=async function(){
    let dynamic=document.querySelector('.box');
    dynamic.innerHTML=`
    <p>Select the action you wish to proceed with: </p>
    <br>
    <button type="button" class="submit-bttn" onclick="downloadCSV()">DownloadCSV</button>
    <br>
    <br>
    <button type="buttom" class="submit-bttn" onclick="uploadCSV()">Upload CSV data</button>
    <p id="mesaj-import"></p>
    <br>
    `; 
}

uploadCSV=async function(){
    var input=document.createElement('input');
    input.type='file';
    input.accept=".csv";
    input.click();
    input.onchange = e => {
        var file=e.target.files[0];
        var reader= new FileReader();
        reader.onload = ()=>{
            var lines = reader.result.split("\n");
            const fields = lines.shift().split(",")
            var products = []
            for (var line of lines) {
                var product = {}
                var value = ""
                var field_count = 0
                while(line.length > 0){
                    if(line[0] !== '"'){
                        value = line.slice(0, line.indexOf(','))
                        line = line.slice(line.indexOf(',')+1)
                        if(value.includes(".")){
                            product[fields[field_count]] = parseFloat(value)    
                        }else{
                            product[fields[field_count]] = parseInt(value)
                        }
                    }else{
                        line = line.slice(1)
                        for(var i = 0; i < line.length-1; i = i + 1){
                            if(line[i] === '"'){
                                if(line[i+1] === '"'){
                                    value = value + '"'
                                    i = i + 1
                                }
                                if(line[i+1] === ','){
                                    break
                                }
                            }else{
                                value = value + line[i]
                            }
                        }
                        line = line.slice(i + 2)
                        product[fields[field_count]] = value
                    }
                    field_count = field_count + 1
                    value = ""
                }
                products.push(product)
            }
            var product_iter = -1
            var send_next_product = ()=>{
                product_iter = product_iter + 1
                if(products.length == product_iter){
                    alert("DB imported!")
                }else{
                    addProductAPI(products[product_iter], send_next_product, ()=>{
                        alert("Eroare la adaugarea produsului de pe linia "+product_iter)
                    })
                }
            }
            send_next_product()
        }
        reader.readAsText(file);
    }
}

window.downloadCSV=async function(){
    const local = localStorage.getItem("user");
    if (local) {
        token = JSON.parse(localStorage.getItem('user')).token;
    } else {
        return window.location.href = "http://localhost:5000/Frontend/notLoggedIn.html";
    }
    try{
        var request = new XMLHttpRequest();;
        const url="http://localhost:5000/api/products/csv";
        request.responseType='blob';
        request.open('GET', url, true);
        request.setRequestHeader('x-access-token', token);
        request.send();
        request.onload=function(){
            if (request.status != 200) {
                alert("File cannot be downloade, error: "+request.status);
            }
            else if(request.status==200){
                var fileURL=window.URL.createObjectURL(this.response);
                var a=document.createElement('a');
                a.href=fileURL;
                a.target="_blank";
                a.download='products.csv';
                document.body.appendChild(a);
                a.click();
                alert("Downloading "+a.download)
                document.body.removeChild(a);
            } 
                
        }

    }catch(err){
        console.log(err)
    }
}
