
const form = document.getElementById('form')

const user = document.getElementById('user')
const email = document.getElementById('email')
const password = document.getElementById('pass')
const password2 = document.getElementById('pass2')

form.addEventListener('submit', (e) => {

    e.preventDefault()

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
        "username": user.value,
        "email": email.value,
        "password": password.value,
        "password2": password2.value
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body,
        redirect: 'follow'
    };

    fetch("https://vubonic-backend-production.up.railway.app/api/auth/signIn", requestOptions)
        .then(response => response.json())
        .then(result => {

            if(result.token){
                localStorage.setItem('token', result.token)
                window.location.replace("/");
            }

        })
        .catch(error => console.log('error', error));

})