

let password = document.getElementById('password')
let password2 = document.getElementById('password2')
let registerbutton =document.querySelector('.test')





registerbutton.addEventListener('click', (e)=>{
    
    if (password.value !== password2.value) {
        alert('password do not match')
        e.preventDefault();
    }
} )

