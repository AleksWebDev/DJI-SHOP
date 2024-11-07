import render from './productCards.js';

const filter = (products, productsContainr) => {
    const seriesFilterEl = document.querySelector('.js-filter-series');
    const seriesFilterItemsEl = document.querySelectorAll('.js-series-item');
    const showMore = document.querySelector('.btn-show-more');
    const pagination = document.querySelector('.pagination')
    const priceFilterSelect = document.querySelector('.js-filter-price-select');
    const priceInputs = document.querySelectorAll('.js-filter-price-input');

    const inputSearch = document.querySelector('.js-input-search');

    let currentSeriesFilter = null;
    let currentPriceFilterSelect = 'default';
    let currentPriceFilterInputs = {min: 0, max: Infinity};

    const filterProducts = (filter, filterInputSearch, priceRange) => {
        let filteredProducts = products.filter((product) => {
            if(filter && product.series !== filter){
                return false;
            }

            if(filterInputSearch && !product.model.toLowerCase().includes(filterInputSearch.toLowerCase())){
                return false;
            }

            const price = parseInt(product.prices[0].replace(/\s/g, ''), 10);
            if(price < priceRange.min || price > priceRange.max){
                return false;
            }
            return true;
        })

        if(currentPriceFilterSelect === 'asc'){
            filteredProducts.sort((a,b) => {
                const priceA = parseInt(a.prices[0].replace(/\s/g, ''), 10)
                const priceB = parseInt(b.prices[0].replace(/\s/g, ''), 10)
                return priceA - priceB;
            });
        }else if(currentPriceFilterSelect === 'desc'){
            filteredProducts.sort((a,b) => {
                const priceA = parseInt(a.prices[0].replace(/\s/g, ''), 10)
                const priceB = parseInt(b.prices[0].replace(/\s/g, ''), 10)
                return priceB - priceA;
            });
        }

        return filteredProducts;
    }

    const applyFilters = () => {
        const filteredProducts = filterProducts(currentSeriesFilter, inputSearch.value, currentPriceFilterInputs);
        render.renderProductCards(filteredProducts, productsContainr);
        pagination.classList.add('hidden');
    }

    const handleSeriesFilterClick = () => {
        seriesFilterEl.addEventListener('click', (e) => {

            if(!e.target.matches('.js-series-item')){
                return;
            }

            seriesFilterItemsEl.forEach((item) => {
                item.classList.remove('active');
            })
            e.target.classList.add('active');

            if(e.target.dataset.value !== 'all'){
                currentSeriesFilter = e.target.dataset.value;
            }else{
                currentSeriesFilter = null;
            }

            applyFilters();

        })
    };

    const handlePriceFilterClick = () => {
        priceFilterSelect.addEventListener('change', () => {
            currentPriceFilterSelect = priceFilterSelect.value;
            applyFilters();
        })
    }

    const handleSearchInput = () =>{
        inputSearch.addEventListener('input', () => {
            applyFilters();
        })
    }

    const handlePriceInputChange = () => {
        const minPrice = parseInt(priceInputs[0].value, 10) || 0;
        const maxPrice = parseInt(priceInputs[1].value, 10) || Infinity;

        currentPriceFilterInputs = {min: minPrice, max: maxPrice};

        applyFilters();
    }

    priceInputs.forEach((input) => {
        input.addEventListener('input', () => {
            handlePriceInputChange();
        })
    })

    handleSeriesFilterClick();
    handlePriceFilterClick();
    handleSearchInput();
}

export {
    filter,
}