// const {generatePdfFromHtml}=require("../../../Backend/generators.js");
let selectBox = document.getElementById("filter");
import {generatePdfFromHtml} from '../../../Backend/generators.js';
import {generateFeedRSS} from '../../../Backend/generators.js';
let productstogenerate=[];
window.addEventListener("load", async (e) => {
    let token = "";
    let products = [];
    let dynamic = document.querySelector('.container');
    const local = localStorage.getItem("user");
    if (local) {
        token = JSON.parse(localStorage.getItem('user')).token;
    } else {
        return window.location.href = "http://localhost:5000/Frontend/notLoggedIn.html";
    }
    e.preventDefault();
    try {

        var request = new XMLHttpRequest();
        const url = "http://localhost:5000/api/products/filter";
        request.open('POST', url, true);
        request.setRequestHeader('x-access-token', token);
        request.send(JSON.stringify({ product_type: "all" }));
        request.onreadystatechange = function () {
            if (request.readyState == XMLHttpRequest.DONE) {
                products = JSON.parse(request.responseText);
                if (Array.isArray(products) == false && products.message === "Invalid Token") {
                    console.log("This session has been expired. Click here to login again");

                    return dynamic.innerHTML =
                        `
                     <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                     <h3>Your session has expired.</h3>
                     <h4 style="margin-top:2em; font-weight: 400;">Click <a style="color: #1a0dab;" href="/Frontend/loginRegisterPage.html"> here </a> to login again.</h4>
                     </div>
                   `
                } else {
                    console.log(products);
                    dynamic.innerHTML = products.map((item, index) =>
                        `<div class="card-container">
                    <div class="box-content">
                    <h2 style=" ${index === 0 ? "font-style: italic" : "color:black"}; padding: 0.4em; text-align: left;">Number ${index + 1}</h2>
                    <div class="like" id="like">
                    <div class="h_container">
                    <i id="heart" class="fas fa-heart"></i>
                    </div>
                    <p>${item.rating} people liked this</p>
                    </div>
                    <img class="grid-img" id="image" src="${item.api_featured_image}">
                    <div id="afterimage">
                    <h2>${item.name}</h2>
                    <a href="${item.product_link}" style="padding: 1em; color: #156068">You can find it here</a>
                    <p style="padding: 1em; color: #9DA993">${item.brand}</p>
                    <small style="margin-bottom: .5em">${item.price_sign ? item.price_sign : ""}${item.price ? item.price : "Unknown price"}</small>
                    </div>
                    </div>
                </div>
                `
                    ).join(" ");

                    dynamic.innerHTML += ` <div class="select-container">

            <h4 style="margin-top: 2em; font-style: italic;">Download</h4>
            <div class="cta" id="buttons">
              <button class="cta-select" id="pdf" name="pdf" onclick="generatePDF()">PDF</button>
              <button class="cta-select" id="rss" name="rss" onclick="generateRSS()">RSS</button>
            </div>
          </div>`
                }
            }

            selectBox.addEventListener("change", () => {
                if (selectBox !== undefined) {
                    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
                    console.log(selectedValue);
                    var request = new XMLHttpRequest();
                    const url = "http://localhost:5000/api/products/filter";
                    request.open('POST', url, true);
                    request.setRequestHeader('x-access-token', token);
                    request.send(JSON.stringify({ product_type: selectedValue }));
                    request.onreadystatechange = function () {
                        if (request.readyState == XMLHttpRequest.DONE) {
                            if (Array.isArray(products) == false && products.message === "Invalid Token") {
                                console.log("This session has been expired. Click here to login again");

                                return dynamic.innerHTML =
                                    `
                                 <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                                 <h3>Your session has expired.</h3>
                                 <h4 style="margin-top:2em; font-weight: 400;">Click <a style="color: #1a0dab;" href="/Frontend/loginRegisterPage.html"> here </a> to login again.</h4>
                                 </div>
                               `
                            } else {
                                products = JSON.parse(request.responseText);
                                console.log(products);
                                dynamic.innerHTML = products.map((item, index) =>
                                    `<div class="card-container">
                            <div class="box-content">
                            <h2 style=" ${index === 0 ? "font-style: italic" : "color:black"}; padding: 0.4em; text-align: left;">Number ${index + 1}</h2>
                            <div class="like" id="like">
                            <div class="h_container">
                            <i id="heart" class="fas fa-heart"></i>
                            </div>
                            <p>${item.rating} people liked this</p>
                            </div>
                            <img class="grid-img" id="image" src="${item.api_featured_image}">
                            <div id ="afterimage">
                            <h2>${item.name}</h2>
                            <a href="${item.product_link}" style="padding: 1em; color: #156068">You can find it here</a>
                            <p style="padding: 1em; color: #9DA993">${item.brand}</p>
                            <small style="margin-bottom: .5em">${item.price}</small>
                            </div>
                            </div>
                        </div>
                        `
                                ).join(" ");
                            }
                        }
                        dynamic.innerHTML += ` <div class="select-container">

                    <h4 style="margin-top: 2em; font-style: italic;">Download</h4>
                    <div class="cta" id="buttons">
                      <button class="cta-select" id="pdf" name="pdf" onclick="generatePDF()">PDF</button>
                      <button class="cta-select" id="pdf" name="rss" onclick="generateRSS()">RSS</button>
                    </div>
                  </div>`
                    }
                }
            })
        }
    } catch (err) {
        console.log(err);
    }
});

window.generatePDF=function(){
    generatePdfFromHtml(productstogenerate, "Downloads");
} 
window.generateRSS=function(){
    console.log("I AM IN RSS! ");
    generateFeedRSS(productstogenerate);
}
