const products = document.querySelector('.productsContainer');

const categories = document.querySelector('.categories');
const categoriesList = document.querySelectorAll('.category');
const btnLoad = document.querySelector('.btn-load');

const cartBubble = document.querySelector('.cart-bubble');


const barsBtn = document.querySelector('.menu-label');
const barsMenu = document.querySelector('.navbar-list');

const overlay = document.querySelector('.overlay');
const successModal = document.querySelector('.add-modal');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const saveLocalStorage = cartList => {
  localStorage.setItem('cart', JSON.stringify(cartList));
};


const renderProduct = product => {
  const { id, name, director, price, img } = product;
  return `
        <div class="product">
              <img src="${img} " alt="${name} " class="img">
              <div>
                <h2>${name} </h2>
                <h1>${director}</h1>
                <div class="product-price"> <p>USD ${price}</p> </div>
              </div>

                <button class="btn-add" 
                data-id='${id}'
                data-name='${name}'
                data-price='${price}'
                data-img='${img}'>Comprar</button>
        </div>`;
};





const renderCart = () => {
  if (!cart.length) {
      productsCart.innerHTML = `<p class="empty-msg">El carrito está vacío. </p>`;
      return;
  }
  productsCart.innerHTML = cart.map(renderCartProduct).join('');
};









//-------------------------------------------------------------------

// Función de renderizado de los productos divididdos para usar con el botón ver más.
const renderDividedProducts = (index = 0) => {
  products.innerHTML += productsController.dividedProducts[index]
    .map(renderProduct)
    .join('');
};

// Función de renderizado de los productos del carrito cuando se aplican filtros.
const renderFilteredProducts = category => {
  const productsList = productsData.filter(
    product => product.category === category
  );
  products.innerHTML = productsList.map(renderProduct).join('');
};

const renderProducts = (index = 0, category = undefined) => {
  if (!category) {
    renderDividedProducts(index);
    return;
  }
  renderFilteredProducts(category);
};

/*------------------------------------------*/
/*-----------Lógica de filltros-------------*/
/*------------------------------------------*/
// Función para cambiar el estado del botón ver más.
const changeShowMoreBtnState = category => {
  if (!category) {
    btnLoad.classList.remove('hidden');
    return;
  }
  btnLoad.classList.add('hidden');
};

//Función para cambiar el estado visual de los botones de filtro de categorías.
const changeBtnActiveState = selectedCategory => {
  const categories = [...categoriesList];
  categories.forEach(categoryBtn => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove('active');
      return;
    }
    categoryBtn.classList.add('active');
  });
};

// Función para cambiar todos los estados relacionados a los filtros.
const changeFilterState = e => {
  const selectedCategory = e.target.dataset.category;
  changeBtnActiveState(selectedCategory);
  changeShowMoreBtnState(selectedCategory);
};

//Función para aplicar el filtrar productos por categoría.
const applyFilter = e => {
  if (!e.target.classList.contains('category')) return;
  changeFilterState(e);
  if (!e.target.dataset.category) {
    products.innerHTML = '';
    renderProducts();
  } else {
    renderProducts(0, e.target.dataset.category);
    productsController.nextProductsIndex = 1;
  }
};

//Función que indica si estamos en el último array del array de  productos divididos.
const isLastIndexOf = () =>
  productsController.nextProductsIndex === productsController.productsLimit;

//Función para mostrar más productos al apretar en el botón ver más.
const showMoreProducts = () => {
  renderProducts(productsController.nextProductsIndex);
  productsController.nextProductsIndex++;
  if (isLastIndexOf()) {
    btnLoad.classList.add('hidden');
  }
};






//-----------------------------------------------------------------------

/*--------------------Menu interface-------------------*/
/*-----------------------------------------------------*/

// Logica para apertura de menu y carrito y overlay


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

// Funcion para renderizar la cantidad de productos, en la burbujita
const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
};

const checkCartState = () => {
  saveLocalStorage(cart);
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
/*-----------------------------------------------------*/





//------------------------------------------------------------------------
const init = () => {
  renderProducts();
  categories.addEventListener('click', applyFilter);
  btnLoad.addEventListener('click', showMoreProducts);
  
  barsBtn.addEventListener('click', toggleMenu);
  window.addEventListener('scroll', toggleMenuScroll);
  overlay.addEventListener('click', navbarClick); 
  renderCartBubble(cart);
  products.addEventListener('click', addProduct);
  
  barsMenu.addEventListener('click', navbarClick); //???????????

  
 
  
};


init();