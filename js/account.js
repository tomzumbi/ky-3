let accounts = JSON.parse(localStorage.getItem("accounts"))
if (accounts == null) {
    accounts = []
}



//validate
function checkPass(password) {
    if (password.length < 6) {
        return true
    } else {
        return false
    }
}

function checkStringPass(password) {
    let numberCheck = /[0-9]/g;
    let upperCheck = /[A-Z]/g;
    let lowerCheck = /[a-z]/g;
    let strSpecial = /[@$!%*?&]/g;
    if (numberCheck.test(password) && upperCheck.test(password) && lowerCheck.test(password) && strSpecial.test(password)) {
        return true
    } else {
        return false
    }


}

function checkPhone(phone) {
    let numberCheck = /[0-9]/g;
    if (numberCheck.test(phone)) {
        return true
    } else {
        return false
    }


}


//tìm kiếm tài khoản
function findByUsername(username, account) {
    for (let i = 0; i < accounts.length; i++) {
        if (username == accounts[i].username) {
            return true;
        } else {
            return false;
        }
    }
}


//đăng kí

function register() {
    let account = {
        fullName: "",
        username: "",
        phone: "",
        password: "",
        status: "1",
        cart: []
    }
    let fullName = document.getElementById("fullName").value
    let username = document.getElementById("username").value
    let phone = document.getElementById("phone").value
    let password = document.getElementById("password").value
    let repass = document.getElementById("repass").value

    if (fullName == "" && username == "" && phone == "" && password == "" && repass == "") {
        document.getElementById("notice-fullName").innerHTML = "không được để trống mục này"
        document.getElementById("notice-username").innerHTML = "không được để trống mục này"
        document.getElementById("notice-repass").innerHTML = "không được để trống mục này"
        document.getElementById("notice-pass").innerHTML = "không được để trống mục này"
        document.getElementById("notice-phone").innerHTML = "không được để trống mục này"


    } else if (fullName == "") {
        document.getElementById("notice-fullName").innerHTML = "không được để trống mục này"
        document.getElementById("notice-username").innerHTML = ""
        document.getElementById("notice-repass").innerHTML = ""
        document.getElementById("notice-pass").innerHTML = ""
        document.getElementById("notice-phone").innerHTML = ""
    } else if (username == "") {
        document.getElementById("notice-fullName").innerHTML = ""

        document.getElementById("notice-username").innerHTML = "không được để trống mục này"

    } else if (phone == "") {
        document.getElementById("notice-phone").innerHTML = "không được để trống mục này"

        document.getElementById("notice-fullName").innerHTML = ""

        document.getElementById("notice-username").innerHTML = ""


    } else if (password == "") {
        document.getElementById("notice-fullName").innerHTML = ""
        document.getElementById("notice-username").innerHTML = ""
        document.getElementById("notice-repass").innerHTML = ""
        document.getElementById("notice-pass").innerHTML = ""
        document.getElementById("notice-phone").innerHTML = ""
        document.getElementById("notice-pass").innerHTML = "không được để trống mục này"

    } else if (repass == "") {
        document.getElementById("notice-fullName").innerHTML = ""
        document.getElementById("notice-username").innerHTML = ""
        document.getElementById("notice-repass").innerHTML = ""
        document.getElementById("notice-pass").innerHTML = ""
        document.getElementById("notice-phone").innerHTML = ""
        document.getElementById("notice-repass").innerHTML = "không được để trống mục này"

    } else if (checkPhone(phone) != true) {
        document.getElementById("notice-fullName").innerHTML = ""
        document.getElementById("notice-username").innerHTML = ""
        document.getElementById("notice-repass").innerHTML = ""
        document.getElementById("notice-pass").innerHTML = ""
        document.getElementById("notice-phone").innerHTML = ""
        document.getElementById("notice-phone").innerHTML = "Số điện thoại không đúng định dạng"

    } else if (phone.length != 10) {
        document.getElementById("notice-fullName").innerHTML = ""
        document.getElementById("notice-username").innerHTML = ""
        document.getElementById("notice-repass").innerHTML = ""
        document.getElementById("notice-pass").innerHTML = ""
        document.getElementById("notice-phone").innerHTML = ""
        document.getElementById("notice-phone").innerHTML = "Số điện thoại không đúng định dạng"

    } else if (checkPass(password)) {
        document.getElementById("notice-fullName").innerHTML = ""
        document.getElementById("notice-username").innerHTML = ""
        document.getElementById("notice-repass").innerHTML = ""
        document.getElementById("notice-pass").innerHTML = ""
        document.getElementById("notice-phone").innerHTML = ""
        document.getElementById("notice-pass").innerHTML = "Mật khẩu phải lớn hơn 8 kí tự "

    } else if (checkStringPass(password) != true) {
        document.getElementById("notice-pass").innerHTML = "Mật khẩu phải bao gồm chữ hoa, chữ thường, số va kí tự đặc biệt"
    } else if (repass != password) {
        document.getElementById("notice-pass").innerHTML = ""
        document.getElementById("notice-repass").innerHTML = "Mật khẩu không trùng khớp"
    } else {
        document.getElementById("notice-repass").innerHTML = ""

        account = {
            fullName: fullName,
            username: username,
            phone: phone,
            password: password,
            status: "1",
            cart: [],
        }
        console.log(account)
        if (findByUsername(account.username, account) != true) {
            document.getElementById("notice-fullName").innerHTML = ""
            document.getElementById("notice-username").innerHTML = ""
            document.getElementById("notice-repass").innerHTML = ""
            document.getElementById("notice-pass").innerHTML = ""
            document.getElementById("notice-phone").innerHTML = ""
            accounts.push(account)
            localStorage.setItem("accounts", JSON.stringify(accounts))
            toast({
                title: "Thành công!",
                message: "Bạn đã đăng ký thành công tài khoản",
                type: "success",
                duration: 5000
            });

            let timerId = setInterval(() => window.location.href="login.html", 1500);
        } else {
            document.getElementById("notice-username").innerHTML = "Tên đăng nhập đã tồn tại"
        }
    }


}

//đăng nhập

let user = {
    fullName: "",
    username: "",
    phone: "",
    password: "",
    status: "",
    cart: []
}


function checkUsernameLogin(username) {
    for (let i = 0; i < accounts.length; i++) {
        console.log(accounts[i])


        if (accounts[i].username === username) {
            return true
        }


    }
}

function usernameLogin(username){
    for (let i = 0; i < accounts.length; i++) {
        if(username === accounts[i].username) {
            user = {
                fullName: accounts[i].fullName,
                username: username,
                phone: accounts[i].phone,
                password: accounts[i].password,
                status: accounts[i].status,
                cart: accounts[i].cart
            }
            return user
        }
    }
}


function login(){
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    if (checkUsernameLogin(username)) {
        document.getElementById("notice-username").innerHTML = ""
        if (password != usernameLogin(username).password){
            document.getElementById("notice-password").innerHTML = "Mật khẩu nhập vào không đúng"
        } else {
            document.getElementById("notice-password").innerHTML = ""
            document.getElementById("notice-username").innerHTML = ""
            localStorage.setItem("user", JSON.stringify(usernameLogin(username)))
            localStorage.setItem("carts", JSON.stringify(usernameLogin(username).cart))

            window.location.href = "index.html"

        }
    } else {
        document.getElementById("notice-username").innerHTML = "Tài khoản không tồn tại"

    }



}

function logout(){
    localStorage.removeItem("user")
    window.location.reload()
}
