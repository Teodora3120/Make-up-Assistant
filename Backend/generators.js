
export async function generatePdfFromHtml(products, path) {
    const doc = new jsPDF('p', 'pt', 'a4');

    products.forEach(function (product, i) {
        doc.setFillColor(236, 236, 236);
        doc.rect(0, 0, 1000, 1000, "F");
        doc.setFontSize(20);
        var string = "Number: " + (i + 1) + "\n" +
            "Name: " + product.name + "\n" +
            "Rating: " + product.rating + " people liked this" + "\n" +
            "Brand: " + product.brand + "\n" +
            "Price: " + product.price_sign + product.price + "\n";
        doc.textWithLink('You can find this product here.', 30, 230, { url: product.product_link });
        var link = doc.splitTextToSize(string, 500);

        doc.text(30, 20 + (i * 20), link);
        if (i < 9)
            doc.addPage();
    });

    doc.save('TopProducts.pdf');
}

export function generateFeedRSS(products) {

    let token = "";
    const local = localStorage.getItem("user");
    if (local) {
        token = JSON.parse(localStorage.getItem('user')).token;
    }
    try {

        var request = new XMLHttpRequest();
        const url = "http://localhost:5000/api/products/rss";

        request.open('POST', url, true);
        request.setRequestHeader('x-access-token', token);
        request.send(JSON.stringify(products, (key, value) => {
            if (key === "_id" || key === "id") {
                return undefined;
            }
            var word = JSON.stringify(value);
            word.replace("&trade;", " ");
            value = JSON.parse(word);
            return value;
        }));
        
        request.onload = function () {
            console.log("after onload");
            var resObj = this;
            console.log("I BEGIN DOWNLOADING!! ");
            if (resObj.readyState == XMLHttpRequest.DONE) {

                if (resObj.status != 200) {
                    console.log("file can't be downloaded");
                } else if (resObj.status == 200) {
                    const blob = new Blob([this.response], { type: 'text/html' });
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = `TopProducts.xml`;
                    link.click();
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
}