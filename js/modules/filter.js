import render from './productCards.js';

const filter = (products, productsContainr) => {
    const seriesFilterEl = document.querySelector('.js-filter-series');
    const seriesFilterItemsEl = document.querySelectorAll('.js-series-item');
    const showMore = document.querySelector('.btn-show-more');
    const pagination = document.querySelector('.pagination')
    const priceFilterSelect = document.querySelector('.js-filter-price-select');

    const inputSearch = document.querySelector('.js-input-search');

    let currentSeriesFilter = null;
    let currentPriceFilterSelect = 'default';

    const filterProducts = (filter, filterInputSearch) => {
        let filteredProducts = products.filter((product) => {
            if(filter && product.series !== filter){
                return false;
            }

            if(filterInputSearch && !product.model.toLowerCase().includes(filterInputSearch.toLowerCase())){
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
        const filteredProducts = filterProducts(currentSeriesFilter, inputSearch.value);
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

    handleSeriesFilterClick();
    handlePriceFilterClick();
    handleSearchInput();
}

export {
    filter,
}