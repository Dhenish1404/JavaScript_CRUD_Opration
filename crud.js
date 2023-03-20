// Global Variables 
const groupBtn = document.getElementById('group-btn');
const updateBtn = document.getElementById('updateProduct');
const addBtn = document.getElementById('addProduct');

// This is function is used to fetch the data from Local Storage and Display it into the Table 
function getProducts() {
    document.getElementById('getdata').innerHTML = "";
    const data = { ...localStorage };
    Object.entries(data).forEach(([id, data]) => {
        data = JSON.parse(data);
        document.getElementById('getdata').innerHTML += `
        <tr>
          <th scope="row">${id}</th>
          <td>${data.name}</td>
          <td>${data.price}</td>
          <td>${data.description}</td>
          <td>
            <i class="fa-solid fa-pen-to-square" id="${id}" onclick='editProducts(this.id)'></i>
            <i class="fa-solid fa-trash" id="${id}" onclick="deletProducts(this.id)"></i>
            </td>
        </tr>
        `
    })
    clearfield();
}

// Update the Producte
function updateProduct(updateid){
    const name = document.getElementById('productname').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    localStorage.setItem(updateid, JSON.stringify({name, price, description}));
    updateBtn.removeAttribute("onclick");
    groupBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
    getProducts()
}

// Fetch the old value which is stored in local stroage 
function editProducts(editid) {
    let text = localStorage.getItem(editid);
    let obj = JSON.parse(text);
    document.getElementById('productname').value = obj.name;
    document.getElementById('price').value = obj.price;
    document.getElementById('description').value = obj.description;
    updateBtn.setAttribute("onclick", `updateProduct(${editid})`);
    groupBtn.classList.remove("d-none");
    addBtn.classList.add("d-none");
}

// Delete the product by this function
function deletProducts(deleteid) {
    localStorage.removeItem(deleteid);
    getProducts();
}

// Remove all the data in HTML document
function clearfield(){
    document.getElementById('productname').value = "";
    document.getElementById('price').value = "";
    document.getElementById('description').value = "";
}

// After wrong click in edit button 
function cancleProduct(){
    groupBtn.classList.add("d-none");
    updateBtn.removeAttribute("onclick");
    addBtn.classList.remove("d-none");
    clearfield();
}

window.addEventListener('load', function () {
    getProducts();
});

// Main Function when button is clicked and store the Object data into local Storage
function Products() {
    const newObj = {
        name: document.getElementById('productname').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value
    }
    localStorage.setItem(new Date().getTime(), JSON.stringify(newObj));
    getProducts();
}
