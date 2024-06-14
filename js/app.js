let products = JSON.parse(localStorage.getItem("products"));

if (!Array.isArray(products)) {
    products = [];
}


function vnd(price) {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
}


window.onload = show();

function show() {
    let str = "";
    for (let i = 0; i < products.length; i++) {
        str += `<div class="col-product">
            <article class="card-product" >
                <div class="card-header">
                    <a  onclick="detailProduct(${products[i].id})" class="card-image-link">
                    <img class="card-image" src="${products[i].img}" alt="${products[i].title}">
                    </a>
                </div>
                <div class="food-info">
                    <div class="card-content">
                        <div class="card-title">
                            <a href="#" class="card-title-link" >${products[i].title}</a>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="product-price">
                            <span class="current-price">${vnd(products[i].price)}</span>
                        </div>
                    <div class="product-buy">
                        <button onclick="detailProduct(${products[i].id})"  class="card-button order-item"><i class="fa-regular fa-cart-shopping-fast"></i> Đặt món</button>
                    </div> 
                </div>
                </div>
            </article>
        </div>`;
    }
    document.getElementById("home-products").innerHTML = str
}

function detailProduct(index) {
    let modal = document.querySelector('.modal.product-detail');
    let products = JSON.parse(localStorage.getItem('products'));

    let infoProduct = products.find(sp => {
        return sp.id === index;
    })
    let modalHtml = `<div class="modal-header">
    <img class="product-image" src="${infoProduct.img}" alt="">
    </div>
    <div class="modal-body">
        <h2 class="product-title">${infoProduct.title}</h2>
        <div class="product-control">
            <div class="priceBox">
                <span class="current-price">${vnd(infoProduct.price)}</span>
            </div>
            
        </div>
        <p class="product-description">${infoProduct.desc}</p>
    </div>
    <div class="notebox">
            <p class="notebox-title">Ghi chú</p>
            <textarea class="text-note" id="popup-detail-note" placeholder="Nhập thông tin cần lưu ý..."></textarea>
    </div>
    <div class="modal-footer">
        <div class="price-total">
            <span class="thanhtien">Thành tiền</span>
            <span class="price">${vnd(infoProduct.price)}</span>
        </div>
        <div class="modal-footer-control">
            <button class="button-dathangngay" id="datHang" onclick="buy(${infoProduct.id})">Đặt hàng ngay</button>
            <button class="button-dat" id="add-cart" onclick="animationCart(${infoProduct.id})"><i class="fa-light fa-basket-shopping"></i></button>
        </div>
    </div>`;
    document.querySelector('#product-detail-content').innerHTML = modalHtml;
    modal.classList.add('open');
    body.style.overflow = "hidden";


    let tgbtn = document.querySelectorAll('.is-form');
    let qty = document.querySelector('.product-control .input-qty');
    let priceText = document.querySelector('.price');
    tgbtn.forEach(element => {
        element.addEventListener('click', () => {
            let price = infoProduct.price * parseInt(qty.value);
            priceText.innerHTML = vnd(price);
        });
    });

}


// Close popup
const body = document.querySelector("body");
let modalContainer = document.querySelectorAll('.modal');
let modalBox = document.querySelectorAll('.mdl-cnt');
let formLogSign = document.querySelector('.forms');

// Click vùng ngoài sẽ tắt Popup
modalContainer.forEach(item => {
    item.addEventListener('click', closeModal);
});

modalBox.forEach(item => {
    item.addEventListener('click', function (event) {
        event.stopPropagation();
    })
});

function closeModal() {
    modalContainer.forEach(item => {
        item.classList.remove('open');
    });
    body.style.overflow = "auto";
}


function showCategory(category) {


    let str = "";
    for (let i = 0; i < products.length; i++) {

        if(category == products[i].category) {
            str += `<div class="col-product">
            <article class="card-product" >
                <div class="card-header">
                    <a href="#" class="card-image-link">
                    <img class="card-image" src="${products[i].img}" alt="${products[i].title}">
                    </a>
                </div>
                <div class="food-info">
                    <div class="card-content">
                        <div class="card-title">
                            <a href="#" class="card-title-link" >${products[i].title}</a>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="product-price">
                            <span class="current-price">${vnd(products[i].price)}</span>
                        </div>
                    <div class="product-buy">
                        <button onclick="detailProduct(${products[i].id})"  class="card-button order-item"><i class="fa-regular fa-cart-shopping-fast"></i> Đặt món</button>
                    </div> 
                </div>
                </div>
            </article>
        </div>`;
        }


    }
    document.getElementById("home-products").innerHTML = str
}


