const shipPrice = 30000
let users = JSON.parse(localStorage.getItem("user"))
function carts() {


        window.location.href = "carts.html";
        let user = JSON.parse(localStorage.getItem("user"));
        cartsItems = user.cart
        localStorage.setItem("carts", JSON.stringify(cartsItems));


}

let userLogin = JSON.parse(localStorage.getItem("user"));
let cartUser = userLogin.cart;
let priceBig = 0;
let cartsItems = JSON.parse(localStorage.getItem("carts"));


function showCart() {
    let user = JSON.parse(localStorage.getItem("user"));
    let cart = user.cart;


    let totalPrice = 0
    let str = ""
    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price;
        str += `
<li class="cart-item" data-id="${cart[i].id}">

                <div class="cart-item-info">
                
                    <p class="cart-item-title">
                        ${cart[i].title}
                    </p>
                    <p id="price${cart[i].id}" class="cart-item-price price" data-price="${cart[i].price}">
                    ${vnd(parseInt(cart[i].price))}
                    </p>
                    
                </div>
                <p class="product-note">
                <img src="${cart[i].img}" style="width: 150px">
</p>
                <div class="cart-item-control">
                    <button class="cart-item-delete" onclick="deleteCartItem(${cart[i].id})">Xóa</button>
                    
                  <div class="buttons_added">
                    <button id="edit${cart[i].id}" class="cart-item-edit" style="display: block" onclick="editItems(${cart[i].id})"><i class="fa-light fa-pencil"></i> Chỉnh sửa</button>
                    <button id="save${cart[i].id}" class="cart-item-edit" style="display: none" onclick="save(${cart[i].id})">Lưu</button>
                    
                        &nbsp&nbsp&nbsp&nbsp
                  
                        <input id="tang${cart[i].id}" class="minus is-form" style="display: none" type="button" value="-" onclick="decreasingNumber(${cart[i].id},this)">
                        <input class="input-qty" disabled max="100" min="1" name="" type="number" id="soluong${cart[i].id}" value="1">
                        <input id="giam${cart[i].id}" class="plus is-form" style="display: none" type="button" value="+" onclick="increasingNumber(${cart[i].id},this)">
                        &nbsp&nbsp&nbsp&nbsp

                    <button id="out" style="display: none" class="cart-item-edit" onclick="thoat()">Thoát</button>

                    </div>
                
                </div>
                
            </li>
`
    }


    priceBig = totalPrice

    document.getElementById("oder-history-items").innerHTML = str;
    document.getElementById("total").innerHTML = vnd(priceBig);
}

showCart()

function increasingNumber(id, e) {


    let qty = e.parentNode.querySelector('.input-qty');
    if (parseInt(qty.value) < qty.max) {
        qty.value = parseInt(qty.value) + 1;


    } else {
        qty.value = qty.max;
    }


}


function decreasingNumber(id, e) {


    let qty = e.parentNode.querySelector('.input-qty');
    if (qty.value > qty.min) {
        qty.value = parseInt(qty.value) - 1;


    } else {
        qty.value = qty.min;
    }
}


function deleteCartItem(id) {
    findProductById(id)
    let user = JSON.parse(localStorage.getItem("user"));
    let cart = user.cart;

    for (let i = 0; i < cart.length; i++) {
        if (id == cart[i].id) {
            cart.splice(i, 1);

            break;
        }
    }

    userLogin.cart = cart
    cartsItems = cart
    localStorage.setItem("user", JSON.stringify(userLogin))
    localStorage.setItem("carts", JSON.stringify(cartsItems))

    toast({
        title: "Thông báo!",
        message: "Đã xóa vật phẩm khỏi giỏ hàng",
        type: "success",
        duration: 5000
    });
    showCart()
    let cartItems = JSON.parse(localStorage.getItem("carts"));
    document.querySelector("#cart-number").innerHTML = cartItems.length


}

function editItems(id) {
    document.getElementById("tang" + id).style.display = "block"
    document.getElementById("giam" + id).style.display = "block"
    document.getElementById("edit" + id).style.display = "none"
    document.getElementById("save" + id).style.display = "block"

}


let total = 0

