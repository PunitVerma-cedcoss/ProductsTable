const data = []
// hadling form submit
document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault()
    var ProductId = document.getElementById("pid").value
    var ProductName = document.getElementById("pn").value
    var ProductPrice = document.getElementById("pp").value
    if (handleError(ProductId, ProductName, ProductPrice)) {
        data.push({ "ProductId": ProductId, "ProductName": ProductName, "ProductPrice": ProductPrice })
        renderTable({ "ProductId": ProductId, "ProductName": ProductName, "ProductPrice": ProductPrice })
    }
    else {
        console.log("some error occured")
    }
})

// error handling
function handleErrorUtil(ProductId, ProductName, ProductPrice) {
    const errors = []
    if (ProductId == '' || isNaN(parseInt(ProductId))) {
        errors.push("pid")
    }
    if (ProductName == '') {
        errors.push("pn")
    }
    if (ProductPrice == '' || isNaN(parseInt(ProductPrice))) {
        errors.push("pp")
    }
    return errors
}
function handleError(ProductId, ProductName, ProductPrice) {
    // resolving the fields
    ["pp", "pid", "pn"].forEach(e => {
        informError(e, false)
    });
    const errors = handleErrorUtil(ProductId, ProductName, ProductPrice)
    if (errors.length > 0) {
        // alert(handleErrorUtil(ProductId, ProductName, ProductPrice))
        errors.forEach(e => {
            informError(e)
        });
        return false
    }
    else {
        return true
    }
}

// render border errors in html 
function informError(id, error = true) {
    document.getElementById(id).style.borderColor = error ? "red" : ""
}

// render table with json data
function renderTable(object) {
    var tr = generateNodes("tr")
    tr.appendChild(generateNodes("td", object.ProductId))
    tr.appendChild(generateNodes("td", object.ProductName))
    tr.appendChild(generateNodes("td", `USD ${object.ProductPrice}`))
    document.getElementById("values").prepend(tr)
}

// generate nodes
function generateNodes(type, content = '') {
    var node = document.createElement(type)
    if (content != '')
        node.innerText = content
    return node
}