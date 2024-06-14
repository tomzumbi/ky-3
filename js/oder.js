let cartsOder = JSON.parse(localStorage.getItem("carts"));
if (cartsOder == null) {
    cartsOder = []
}
console.log(cartsOder)

let userInfo = JSON.parse(localStorage.getItem("user"));
document.querySelector("#user").innerHTML = " <i class=\"fa-light fa-user\"></i>\n" +
    "                        <div class=\"auth-container\">\n" +
    "                            <span class=\"text-dndk\">Tài khoản</span>\n" +
    "                            <span class=\"text-tk\">" + userInfo.fullName + " <i class=\"fa-sharp fa-solid fa-caret-down\"></i></span>\n" +
    "                        </div>\n" +
    "                        <ul class=\"header-middle-right-menu\">\n" +
    "                            <li><a href=\"\"><i class=\"fa-light fa-circle-user\"></i> Tài khoản của tôi</a></li>\n" +
    "\n" +
    "                            \n" +
    "<li><a href=\"oderHistory.html\" ><i class=\"fa-regular fa-bags-shopping\"></i> Đơn hàng đã mua</a></li>\n" +
    "<li class=\"border\"><a id=\"logout\" onclick='logout()'><i class=\"fa-light fa-right-from-bracket\"></i> Thoát tài khoản</a></li>" +
    "                        </ul>";


function showoder() {
    let oderHtml = document.querySelector('.order-history-section')
    let productHtml = ''
    let str = ''
    let billOder = 0

        for (let i = 0; i < cartsOder.length; i++) {
            billOder += cartsOder[i].price

            str += `<div class="order-history-group">
             <div class="order-history">
                    <div class="order-history-left">
                        <img src="${cartsOder[i].img}" alt="">
                        <div class="order-history-info">
                            <h4>${cartsOder[i].title}!</h4>
                            
                        </div>
                    </div>
                    <div class="order-history-right">
                        <div class="order-history-price">
                            <span class="order-history-current-price">${vnd(cartsOder[i].price)}</span>
                        </div>                         
                    </div>
                </div>
</div>`

    }
    oderHtml.innerHTML = str
    document.getElementById("totalOder").innerHTML = vnd(billOder)
}


function detailOrder(){
    
}


showoder()