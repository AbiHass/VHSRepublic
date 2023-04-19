const barsBtn = document.querySelector('.menu-label');
const barsMenu = document.querySelector('.navbar-list');

const cartBubble = document.querySelector('.cart-bubble');
const cartBtn = document.querySelector('.cart-label');

const cartMenu = document.querySelector('.cart');
const productsCart = document.querySelector('.cart-container');
const buyBtn = document.querySelector('.btn-buy');
const deleteBtn = document.querySelector('.btn-delete');
const total = document.querySelector('.total');

const successModal = document.querySelector('.add-modal');

const overlay = document.querySelector('.overlay');


/*--------------------Logica Carrito-------------------*/
/*-----------------------------------------------------*/

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const saveLocalStorage = cartList => {
    localStorage.setItem('cart', JSON.stringify(cartList));
};


// Renderizado de un producto
const renderCartProduct = cartProduct => {
    const { id, name, price, img, quantity } = cartProduct;
    return `
    <div class="cart-item">
        
        <div class="item-info">
            <img src=${img} alt="Img del carrito" />
            <h3 class="item-title">${name}</h3>          
      
                
                <p class="item-price"></p>
                 
                
            
        </div>
        <div class="item-handler">
        <span class="item-valor">USD ${price}</span>
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
    </div>
    `;
};
const renderCart = () => {
    if (!cart.length) {
        productsCart.innerHTML = `<p class="empty-msg">El carrito está vacío. </p>`;
        return;
    }
    productsCart.innerHTML = cart.map(renderCartProduct).join('');
};



// Funcion para obtener el precio total
const getCartTotal = () =>
    cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0);

// Funcion para renderizar el precio total de la compra
const showTotal = () => {
    total.innerHTML = `USD ${getCartTotal().toFixed(2)}`;
};
// Funcion para renderizar la cantidad de productos, en la burbujita
const renderCartBubble = () => {
    cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
};

// Si no hay nada en el carro, deshabilitemos el boton de compra, si no habilitalo
const disableBtn = btn => {
    if (!cart.length) {
        btn.classList.add('disabled');
    } else {
        btn.classList.remove('disabled');
    }
};




// Funcion pra checkear el estado del carrito
const checkCartState = () => {
    saveLocalStorage(cart);
    renderCart(cart);
    showTotal(cart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    renderCartBubble(cart);
};
// Funcion para agregar un producto al carro
const addProduct = e => {
    if (!e.target.classList.contains('btn-add')) return;
    const { id, name, price, img } = e.target.dataset;

    const product = productData(id, name, price, img);

    if (isExistingCartProduct(product)) {
        addUnitToProduct(product);
        showSuccesModal('Se agregó una unidad del producto al carrito');
    } else {
        createCartProduct(product);
        showSuccesModal('El producto se ha agregado al carrito');
    }

    checkCartState();
};
// Funcion para mostrar el modal
const showSuccesModal = msg => {
    successModal.classList.add('active-modal');
    successModal.textContent = msg;
    setTimeout(() => {
        successModal.classList.remove('active-modal');
    }, 1500);
};
// Funcion para crear un producto en el carrito
const createCartProduct = product => {
    cart = [...cart, { ...product, quantity: 1 }];
};
// Funcion para añadir una unidad de producto
const addUnitToProduct = product => {
    cart = cart.map(cartProduct =>
        cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct
    );
};
// Funcion para checkear si existe un product/o en el carro
const isExistingCartProduct = product => {
    return cart.find(item => item.id === product.id);
};
// Funcion que va a crear un objeto para la data del producto
const productData = (id, name, price, img) => {
    return { id, name, price, img };
};

// Funcion para manipular el boton del menos
const handleMinusBtnEvent = id => {
    const existingCartProduct = cart.find(item => item.id === id);

    if (existingCartProduct.quantity === 1) {
        if (window.confirm('¿Desea Eliminar el producto del carrito?')) {
            // Borrar el producto
            removeProductFromCart(existingCartProduct);
        }

        return;
    }
    substractProductUnit(existingCartProduct);
};
// Funcion para restar una unidad
const substractProductUnit = existingCartProduct => {
    cart = cart.map(product => {
        return product.id === existingCartProduct.id
            ? { ...product, quantity: Number(product.quantity) - 1 }
            : product;
    });
};
// Funcion para remover el producto del carro
const removeProductFromCart = existingCartProduct => {
    cart = cart.filter(product => product.id !== existingCartProduct.id);
    checkCartState();
};
// Funcion para cuando apretemos el más
const handlePlusBtnEvent = id => {
    const existingCartProduct = cart.find(item => item.id === id);
    addUnitToProduct(existingCartProduct);
};
const handleQuantity = e => {
    if (e.target.classList.contains('down')) {
        handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains('up')) {
        handlePlusBtnEvent(e.target.dataset.id);
    }
    checkCartState();
};

const resetCartItems = () => {
    cart = [];
    checkCartState();
};






// Funcion para realizar una de las acciones del carrito
const completeCartAction = (confirmMsg, successMsg) => {
    if (!cart.length) return;
    if (window.confirm(confirmMsg)) {
        resetCartItems();
        alert(successMsg);
    }
};

const completeBuy = () => {
    completeCartAction('¿Desea completar su compra?', '¡Gracias por tu compra!');
};

const deleteCart = () => {
    completeCartAction('¿Desea borrar todo?', 'No hay productos en el carrito');
};



// Togglea el menu y si el carrito esta abierto , lo cierra. Finalmente, muestra el overlay
const toggleMenu = () => {
    barsMenu.classList.toggle('open-menu');
    overlay.classList.toggle('show-overlay');
}
const toggleMenuScroll = () => {
    if (
        !barsMenu.classList.contains('open-menu')
    )
        return;

    barsMenu.classList.remove('open-menu');
    overlay.classList.remove('show-overlay');

};

const navbarClick = () => {
    barsMenu.classList.remove('open-menu');
    overlay.classList.remove('show-overlay');

};



const init = () => {
    barsBtn.addEventListener('click', toggleMenu);
    /* cartBtn.addEventListener('click', toggleCart); */ //????????????????

    document.addEventListener('DOMContentLoaded', renderCart);
    document.addEventListener('DOMContentLoaded', showTotal);

    productsCart.addEventListener('click', handleQuantity);
    buyBtn.addEventListener('click', completeBuy);
    deleteBtn.addEventListener('click', deleteCart);

    overlay.addEventListener('click', navbarClick);
    window.addEventListener('scroll', toggleMenuScroll);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    renderCartBubble(cart);
};

init();