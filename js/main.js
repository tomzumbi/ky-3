
let productItems = JSON.parse(localStorage.getItem("products"))
let str = ""

let cartsUser = users.cart


function checkSoLuong(id){
    let countItem = 0;

    for (let i = 0; i < cartsUser.length; i++) {
        if (cartsUser[i].id == id) {
            countItem = countItem + 1
        }
    }
    return countItem
}

if (users != null) {


    let cartItems = users.cart
    document.querySelector("#user").innerHTML = " <i class=\"fa-light fa-user\"></i>\n" +
        "                        <div class=\"auth-container\">\n" +
        "                            <span class=\"text-dndk\">Tài khoản</span>\n" +
        "                            <span class=\"text-tk\">" + users.fullName + " <i class=\"fa-sharp fa-solid fa-caret-down\"></i></span>\n" +
        "                        </div>\n" +
        "                        <ul class=\"header-middle-right-menu\">\n" +
        "                            <li><a href=\"\"><i class=\"fa-light fa-circle-user\"></i> Tài khoản của tôi</a></li>\n" +
        "\n" +
        "                            \n" +
        "<li><a href=\"oderHistory.html\" ><i class=\"fa-regular fa-bags-shopping\"></i> Đơn hàng đã mua</a></li>\n" +
        "<li class=\"border\"><a id=\"logout\" onclick='logout()'><i class=\"fa-light fa-right-from-bracket\"></i> Thoát tài khoản</a></li>" +
        "                        </ul>";


    function animationCart(id) {

        if (checkSoLuong(id) == 0) {
            document.querySelector(".count-product-cart").style.animation = "slidein ease 1s"
            setTimeout(() => {
                document.querySelector(".count-product-cart").style.animation = "none"
            }, 1000)
            cartItems.push(findProductById(id))
            localStorage.setItem("user", JSON.stringify(users))
            document.querySelector("#cart-number").innerHTML = cartItems.length
            console.log(cartItems)
            toast({
                title: "Thành công!",
                message: "Đơn hàng đã được thêm vào giỏ hàng",
                type: "success",
                duration: 5000
            });

            closeModal()
        } else {

               toast({
                         title: "Thất bại!",
                         message: "Đơn hàng đã có trong giỏ hàng",
                         type: "error",
                         duration: 3000
                     });


        }






    }


    document.querySelector("#cart-number").innerHTML = cartItems.length


}


function findProductById(id) {
    for (let i = 0; i < productItems.length; i++) {
        if (id == productItems[i].id) {
            return productItems[i]
        }
    }
}


function checkCart(id) {
    for (let i = 0; i < productItems.length; i++) {
        if (id == productItems[i].id) {
            return false
        } else return true
    }
}


