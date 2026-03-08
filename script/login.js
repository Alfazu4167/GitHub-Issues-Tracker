document.getElementById('singin-btn')
.addEventListener("click",()=>{
    const singInInput = document.getElementById("singIn-input")
    const username = singInInput.value;
    const passwordInput = document.getElementById("password-input")
    const password = passwordInput.value;

    if (username == 'admin' && password == "admin123") {
         alert('Sign in success');
        window.location.assign('./home.html');
    }else{
        alert("Invalid Username or Password")    
    return}

})