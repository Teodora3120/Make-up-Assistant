let products = [
  {
    id: "id1",
    name: "Fond de ten",
    price: "10 RON",
    description: "bla bla bla",
    company: "Maybelline",
    image: "/PreferencePage/Images/istockphoto-1176520415-612x612.jpg"
  },
  {
    id: "id2",
    name: "Ruj",
    price: "15 RON",
    description: "bla bla bla",
    company: "Mac",
    image: "/PreferencePage/Images/istockphoto-1176520415-612x612.jpg"
  },
  {
    id: "id3",
    name: "Fard",
    price: "20 RON",
    description: "bla bla bla",
    company: "Essence",
    image: "/PreferencePage/Images/istockphoto-1176520415-612x612.jpg"
  },
  {
    id: "id4",
    name: "Pudra",
    price: "30 RON",
    description: "bla bla bla",
    company: "Pupa Milano",
    image: "/PreferencePage/Images/istockphoto-1176520415-612x612.jpg"
  },
  {
    id: "id5",
    name: "Mascara",
    price: "0 RON",
    description: "bla bla bla",
    company: "Cupio",
    image: "/PreferencePage/Images/istockphoto-1176520415-612x612.jpg"
  },
  {
    id: "id6",
    name: "Eyeliner",
    price: "60 RON",
    description: "bla bla bla",
    company: "Catrice",
    image: "/PreferencePage/Images/istockphoto-1176520415-612x612.jpg"
  },
  {
    id: "id7",
    name: "Creion de buze",
    price: "70 RON",
    description: "bla bla bla",
    company: "Dior",
    image: "/PreferencePage/Images/istockphoto-1176520415-612x612.jpg"
  }
]

var dynamic = document.querySelector('.container');
dynamic.innerHTML = products.map((item, index) =>
  `
      <div id="card${index}">
        <div class="box-content">
          <img class="grid-img" src="${item.image}">
          <h2>${item.name}</h2>
          <p>${item.price}</p>
          <p>${item.company}</p>
          <button class="showmore"><a href="${window.location.protocol}//${window.location.host}/SingleProductPage/singleProductPage.html?id=${products[index].id}">See more details</a></button>
        </div>
      </div>
    `
)

// for (let i = 0; i < products.length; i++) {
//     document.getElementById(`card${i}`).addEventListener("click", function() {
//        const src = `${window.location.protocol}//${window.location.host}/SingleProductPage/singleProductPage.html?id=${products[i].id}`;
//       console.log(src);
//       window.location.href = src;
//   });
// }



