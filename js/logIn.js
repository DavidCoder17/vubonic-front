const form = document.getElementById('form')

const email = document.getElementById('email')
const password = document.getElementById('pass')

form.addEventListener('submit', (e) => {

    e.preventDefault()

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
        "email": email.value,
        "password": password.value,
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body,
        redirect: 'follow'
    };

    console.log(body);

    fetch("https://vubonic-backend-production.up.railway.app/api/auth/logIn", requestOptions)
        .then(response => response.json())
        .then(result => {

            if(result.token){
                localStorage.setItem('token', result.token)
                window.location.replace("/vubonic-front/");
            } else {
                alert('Correo i/o Contraseña incorrectos')
            }

        })
        .catch(error => {
            console.log('error', error.json())
        });

})