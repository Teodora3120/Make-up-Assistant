//Set all the images to end with "../"
let products = [
  {
    id: "id1",
    name: "Fond de ten",
    price: "10 RON",
    description: "Consider beauty product description examples, this description of Shea butter does not only provide boring technical information about its features. Instead, this description focuses on some benefits one would expect from this product, such as - shiny, moisturized, and smooth hair. At the same time, it also included the ingredients that made it possible, which increases the reliability of the product.",
    company: "Maybelline",
    image: "Images/fond_de_ten.jpg"
  },
  {
    id: "id2",
    name: "Ruj",
    price: "15 RON",
    description: "Consider beauty product description examples, this description of Shea butter does not only provide boring technical information about its features. Instead, this description focuses on some benefits one would expect from this product, such as - shiny, moisturized, and smooth hair. At the same time, it also included the ingredients that made it possible, which increases the reliability of the product.",
    company: "Mac",
    image: "Images/ruj.jpg"
  },
  {
    id: "id3",
    name: "Fard",
    price: "20 RON",
    description: "Consider beauty product description examples, this description of Shea butter does not only provide boring technical information about its features. Instead, this description focuses on some benefits one would expect from this product, such as - shiny, moisturized, and smooth hair. At the same time, it also included the ingredients that made it possible, which increases the reliability of the product.",
    company: "Essence",
    image: "Images/fard.jpg"
  },
  {
    id: "id4",
    name: "Pudra",
    price: "30 RON",
    description: "Consider beauty product description examples, this description of Shea butter does not only provide boring technical information about its features. Instead, this description focuses on some benefits one would expect from this product, such as - shiny, moisturized, and smooth hair. At the same time, it also included the ingredients that made it possible, which increases the reliability of the product.",
    company: "Pupa Milano",
    image: "Images/pudra.jpg"
  },
  {
    id: "id5",
    name: "Mascara",
    price: "0 RON",
    description: "Consider beauty product description examples, this description of Shea butter does not only provide boring technical information about its features. Instead, this description focuses on some benefits one would expect from this product, such as - shiny, moisturized, and smooth hair. At the same time, it also included the ingredients that made it possible, which increases the reliability of the product.",
    company: "Cupio",
    image: "Images/mascara.jpg"
  },
  {
    id: "id6",
    name: "Eyeliner",
    price: "60 RON",
    description: "Consider beauty product description examples, this description of Shea butter does not only provide boring technical information about its features. Instead, this description focuses on some benefits one would expect from this product, such as - shiny, moisturized, and smooth hair. At the same time, it also included the ingredients that made it possible, which increases the reliability of the product.",
    company: "Catrice",
    image: "Images/eyeliner.jpg"
  },
  {
    id: "id7",
    name: "Creion de buze",
    price: "70 RON",
    description: "Consider beauty product description examples, this description of Shea butter does not only provide boring technical information about its features. Instead, this description focuses on some benefits one would expect from this product, such as - shiny, moisturized, and smooth hair. At the same time, it also included the ingredients that made it possible, which increases the reliability of the product.",
    company: "Dior",
    image: "Images/creion_de_buze.jpg"
  }
]


 const getProduct = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const product = products.find(idOfProduct => idOfProduct.id == id);
  if(!product){
    var Container = document.querySelector('.container');
    Container.innerHTML =   `
    <div class="noProductSelected">
    <h2>You have not selected a product.</h2>
    <a href="preferancePage.html">Go back to the products page.</a>
    </div>
  `
  } else {
    var productContainer = document.querySelector('.container');
    //Have a problem with the link from the preference page to singleProduct page. It is probably because "../" is missing.
    //Tried to resolve but couldn't in the end
    productContainer.innerHTML =   `
    <div class="productContainer" id="${product.id}">
      <div class="box-content">
        <img class="grid-img" src="${product.image}">
        <h2>${product.name}</h2>
        <p>${product.price}</p>
        <p>${product.company}</p>
        <p class="description">${product.description}</p>
        <button class="backButton"><a href="${window.location.protocol}//${window.location.host}/preferancePage.html">Previous Page</a></button>
      </div>
    </div>
  `
  }

}
getProduct();



  