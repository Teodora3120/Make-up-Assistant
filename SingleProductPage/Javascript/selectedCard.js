let products = [
    {
      id: "id1",
      name: "Fond de ten",
      price: "10 lei",
      description: "bla bla bla",
      company: "Maybelline",
      image: "/SingleProductPage/Images/istockphoto-1176520415-612x612.jpg"
    },
    {
      id: "id2",
      name: "Ruj",
      price: "15 lei",
      description: "bla bla bla",
      company: "Mac",
      image: "/SingleProductPage/Images/istockphoto-1176520415-612x612.jpg"
    },
    {
      id: "id3",
      name: "Fard",
      price: "20 lei",
      description: "bla bla bla",
      company: "Essence",
      image: "/SingleProductPage/Images/istockphoto-1176520415-612x612.jpg"
    },
    {
      id: "id4",
      name: "Pudra",
      price: "30 lei",
      description: "bla bla bla",
      company: "Pupa Milano",
      image: "/SingleProductPage/Images/istockphoto-1176520415-612x612.jpg"
    },
    {
      id: "id5",
      name: "Mascara",
      price: "0 lei",
      description: "bla bla bla",
      company: "Cupio",
      image: "/SingleProductPage/Images/istockphoto-1176520415-612x612.jpg"
    },
  
    {
      id: "id6",
      name: "Eyeliner",
      price: "60 lei",
      description: "bla bla bla",
      company: "Catrice",
      image: "/SingleProductPage/Images/istockphoto-1176520415-612x612.jpg"
    },
    {
      id: "id7",
      name: "Creion de buze",
      price: "70 lei",
      description: "bla bla bla",
      company: "Dior",
      image: "/SingleProductPage/Images/istockphoto-1176520415-612x612.jpg"
    }
  ]
  
  var dynamic = document.querySelector('.container');
  for (var i = 0; i < products.length; i++) {
    var fetch = document.querySelector('.container').innerHTML;
    dynamic.innerHTML = `<div id="cards${i}">
        <div class="box-content">
          <img class="grid-img" src="${products[i].image}">
          <h2>${products[i].name}</h2>
          <p>${products[i].price}</p>
          <p>${products[i].company}</p>
          <a class="showmore" href="#">See detalis about it</a>
        </div>
      </div>` + fetch;
  } 

  