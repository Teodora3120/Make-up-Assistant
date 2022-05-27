const selectedOption = (id) =>{
    var selectBox = document.getElementById(id);
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    console.log(selectedValue);
    return selectedValue;
}


const selectedBrands = () => {
    let brands = [];
    index = 0;
    var inputElements = document.getElementsByClassName('brand');
    for(var i = 0; inputElements[i]; ++i){
        if(inputElements[i].checked){
            brands[index] = inputElements[i].value;
            index++;
        }
    }
    console.log(brands);
    return brands;
}



const submit = document.getElementById("submit");
submit.addEventListener('submit', (e) => {
    e.preventDefault();  
    window.location.href = `http://localhost:5000/Frontend/preferancePage.html?skintypes=${selectedOption("skintypes")}&skinage=${selectedOption("skinage")}&haircolor=${selectedOption("haircolor")}&eyecolor=${selectedOption("eyecolor")}&event=${selectedOption("event")}&outfitcolors=${selectedOption("outfitcolors")}&brands=${selectedBrands()}&vegan=${selectedOption("vegan")}`;
});