function save(id) {
    let soLuong = parseInt(document.getElementById("soluong" + id).value)
    let price = parseInt(findProductById(id).price)
    total = price * soLuong


    document.getElementById("price" + id).innerHTML = vnd(total);
    document.getElementById("tang" + id).style.display = "none"
    document.getElementById("giam" + id).style.display = "none"
    document.getElementById("edit" + id).style.display = "block"
    document.getElementById("save" + id).style.display = "none"

    for (let i = 0; i < cartsItems.length; i++) {
        if (cartsItems[i].id == id) {
            cartsItems[i].price = total
            break;
        }
    }
    localStorage.setItem("carts", JSON.stringify(cartsItems))
    let newTotal = 0
    for (let i = 0; i < cartsItems.length; i++) {
        newTotal += cartsItems[i].price
    }
    document.getElementById("total").innerHTML = vnd(newTotal);


    toast({
        title: "Thông báo!",
        message: "Lưu số lượng thành công",
        type: "success",
        duration: 5000
    });
}


function thanhToan() {
    document.querySelector('.checkout-page').style.transform = "translateX(0%)"
    showBill()
}


function thoat() {
    document.querySelector('.checkout-page').style.transform = "translateX(100%)"
}


let giaotannoi = document.querySelector('#giaotannoi');
let tudenlay = document.querySelector('#tudenlay');

function tuDenLay() {

    giaotannoi.classList.remove("active");
    tudenlay.classList.add("active");
    document.getElementById("ship").style.display = "none"
    document.querySelector("#checkout-cart-price-final").innerHTML = vnd(billTuLay)

    console.log(price)
}

function giaoTanNoi() {
    tudenlay.classList.remove("active");
    giaotannoi.classList.add("active");
    document.getElementById("ship").style.display = "block"
    document.querySelector('#checkout-cart-price-final').innerHTML = vnd(billTuLay + 30000)

}


let listOder = document.querySelector('#list-order-checkout');
let billTuLay = 0


function showBill() {
    let cartBill = JSON.parse(localStorage.getItem("carts"));
    let str = ""
    let tienHang = 0

    for (let i = 0; i < cartBill.length; i++) {
        tienHang += cartBill[i].price
        str += `<div class="food-total">
        <div class="count">${vnd(cartBill[i].price)}</div>
        <div class="info-food">
            <div class="name-food">${cartBill[i].title}</div>
        </div>
    </div>`
    }
    billTuLay = tienHang
    document.querySelector("#total-bill").innerHTML = vnd(tienHang)
    document.querySelector('#checkout-cart-price-final').innerHTML = vnd(tienHang + shipPrice)
    listOder.innerHTML = str
}


function butotnClick() {
    let hinhThuc = document.querySelector('.type-order-btn.active ').textContent;
    let today = new Date()
    let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    let thoiGIan = document.getElementById("time-buy").value
    let note = document.getElementById("note-buy").value
    let tenNguoiNhan = document.getElementById("tennguoinhan").value
    let sdtNguoiNhan = document.getElementById("sdtnhan").value
    let diaChi = document.getElementById("diachinhan").value
    let checkValue = '';
    for (let i = 0; i < len; i++) {
        if (phuongThuc.item(i).checked) {
            checkValue = phuongThuc.item(i).value;
        }
    }


    // if (thoiGIan == "" || tenNguoiNhan == "" || sdtNguoiNhan == "" || diaChi == "" || thoiGIan ==){
    //     toast({
    //         title: "Thông báo!",
    //         message: "Vui lòng nhập đầy đủ thông tin",
    //         type: "error",
    //         duration: 5000
    //     });
    // }


        let chiTietBill = {
            method: hinhThuc,
            date: date,
            time: thoiGIan,
            note: note,
            name: tenNguoiNhan,
            phone: sdtNguoiNhan,
            address: diaChi
        }

    localStorage.setItem("oderDetail", JSON.stringify(chiTietBill))
    let user = JSON.parse(localStorage.getItem("user"));
    let newCart = []
    user.cart = newCart
    localStorage.setItem("user", JSON.stringify(user))
    toast({
        title: "Thông báo!",
        message: "Bạn đã đặt hàng thành công",
        type: "success",
        duration: 5000
    });


    let timerId = setInterval(() => window.location.href="index.html", 1500);


}

let phuongThuc = document.getElementsByName('giaongay');
let len = phuongThuc.length;


let checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click', butotnClick);
