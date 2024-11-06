const cart = document.querySelector('.js-cart');
const overlay = document.querySelector('.js-overlay');
const openCartBtn = document.querySelector('.js-cart-btn');
const closeCartElements = document.querySelectorAll('.js-close-cart');


const openCard = () => {
    openCartBtn.addEventListener('click', function(e){
        document.body.style.overflow = 'hidden';
        cart.classList.add('active');
        overlay.classList.add('active');
    })
};

const closeCard = () => {
    closeCartElements.forEach((item) => {
        item.addEventListener('click', function(){
            document.body.style.overflow = '';
            cart.classList.remove('active');
            overlay.classList.remove('active');
        })
    })
};

export {
    openCard,
    closeCard
}