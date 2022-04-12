let products = [
    {
      id: "id1",
      name: "Fond de ten",
      price: "10 RON",
      description: "bla bla bla",
      company: "Maybelline",
      image: "/SingleProductPage/Images/istockphoto-1176520415-612x612.jpg"
    },
    {
      id: "id2",
      name: "Ruj",
      price: "15 RON",
      description: "bla bla bla",
      company: "Mac",
      image: "/SingleProductPage/Images/istockphoto-1176520415-612x612.jpg"
    },
    {
      id: "id3",
      name: "Fard",
      price: "20 RON",
      description: "bla bla bla",
      company: "Essence",
      image: "/SingleProductPage/Images/istockphoto-1176520415-612x612.jpg"
    },
    {
      id: "id4",
      name: "Pudra",
      price: "30 RON",
      description: "bla bla bla",
      company: "Pupa Milano",
      image: "/SingleProductPage/Images/istockphoto-1176520415-612x612.jpg"
    },
    {
      id: "id5",
      name: "Mascara",
      price: "0 RON",
      description: "bla bla bla",
      company: "Cupio",
      image: "/SingleProductPage/Images/istockphoto-1176520415-612x612.jpg"
    },
  
    {
      id: "id6",
      name: "Eyeliner",
      price: "60 RON",
      description: "bla bla bla",
      company: "Catrice",
      image: "/SingleProductPage/Images/istockphoto-1176520415-612x612.jpg"
    },
    {
      id: "id7",
      name: "Creion de buze",
      price: "70 RON",
      description: "bla bla bla",
      company: "Dior",
      image: "/SingleProductPage/Images/istockphoto-1176520415-612x612.jpg"
    }
  ]


 const getProduct = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const product = products.find(idOfProduct => idOfProduct.id == id);
  var productContainer = document.querySelector('.container');
  productContainer.innerHTML =   `
  <div class="productContainer" id="${product.id}">
    <div class="box-content">
      <img class="grid-img" src="${product.image}">
      <h2>${product.name}</h2>
      <p>${product.price}</p>
      <p>${product.company}</p>
      <p class="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a 
      type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining 
      essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
      and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      <button class="backButton"><a href="${window.location.protocol}//${window.location.host}/PreferencePage/preferancePage.html">Previous Page</a></button>
    </div>
  </div>
`
}
getProduct();



  