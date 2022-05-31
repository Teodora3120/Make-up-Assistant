const selectedOption = (id) => {
    var selectBox = document.getElementById(id);
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    console.log(selectedValue);
    return selectedValue;
}

const selectedBrands = () => {
    let brands = [];
    index = 0;
    var inputElements = document.getElementsByClassName('brand');
    for (var i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            brands[index] = inputElements[i].value;
            index++;
        }
    }
    console.log(brands);
    return brands;
}
let submit = document.getElementById("submit");

window.addEventListener("load", async (e) => {
    let token = "";
    const local = localStorage.getItem("user");
    if (local) {
        token = JSON.parse(localStorage.getItem('user')).token;
    } else {
        window.location.href = "http://localhost:5000/Frontend/notLoggedIn.html";
    }
    try {
        submit.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = `http://localhost:5000/Frontend/preferancePage.html?skintypes=${selectedOption("skintypes")}&skinage=${selectedOption("skinage")}&haircolor=${selectedOption("haircolor")}&eyecolor=${selectedOption("eyecolor")}&event=${selectedOption("event")}&outfitcolors=${selectedOption("outfitcolors")}&brands=${selectedBrands()}&vegan=${selectedOption("vegan")}`;
        });
    } catch (err) {
        console.log(err);
    }
})




