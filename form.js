var nameError = document.getElementById('name-error');
var phoneError = document.getElementById('phone-error');
var emailError = document.getElementById('email-error');
var messageError = document.getElementById('message-error');
var submitError = document.getElementById('submit-error');

function validateName() {
    var name = document.getElementById('contact-name').value;

    if (name.length == 0) {
        nameError.innerHTML = 'Name is required';
        return false;
    }
    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameError.innerHTML = 'Write full name';
        return false;
    }
    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validatePhone() {
    var phone = document.getElementById('contact-phone').value;

    if (phone.length == 0) {
        phoneError.innerHTML = 'Phone no is required';
        return false;
    }
    if (phone.length !== 11) {
        phoneError.innerHTML = 'Phone no should be 11 digits';
        return false;
    }
    if (!phone.match(/^[0-9]{11}$/)) {
        phoneError.innerHTML = 'Only Digits please';
        return false;
    }
    phoneError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}



function validateEmail() {
    var email = document.getElementById('contact-email').value;

    if (email.length === 0) {
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
        emailError.innerHTML = 'Invalid email format';
        return false;
    }
    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}



function validateMessage() {
    var message = document.getElementById('contact-message').value;
    var required = 30;
    var left = required - message.length;

    if (left > 0) {
        messageError.innerHTML = left + ' more characters required';
        return false;
    }
    messageError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}



function validateForm() {
    if (!validateName() || !validatePhone() || !validateEmail() || !validateMessage()) {
        submitError.style.display = 'block';
        submitError.innerHTML = 'Please fix error to submit';
        setTimeout(function () { submitError.style.display = 'none' }, 3000);
        return false;
    }
    else {
        alert('Your form submitted successfully!');
        return true;
    }
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbwZoHz-XZm3vRTa68Ix1-WG9t5J1Z3jLjt_LiNMspuAtifcsSARdqfcRdAACcI8iX4oNg/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            console.log('Success!', response);
            nameError.innerHTML = '';
            emailError.innerHTML = '';
            phoneError.innerHTML = '';
            messageError.innerHTML = '';
        })
        .catch(error => console.error('Error!', error.message));
    setTimeout(function () {
        msg.innerHTML = '';
    }, 5000);
    form.reset();
});
