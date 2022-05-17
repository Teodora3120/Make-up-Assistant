const todos = [{
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
];


const http = require("https");

const options = {
	"method": "GET",
	"hostname": "makeup.p.rapidapi.com",
	"port": null,
	"path": "/products.json",
	"headers": {
		"X-RapidAPI-Host": "makeup.p.rapidapi.com",
		"X-RapidAPI-Key": "da8b975ecamsh3acd72fcd4387cap13cb65jsnd5974d5ed537",
		"useQueryString": true
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		const body = Buffer.concat(chunks);
    // console.log("CHUCKS:" + "\n" + chunks.toString());
    return chunks;
		//console.log(body.toString());
	});
});

req.end();


module.exports = todos;