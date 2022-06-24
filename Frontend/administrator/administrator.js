let dynamic=document.querySelector('.box');
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
   // let dynamic=document.querySelector('.box');
    dynamic.innerHTML=`
    <p>Choose the id you want to modify</p>
    <form id="modify" class="input-modify" method="post">
        <input type="text" id="id" class="input-id" placeholder="" required>
        <h5 id="id-error" style="color: red; font-weight: 400; text-align: center; margin-top: 2em;"></h5>
        <button type="button" class="submit-btn" onclick="showProduct()">Find product</button>
      </form>
    `;
}

window.showProduct=async function(){
    var idvalue=document.querySelector("#id").value;
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
        const product=JSON.parse(request.responseText);
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
        <p>Type of product</p>
        <input type="text" id="product-type" class="input-id" placeholder="" value="${product.product_type}">
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
        <button type="button" class="submit-btn" onclick="cancelModify()">Cancel</button>
        <button type="button" class="submit-btn" onclick="beginModifyProduct()">Modify</button>
        `;
        var selectoutfitcolors=document.getElementById("outfitcolors");
        var selectevent=document.getElementById("event");
        var selecteyecolor=document.getElementById("eyecolor");
        var selecthaircolor=document.getElementById("haircolor");
        var selectvegan=document.getElementById("vegan");
        var selectbrand=document.getElementById("brand");
        selectoutfitcolors.value=product.outfitcolors;
        selectevent.value=product.event;
        selecteyecolor.value=product.eyecolor;
        selecthaircolor.value=product.haircolor;
        selectvegan.value=product.vegan;
        selectbrand.value=product.brand;
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
        <p>Type of product</p>
        <input type="text" id="product-type" class="input-id" placeholder="" value="${product.product_type}">
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
      <label id="outfitcolor1" for="outfitcolors">Outfit colors<br></label>
                <select name="outfitcolors" id="outfitcolors">
                <option value="warm">Warm colors</option>
                <option value="cold">Cold colors</option>
                <option value="dark">Dark colors</option>
                <option value="light">Light colors</option>
                <option value="neutral">Neutral colors</option>
                </select>
        <label id="event1" for="eventoption">Event<br></label>
                <select name="eventoption" id="event">
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
                <select name="eyecoloroption" id="eyecolor">
                <option value="green">Green</option>
                <option value="brown">Brown</option>
                <option value="hazel">Hazel</option>
                <option value="blue">Blue</option>
                <option value="black">Black</option>
                </select>
        <label id="haircolor1" for="haircoloroption">Hair color<br></label>
                <select name="haircoloroption" id="haircolor">
                <option value="blonde">Blonde</option>
                <option value="brunette">Brunette</option>
                <option value="brown">Brown</option>
                <option value="red">Red</option>
                <option value="others">Others</option>
                </select>
        <label id="vegan1" for="veganoption">Vegan<br></label>
                <select name="veganoption" id="vegan">
                <option value="true">Yes</option>
                <option value="false">No</option>
                </select>
        <label id="skinage1" for="skinageoption">Skin Age<br></label>
                <select name="skinageoption" id="skinage">
                <option value="teen"> Teen (16-20 years)</option>
                <option value="young"> Young (20-40 years)</option>
                <option value="mature"> Mature (40+ years)</option>
                </select>
        <label id="skintypes1" for="skintypesoption">Skin types<br></label>
                <select name="skintypesoption" id="skintypes">
                <option value="oily">Oily</option>
                <option value="dry">Dry</option>
                <option value="mixed">Mixed</option>
                <option value="dryacneic">Dry and acneic</option>
                <option value="oilyacneic">Oily and acneic</option>
                <option value="mixedacneic">Mixed and acneic</option>
                </select>
        <button type="button" class="submit-btn" onclick="cancelModify()">Cancel</button>
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
        selectoutfitcolors.value=product.outfitcolors;
        selectevent.value=product.event;
        selecteyecolor.value=product.eyecolor;
        selecthaircolor.value=product.haircolor;
        selectvegan.value=product.vegan;
        selectbrand.value=product.brand;
        selectskinage.value=product.skinage;
        selectskintypes.value=product.skintypes;
        }
          }
        }
    }catch (err) {
        console.log(err);
    }
}
window.cancelModify=async function(){
    const local = localStorage.getItem("user");
    if (local) {
        token = JSON.parse(localStorage.getItem('user')).token;
    } else {
        return window.location.href = "http://localhost:5000/Frontend/notLoggedIn.html";
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

window.beginModifyProduct=async function(){
    console.log("Begin to modify!");
}

window.deleteProduct=async function(){
    let dynamic=document.querySelector('.box');
    dynamic.innerHTML=`<p>delete</p>`;
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
    console.log("Am trimis!")
}

window.csvMenu=async function(){
    console.log("Intrat in meniu!")
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
        console.log("Descarcare csv")
        var request = new XMLHttpRequest();;
        const url="http://localhost:5000/api/products/csv";
        request.responseType='blob';
        request.open('GET', url, true);
        console.log("aici!");
        request.setRequestHeader('x-access-token', token);
        request.send();
        request.onload=function(){
            console.log('aiciacum')
            if (request.status != 200) {
                console.log("file can't be downloaded");
            }
            else if(request.status==200){
                //request.responseType='blob'
                var fileURL=window.URL.createObjectURL(this.response);
                var a=document.createElement('a');
                
                a.href=fileURL;
                a.target="_blank";
                a.download='products.csv';
                document.body.appendChild(a);
                console.log(a.download);
                a.click();
                document.body.removeChild(a);
            } 
                
        }

    }catch(err){
        console.log(err)
    }
}
