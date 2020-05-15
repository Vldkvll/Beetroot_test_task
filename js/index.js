(function (){let filterBox = document.querySelector('.filter-box select');
let priceSelectBox = document.querySelector('.price-select-box select');
let all = document.querySelectorAll('.product-box__item');
document.querySelectorAll('input.qty__item').forEach(inp => inp.setAttribute('min', 1));


const categoryList = {
    1: 'breakfasts',
    2: 'soups',
    3: 'trimmings',
};

function filterItems(category, price) {
    all.forEach((item) => item.style.display = 'flex');

    if (category > 0) {
        let catName = categoryList[category];
        let hiddenList = document.querySelectorAll('.product-box__item:not([data-category="' + catName + '"])');
        hiddenList.forEach((item) => item.style.display = 'none');
    }
    if (price > 0) {
        let hiddenList = [];
        all.forEach((item) => {
            if (parseInt(item.dataset.price) > parseInt(price)) {
                hiddenList.push(item)
            }
        });
        hiddenList.forEach((item) => item.style.display = 'none');
    }
};

filterBox.addEventListener("change", e => {
    filterItems(filterBox.value, priceSelectBox.value);
});
priceSelectBox.addEventListener("change", e => {
    filterItems(filterBox.value, priceSelectBox.value);
});

// Cart activities

let cartAmountLabel = document.getElementById('cart-amount');
let cartCountLabel = document.getElementById('cart-count');

let cart = {};

function addCartItem(id, price, count) {
    if (cart[id]) {
        cart[id].count += count;
    } else {
        cart[id] = {
            price: price,
            count: count
        };
    }
};

function getCartAmount() {
    let sum = 0;
    for (let id in cart)
        sum += cart[id].price * cart[id].count;
    return sum;
};

function getCartCount() {
    let cnt = 0;
    for (let id in cart)
        cnt += cart[id].count;
    return cnt;
};

document.querySelectorAll('button.product-box__btn').forEach(item => {
    item.addEventListener('click', event => {
        let block = item.closest('.product-box__item');
        let countInput = block.querySelector('input.qty__item');
        let id = block.dataset.id;
        let price = parseInt(block.dataset.price);
        let count = parseInt(countInput.value);
        if (isNaN(count) || count <= 0)
            count = 1;
        addCartItem(id, price, count);
       updateCartInfo()
    })
});

// Cart-Form

let modal = document.getElementById("my_modal");
let btn = document.getElementById("btn_modal_window");
let span = document.getElementsByClassName("close_modal_window")[0];
let cartForm = document.getElementById("cart-form");


function isCartEmpty() {
    return getCartCount() == 0;
};

btn.onclick = function () {
    if (isCartEmpty()){
        alert("Корзина пуста")
        return
    }
    modal.style.display = "block";
};

function updateCartInfo() {
    cartAmountLabel.innerText = getCartAmount() ? getCartAmount() : "XXX";
    cartCountLabel.innerText = getCartCount() ? getCartCount() : "XXX";
};

cartForm.addEventListener('submit', () => {
    cart = {};
    alert("Cообщение с благодарностью за покупки")
    updateCartInfo()
    cartForm.reset()
});

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};})()