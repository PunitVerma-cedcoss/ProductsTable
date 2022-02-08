var data = []
data.push({ "ProductId": 1, "ProductName": "iPhone5", "ProductPrice": "210" })
data.push({ "ProductId": 2, "ProductName": "iPhone6", "ProductPrice": "312" })
renderTable()
// hadling form submit
document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault()
    var ProductId = document.getElementById("pid").value
    var ProductName = document.getElementById("pn").value
    var ProductPrice = document.getElementById("pp").value
    if (handleError(ProductId, ProductName, ProductPrice)) {
        data.push({ "ProductId": ProductId, "ProductName": ProductName, "ProductPrice": ProductPrice })
        renderTable()
    }
    else {
        console.log("some error occured")
    }
})
// update from click event
document.getElementById("update").addEventListener("click", function (e) {
    e.preventDefault()
    updateUtil()
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
function renderTable() {
    var markup = ''
    data.forEach(i => {
        markup += `
            <tr>
                <td>${i.ProductId}</td>
                <td>${i.ProductName}</td>
                <td>USD ${i.ProductPrice}</td>
                <td><button onClick="edit('${i.ProductId}')">Edit</button></td>
                <td><button onClick="del('${i.ProductId}')">Delete</button></td>
            </tr>
        `
    })
    document.getElementById("values").innerHTML = markup
    clearFieldsUtil()
}
// update function
function updateUtil() {
    // fetching the values from input fields
    var ProductId = document.getElementById("pid").value
    var ProductName = document.getElementById("pn").value
    var ProductPrice = document.getElementById("pp").value
    if (handleError(ProductId, ProductName, ProductPrice)) {
        console.log("updating in the global object  ")
        // getting the index of the object in array
        for (let index = 0; index < data.length; index++) {
            if (data[index].ProductId == ProductId) {
                console.log("index is " + index)
                // manipulating the object
                data[index].ProductId = ProductId
                data[index].ProductName = ProductName
                data[index].ProductPrice = ProductPrice
                break
            }

        }
        renderTable()
        clearFieldsUtil()
        // toggling the button from edit to update
        document.getElementById("submit").classList.remove("hide")
        document.getElementById("update").classList.add("hide")
    }
    else {
        console.log("errors")
    }

}
// editing function
function edit(id) {
    // toggling the button from edit to update
    document.getElementById("submit").classList.add("hide")
    document.getElementById("update").classList.remove("hide")
    // getting the data
    for (let index = 0; index < data.length; index++) {
        if (data[index].ProductId == id) {
            console.log(data[index])
            // populating the form
            document.getElementById("pid").value = data[index].ProductId
            document.getElementById("pn").value = data[index].ProductName
            document.getElementById("pp").value = data[index].ProductPrice
        }

    }
}
// deleting function
function del(id) {
    for (let index = 0; index < data.length; index++) {
        if(data[index].ProductId == id)
        {
            data.splice(index,1)
            console.log("removing ",data[index])
            renderTable()
            break
        }
        
    }
}

// clear all the fields
function clearFieldsUtil() {
    document.getElementById("pid").value = ""
    document.getElementById("pn").value = ""
    document.getElementById("pp").value = ""
}