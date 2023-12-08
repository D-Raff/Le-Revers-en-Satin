// general functionality for home, about and contact page

const date = document.querySelector('[data-date]')
date.textContent = new Date().getFullYear()

// timeout for form in contact page
let submitBtn = document.querySelector('[data-submit]')
let email = document.querySelector('[data-mail]')
let message = document.querySelector('[data-message]')

function emptyForm(){
    email.value = ''
    message.value = ''
}

function clearForm(){
    setTimeout(emptyForm ,1000)
}

submitBtn.addEventListener('click', clearForm)