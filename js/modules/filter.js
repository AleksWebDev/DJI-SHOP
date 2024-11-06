import render from './productCards.js';

const filter = (products, productsContainr) => {
    const seriesFilterEl = document.querySelector('.js-filter-series');
    const seriesFilterItemsEl = document.querySelectorAll('.js-series-item');
    
    let currentSeriesFilter = null;

    const filterProducts = (filterSeries) => {
        let filteredProducts = products.filter((product) => {
            if(filterSeries && product.series !== filterSeries){
                return false;
            }
            return true;
        })
        return filteredProducts;
    }

    const handleSeriesFilterClick = () =>{
        seriesFilterEl.addEventListener('click', (e) => {
            if(!e.target.matches('.js-series-item')){
                return;
            }

            seriesFilterItemsEl.forEach((item) => {
                item.classList.remove('active');
            });
            e.target.classList.add('active');

            if(e.target.dataset.value !== 'all'){
                currentSeriesFilter = e.target.dataset.value;
            }else{
                currentSeriesFilter = null;
            }

            const filteredProducts = filterProducts(currentSeriesFilter);
            render.renderProductCards(filteredProducts, productsContainr);
        })
    };

    handleSeriesFilterClick();
}

export {
    filter
}