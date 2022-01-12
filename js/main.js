// console.log("ok")
const clickBtn = document.querySelectorAll('.button')
const tbodyRef = document.querySelector('.tbody')
let carrito = []

clickBtn.forEach(btn => {
    btn.addEventListener('click', addToCarrito)
})

function addToCarrito(e) {
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;
    const newItem = {
        title: itemTitle,
        price: itemPrice,
        img: itemImg,
        cantidad: 1
    }
    addItemToCarrito(newItem)
    // console.log(itemTitle,itemPrice)

}

function addItemToCarrito(newItem) {
    const alert = document.querySelector('.alert')
    setTimeout( 
        function(){
        alert.classList.add('hide')   
        },3000)
        alert.classList.remove('hide')
    
    const inputElement = tbodyRef.getElementsByClassName('input__Element')

    for(let i = 0; i < carrito.length; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){

            carrito[i].cantidad ++;
            const inputValue = inputElement[i]
            inputValue.value ++
            carritoTotal()
            // console.log(inputValue)
            // console.log(carrito)
            return null;
        }
    }
    carrito.push(newItem)
    // console.log(carrito);
    renderCarrito()
}

function renderCarrito() {
    tbodyRef.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('itemCarrito')
        const content =
            `<tr>
                <th scope="row">1</th>
                <td class="table__productos">
                    <img src=${item.img} alt=".." class="" >
                    <h6 class="title">${item.title}</h6>
                </td>
                    <td class="table__precio">
                    <p>${item.price}</p>
                </td>
                <td class="table__cantidad">
                    <input type="number" min="1" value=${item.cantidad} class="input__Element">
                    <button class="delete btn btn-danger">x</button>
                </td>
            </tr>
            `
            tr.innerHTML = content;
            tbodyRef.append(tr)
            
            tr.querySelector('.delete').addEventListener('click', removeItemCart)
            
    // const alert = document.querySelector('.alertDelete')
    // setTimeout( function(){
    //     alert.classList.add('hide')   
    // },2000)
    // alert.classList.remove('hide')

            tr.querySelector('.input__Element').addEventListener('change', sumaCantidad)
    })
    carritoTotal()
}

function carritoTotal(){
    let total = 0;
    const itemCarritoTotal = document.querySelector('.itemCarritoTotal')
    carrito.forEach((item) =>{
        console.log(item)
        const precio = Number(item.price.replace('$',''))
        total = total + precio*item.cantidad
        console.log(total)
    })
    itemCarritoTotal.innerHTML =`total $${total}`
    addLocalStorage()
}

function removeItemCart(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest('.itemCarrito')
    const title = document.querySelector('.title').textContent;
    for(let i = 0; i<carrito.length; i++){
        if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i,1)
               const alert = document.querySelector('.alertDelete')
    setTimeout( function(){
        alert.classList.add('hide')   
    },3000)
    alert.classList.remove('hide')
            console.log('eliminado')
        }
    }
    tr.remove();
    carritoTotal();

}

function sumaCantidad(e){
    const sumaInput = e.target;
    const tr = sumaInput.closest('.itemCarrito')
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item =>{
        if(item.title.trim() === title){
            sumaInput < 1 ?  (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            carritoTotal()
        }
    })
}

function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        renderCarrito()
    }
} 