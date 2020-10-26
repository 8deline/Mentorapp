

let followButton = document.querySelector('.follow-status')

followButton.addEventListener('click', (e)=>{
    followButton.innerHTML = "Following"
    followButton.classList.remove('follow-status')
})

