const pagination = (products) => {

    console.log('product', products);

    let  productCount = 7;
    let currentPage = 1;

    const productContainer = document.querySelector('.js-products-list');
    const pagination = document.querySelector('.js-pagination');
    const btnPrevPagination = document.querySelector('js-pagination-btn-prev');
    const btnNextPagination = document.querySelector('.js-pagination-btn-next');

    const renderProducts = (products, container, numberOfProducts, page) => {

        productContainer.innerHTML = '';

        const firstProductIndex = numberOfProducts * page - numberOfProducts;

        const lastProductIndex = firstProductIndex + numberOfProducts;

        const productsOnPage = products.slice(firstProductIndex, lastProductIndex);


    };

    renderProducts(products, productContainer, productCount, currentPage);

};

export default {
    pagination,

}