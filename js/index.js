
const sessionContainer = document.getElementById('session')

const token = localStorage.getItem('token')

if (token) {

    const myHeaders = new Headers();
    myHeaders.append("x-token", token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://vubonic-backend-production.up.railway.app/api/auth/logIn", requestOptions)
        .then(response => response.json())
        .then(result => {

            if(result.username){
                sessionContainer.innerHTML = `
                <p class="username" >${result.username}</p>
                <button id="logOut" onClick="logOut()">Cerrar Session</button>
            `}

        })
        .catch(error => console.log('error', error));

}

const logOut = () => {
    localStorage.clear()
    window.location.reload()
}

// Carrito de compras

const shopCar = document.getElementById('carProducts')

const shopCarBtn = document.getElementById('sidebar')

const refresh = () => {
    let productList = ''

    const products = JSON.parse(localStorage.getItem('carrito'))
    products.forEach(element => {
        productList += `<li>${element.name} <button onclick="eliminarProducto(${element.id})">Eliminar</button></li>`
    });

    shopCar.innerHTML = productList
}

const añadirProducto = (name) => {

    let producto = {
        'id': Math.floor(Math.random() * 100),
        'name': name
    }

    let items = JSON.parse(localStorage.getItem('carrito')) || []
    items.push(producto)
    localStorage.setItem('carrito', JSON.stringify(items))
    refresh()
}

const eliminarProducto = (id) => {

    let items = JSON.parse(localStorage.getItem('carrito')) || []
    const newItems = items.filter(element => element.id != id);
    localStorage.setItem('carrito', JSON.stringify(newItems))
    refresh()
}

const vaciarCarrito = ( ) => {
    localStorage.setItem('carrito', '[]')
    refresh()
}

shopCarBtn.addEventListener('click', e => {
    refresh()
})

