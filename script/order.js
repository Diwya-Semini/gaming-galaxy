let decreaseBtn = document.getElementById("decrease");
let increaseBtn = document.getElementById("increase");
let quantityDisplay = document.getElementById("quantity");
let addToCartBtn = document.getElementById("addToCart");
let productSelect = document.getElementById("productSelect");
let cartBody = document.getElementById("cartBody");
let buyNowBtn = document.getElementById("buyNow");
let addToFavoritesBtn=document.getElementById("addToFavorites");
let applyFavoritesBtn=document.getElementById("applyFavorites");

let quantity = 1;
let cartItem = [];

function formatPrice(price) {
    return "LKR " + price.toLocaleString();
}

function increaseQuantity() {
    quantity++;
    quantityDisplay.textContent = quantity;
}

function decreaseQuantity() {
    if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
    }
}

function updateCartTable() {
    cartBody.innerHTML = ""; 
    let total =0;

    cartItem.forEach((item, index) => {
        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        let qtyCell = document.createElement("td");
        qtyCell.textContent = item.quantity;

        let priceCell = document.createElement("td");
        priceCell.textContent = formatPrice(item.price);

        let itemTotal = item.price * item.quantity;
        let totalCell = document.createElement("td");
        totalCell.textContent = formatPrice(itemTotal);
        total += itemTotal;


        let removeCell = document.createElement("td");
        let removebtn = document.createElement("button");

        removebtn.textContent = "🗑️";
        removebtn.addEventListener("click", () => {
            cartItem.splice(index, 1);
            updateCartTable();
        });

        removeCell.appendChild(removebtn);

        row.appendChild(nameCell);
        row.appendChild(qtyCell);
        row.appendChild(priceCell);
        row.appendChild(totalCell);
        row.appendChild(removeCell);

        cartBody.appendChild(row);

    });

    let totalpriceCell = document.getElementById("total-price");
    if (totalpriceCell){
        totalpriceCell.textContent=formatPrice(total);
    }
}

function addToCart() {
    let selectedOption = productSelect.options[productSelect.selectedIndex];

    if (!selectedOption || !selectedOption.dataset.price) {
        alert("Please select a valid product!");
        return;
    }

    let productName = selectedOption.textContent;
    let productPrice = parseInt(selectedOption.dataset.price);

    cartItem.push({
        name: productName,
        price: productPrice,
        quantity: quantity
    });

    updateCartTable();
    quantity = 1;
    quantityDisplay.textContent = quantity;
}

function buyNow(){
    if (cartItem.length === 0){
        alert("Your cart is empty!");
        return;
    }

    localStorage.setItem("cartData",JSON.stringify(cartItem));

    let total=cartItem.reduce((sum,item)=>sum+(item.price*item.quantity),0);
    localStorage.setItem("cartTotal",total);
    
    window.location.href ="./checkout.html";
}

function saveToFavorites(){
    if (cartItem.length===0){
        alert("Your cart is empty! Nothing to save.");
        return
    }
    localStorage.setItem("favoriteOrder",JSON.stringify(cartItem));
    alert("Order saved to favorite!")
}

function applyFavorites(){
    let fav = localStorage.getItem("favoriteOrder");
    if (!fav){
        alert("No favorite found.");
        return;
    }

    cartItem=JSON.parse(fav);
    updateCartTable();

    alert("Favorites applied succesfully!");
}

increaseBtn.addEventListener("click", increaseQuantity);
decreaseBtn.addEventListener("click", decreaseQuantity);
addToCartBtn.addEventListener("click", addToCart);
buyNowBtn.addEventListener("click",buyNow);
addToFavoritesBtn.addEventListener("click",saveToFavorites);
applyFavoritesBtn.addEventListener("click",applyFavorites);