function login(){
    const userNameInput = document.getElementById('userName').value
    const passwordInput = document.getElementById('password').value

    if(userNameInput === 'admin' && passwordInput === 'admin123') {
        window.location.href = 'main.html'
    }
    else{
        my_modal_5.showModal()
    }
}
