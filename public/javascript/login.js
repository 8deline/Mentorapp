let loginemail = document.querySelector('.login-email')
let loginpw = document.querySelector('.login-password')
let loginbutton = document.querySelector('.login')

loginbutton.addEventListener('click', (e)=>{
    if(loginemail.value === "" || loginemail.value=== null){
        alert('email cannot be empty')
        e.preventDefault();
    } else if (loginpw.value===""|| loginpw.value=== null ){
        alert('password cannot be empty')
        e.preventDefault();
    }
    console.log('login validation is working')
})
