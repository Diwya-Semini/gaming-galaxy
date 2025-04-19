let orderTotalDisplay = document.getElementById("orderTotal");
let payBtn = document.getElementById("paybtn");
let backBtn = document.getElementById("back");
let confirmationMsg = document.getElementById("confirmationMessage");

function formatPrice(price) {
    return "LKR " + parseInt(price).toLocaleString();
}

let total = localStorage.getItem("cartTotal");
if (total && !isNaN(total)) {
    orderTotalDisplay.textContent = formatPrice(total);
} else {
    orderTotalDisplay.textContent = "LKR 0";
}

function paynow() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let payment = document.getElementById("payment").value;

    if (!name || !email || !address || !payment) {
        alert("Please fill in all fields.");
        return;
    }

    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    confirmationMsg.textContent = `Thank you, ${name}! Your order will be delivered by ${deliveryDate.toDateString()}.`;
    confirmationMsg.classList.remove("hidden");

    localStorage.removeItem("cartData");
    localStorage.removeItem("cartTotal");
}

function goback() {
    window.history.back();
}

payBtn.addEventListener("click", paynow);
backBtn.addEventListener("click", goback);
