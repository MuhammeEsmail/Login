// 
var signUpName = document.querySelector('#signUpName')
var signUpEmail = document.querySelector('#signUpEmail')
var signUpPassword = document.querySelector('#signUpPassword')
var email = document.querySelector('#email')
var password = document.querySelector('#password')
var loginBtn = document.querySelector('#loginBtn')
var signUpBtn = document.querySelector('#signUpBtn')
var signInAnchor = document.querySelector('#signInAnchor')
var signUpAnchor = document.querySelector('#signUpAnchor')
var signInValid1 = document.querySelector('.signInValid1')
var signInValid2 = document.querySelector('.signInValid2')
var logOutBtn = document.querySelector('#logOutBtn')
var exist = document.querySelector('.exist')
var hello = document.querySelector('.hello')
var homeContent = document.querySelector('.homeContent')
if (localStorage.getItem('memory')==null) {
    accounts = []
}
else{
    accounts = JSON.parse(localStorage.getItem('memory'))
}



// signUp function 
function signUp(){
    var isValid;
    if(signUpValidation(signUpName) && signUpValidation(signUpEmail) && signUpValidation(signUpPassword)){
        var newAccount={
            accName:signUpName.value,
            accEmail:signUpEmail.value,
            accPassword:signUpPassword.value
        }
        for (var i = 0; i < accounts.length; i++) {
            if(accounts[i].accEmail==newAccount.accEmail){
                isValid=true;
            }
            else{
                isValid=false;
            }
        }
        if(isValid==true){
            exist.classList.replace('d-none','d-block')
        }
        else{
            exist.classList.replace('d-block','d-none')
            accounts.push(newAccount)
            document.querySelector('.sign-in').classList.replace('d-none','d-block')
            document.querySelector('.sign-up').classList.replace('d-block','d-none')
            localStorage.setItem('memory',JSON.stringify(accounts))
            console.log(accounts);
            clearForm()
        }
        
    }
    
}
signUpBtn.addEventListener('click',function() {
    signUp()
})

// login function
function login() {
    var valid;
    if(signInValidation(email) && signInValidation(password)){
        for (var i = 0; i < accounts.length; i++) {
            if(accounts[i].accEmail==email.value && accounts[i].accPassword==password.value){
                valid=true;
                document.querySelector('.sign-in').classList.add('d-none')
                signInValid2.classList.replace('d-block','d-none')
                document.querySelector('.sign-in').classList.replace('d-block','d-none')
                document.querySelector('.my-title').classList.add('d-none')
                document.querySelector('.hello').classList.replace('d-none','d-block')
                homeContent.innerHTML = `Hi ${accounts[i].accName}`
                break;
            }
            else{
                valid=false;
            }
        }
        if(valid==false)
            signInValid2.classList.replace('d-none','d-block')
        clearForm()

    }
    
}
loginBtn.addEventListener('click',function() {
    login()
})


// logOut function
logOutBtn.addEventListener('click',function(e){
    e.preventDefault()
    document.querySelector('.hello').classList.add('d-none')
    document.querySelector('.sign-in').classList.replace('d-none','d-block')
    document.querySelector('.my-title').classList.replace('d-none','d-block')
})

// clearFor Function
function clearForm() {
    signUpName.value=null;
    signUpEmail.value=null;
    signUpPassword.value=null;
    email.value=null;
    password.value=null;
    signUpName.classList.remove('is-invalid','is-valid');
    signUpEmail.classList.remove('is-invalid','is-valid');
    signUpPassword.classList.remove('is-invalid','is-valid');
    email.classList.remove('is-invalid','is-valid');
    password.classList.remove('is-invalid','is-valid');
}


// go to signUp function
signUpAnchor.addEventListener('click',function(e){
    e.preventDefault()
    document.querySelector('.sign-in').classList.add('d-none')
    document.querySelector('.sign-up').classList.replace('d-none','d-block')
})

// go to signIn function
signInAnchor.addEventListener('click',function(e){
    e.preventDefault()
    document.querySelector('.sign-up').classList.replace('d-block','d-none')
    document.querySelector('.sign-in').classList.replace('d-none','d-block')
})

// signUp Vlidation function
function signUpValidation(ele) {
    var Regex = {
        signUpName : /^(\w|-|\s){1,20}$/,
        signUpEmail : /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
        signUpPassword : /^\w{8,20}$/
    }
    if(Regex[ele.id].test(ele.value)){
        ele.classList.add('is-valid')
        ele.classList.remove('is-invalid')
        ele.nextElementSibling.classList.replace('d-block','d-none')
        return true
    }
    else{
        ele.classList.add('is-invalid')
        ele.classList.remove('is-valid')
        ele.nextElementSibling.classList.replace('d-none','d-block')
        return false
    }
}

// signIn Vlidation function
function signInValidation(ele) {
    var Regex = {
        email : /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
        password : /^([1-9]|\w){8,20}$/
    }
    if(Regex[ele.id].test(ele.value)){
        ele.classList.add('is-valid')
        ele.classList.remove('is-invalid')
        signInValid1.classList.replace('d-block','d-none')
        return true
    }
    else{
        ele.classList.add('is-invalid')
        ele.classList.remove('is-valid')
        signInValid1.classList.replace('d-none','d-block')
        return false
    }
}

