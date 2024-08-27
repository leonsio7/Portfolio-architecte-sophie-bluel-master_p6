const isLogin = () => {

    return sessionStorage.getItem("token") ? true : false
}


//console.log(isLogin());

const loginLink = document.getElementById("loginLink");
const editBtn = document.getElementById("editBtn");

if (isLogin()) {

    editBtn.style.display = 'inline';

    loginLink.innerText = "logout";


    loginLink.addEventListener('click', () => {
        sessionStorage.clear();
        document.location.href = "/";

    })
}
else {

    editBtn.style.display = 'none';

    loginLink.addEventListener('click', () => {
        document.location.href = "login.html";

    })
}