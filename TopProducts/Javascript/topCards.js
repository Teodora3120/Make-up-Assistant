
let products = [
    {
      id: "id1",
      name: "Fond de ten",
      price: "10 RON",
      description: "Consider beauty product description examples, this description of Shea butter does not only provide boring technical information about its features. Instead, this description focuses on some benefits one would expect from this product, such as - shiny, moisturized, and smooth hair. At the same time, it also included the ingredients that made it possible, which increases the reliability of the product.",
      shortDescription:"Whether you’re looking for the perfect red, everyday nude, or moody blue, Mattemoiselle Plush Matte Lipstick makes it easier than ever to rock the entire rainbow",
      company: "Maybelline",
      image: "Images/fond_de_ten.jpg",
      clicks:40
    },
    {
      id: "id2",
      name: "Ruj",
      price: "15 RON",
      description: "Consider beauty product description examples, this description of Shea butter does not only provide boring technical information about its features. Instead, this description focuses on some benefits one would expect from this product, such as - shiny, moisturized, and smooth hair. At the same time, it also included the ingredients that made it possible, which increases the reliability of the product.",
      shortDescription:"Whether you’re looking for the perfect red, everyday nude, or moody blue, Mattemoiselle Plush Matte Lipstick makes it easier than ever to rock the entire rainbow",
      company: "Mac",
      image: "Images/ruj.jpg",
      clicks:20
    },
    {
      id: "id3",
      name: "Fard",
      price: "20 RON",
      description: "Consider beauty product description examples, this description of Shea butter does not only provide boring technical information about its features. Instead, this description focuses on some benefits one would expect from this product, such as - shiny, moisturized, and smooth hair. At the same time, it also included the ingredients that made it possible, which increases the reliability of the product.",
      shortDescription:"Whether you’re looking for the perfect red, everyday nude, or moody blue, Mattemoiselle Plush Matte Lipstick makes it easier than ever to rock the entire rainbow",
      company: "Essence",
      image: "Images/fard.jpg",
      clicks:28
    },
    {
      id: "id4",
      name: "Pudra",
      price: "30 RON",
      description: "Consider beauty product description examples, this description of Shea butter does not only provide boring technical information about its features. Instead, this description focuses on some benefits one would expect from this product, such as - shiny, moisturized, and smooth hair. At the same time, it also included the ingredients that made it possible, which increases the reliability of the product.",
      shortDescription:"Whether you’re looking for the perfect red, everyday nude, or moody blue, Mattemoiselle Plush Matte Lipstick makes it easier than ever to rock the entire rainbow",
      company: "Pupa Milano",
      image: "Images/pudra.jpg",
      clicks:21
    },
    {
      id: "id5",
      name: "Mascara",
      price: "0 RON",
      description: "Consider beauty product description examples, this description of Shea butter does not only provide boring technical information about its features. Instead, this description focuses on some benefits one would expect from this product, such as - shiny, moisturized, and smooth hair. At the same time, it also included the ingredients that made it possible, which increases the reliability of the product.",
      shortDescription:"Whether you’re looking for the perfect red, everyday nude, or moody blue, Mattemoiselle Plush Matte Lipstick makes it easier than ever to rock the entire rainbow",
      company: "Cupio",
      image: "Images/mascara.jpg",
      clicks:22
    },
    {
      id: "id6",
      name: "Eyeliner",
      price: "60 RON",
      description: "Consider beauty product description examples, this description of Shea butter does not only provide boring technical information about its features. Instead, this description focuses on some benefits one would expect from this product, such as - shiny, moisturized, and smooth hair. At the same time, it also included the ingredients that made it possible, which increases the reliability of the product.",
      shortDescription:"Whether you’re looking for the perfect red, everyday nude, or moody blue, Mattemoiselle Plush Matte Lipstick makes it easier than ever to rock the entire rainbow",
      company: "Catrice",
      image: "Images/eyeliner.jpg",
      clicks:26
    },
    {
      id: "id7",
      name: "Creion de buze",
      price: "70 RON",
      description: "Consider beauty product description examples, this description of Shea butter does not only provide boring technical information about its features. Instead, this description focuses on some benefits one would expect from this product, such as - shiny, moisturized, and smooth hair. At the same time, it also included the ingredients that made it possible, which increases the reliability of the product.",
      shortDescription:"Whether you’re looking for the perfect red, everyday nude, or moody blue, Mattemoiselle Plush Matte Lipstick makes it easier than ever to rock the entire rainbow",
      company: "Dior",
      image: "Images/creion_de_buze.jpg",
      clicks:25
    }
  ]
  products.sort((a, b) => a.clicks - b.clicks);
  var dynamic = document.querySelector('.container');
dynamic.innerHTML = products.map((item, index) =>
  `
      <div id="card${index}">
        <div class="box-content">
          <h1 style=" ${index === 0 ? "color:#D4AF37" : "color:black"}; padding: 0.4em; text-align: left;">Number ${index + 1}</h1>
          <img class="grid-img" src="${item.image}">
          <h2>${item.name}</h2>
          <p>${item.shortDescription}</p>
          <p style="margin-top: 1em; font-style: italic;">${item.company}</p>
          <small style="margin-bottom: .5em">${item.price}</small>
          <div class="box-description"
          </div>
        </div>
      </div>
  `
).join(" ");