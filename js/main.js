// import products from './products.js';
// import { renderProductCards } from './modules/productCards.js';
// import { paginate } from './modules/pagination.js';
// import { closeCart, openCart } from './modules/cartPopup.js';
// import { cartData } from './modules/cartData.js';
// import { renderInitialProducts } from './modules/renderInitialProducts.js';
// import { showMoreProducts } from './modules/showMoreProducts.js';
// import { filter } from './modules/productFilters.js';


// window.addEventListener('DOMContentLoaded', () => {
//     // const productContainer = document.querySelector('.js-products-list');
//     // let firstProductIndex = 0;
//     // let lastProductIndex = 8; // Это количество продуктов до нажатия на кнопку Показать еще

//     // renderProductCards(products, productContainer);
//     // paginate(products);
//     // openCart();
//     // closeCart();
//     // cartData();
//     // renderInitialProducts(products, productContainer, firstProductIndex, lastProductIndex);
//     // showMoreProducts(products, productContainer, firstProductIndex, lastProductIndex);
//     // filter(products, productContainer);
// });


import products from './products.js';
import render from './modules/productCards.js';
import pagination from './modules/paginations.js';

import {closeCard, openCard} from './modules/cardPopup.js';
import { cardData } from './modules/cardData.js';
import { filter } from './modules/filter.js';
window.addEventListener('DOMContentLoaded', function(){
    const productsContainer = document.querySelector('.js-products-list');
    render.renderProductCards(products, productsContainer);

    //Pagination
    pagination.pagination(products);
    cardData();
    closeCard();
    openCard();
    filter(products, productsContainer);
})

