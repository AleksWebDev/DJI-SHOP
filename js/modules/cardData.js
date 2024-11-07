const cardData = () => {

    const cart = document.querySelector('.js-cart');
    const productList = document.querySelector('.js-products-list');
    const cardList = document.querySelector('.js-cart-list');
    const cartEmpty = document.querySelector('.js-cart-empty-container');
    const cartOrder = document.querySelector('.js-cart-order-container');


    const updateCartItemCount = () =>{
        cart.addEventListener('click', function(e){

            let currentItems, minusBtn;

            if(e.target.matches('js-minus') || e.target.matches('.js-plus')){
                const counter = e.target.closest('.js-counter');
                currentItems = counter.querySelector('.js-current-items');

                minusBtn = counter.querySelector('.js-minus');
            }

            if(e.target.matches('.js-plus')){
                currentItems.textContent = ++currentItems.textContent;
                console.log(currentItems);
                minusBtn.removeAttribute('disabled');
                calculateTotalCartValue();
            }

            if(e.target.matches('.js-minus')){
                if(parseInt(e.target.nextElementSibling.textContent) > 2){
                    e.target.nextElementSibling.textContent = --e.target.nextElementSibling.textContent;
                }else if(parseInt(e.target.nextElementSibling.textContent) === 2){
                    e.target.nextElementSibling.textContent = --e.target.nextElementSibling.textContent;
                    minusBtn.setAttribute('disabled', true);
                }
                calculateTotalCartValue();
            }
        })
    };
    updateCartItemCount();

    const addProductToCart = () => {
        productList.addEventListener('click', (e) => {
            if(e.target.classList.contains('js-buy-button')){
                const product = e.target.closest('.js-product');

                const imageCard = product.querySelector('.js-image-card');
                const modelCard = product.querySelector('.js-title-card');
                const priceCard = product.querySelector('.js-price-card');
                const linkCard = product.querySelector('.js-link-card');

                const productInfo = {};
                productInfo.id = linkCard.getAttribute('id');
                productInfo.model = modelCard.textContent;
                productInfo.price = priceCard.textContent;
                productInfo.photo = imageCard.src;

                const productInCart = cardList.querySelector(`#${productInfo.id}`);

                if(productInCart){
                    const currentItemProduct = productInCart.querySelector('.js-current-items');
                    currentItemProduct.textContent = parseInt(currentItemProduct.textContent) + 1;
                }else{
                    renderProductCards(productInfo);
                }

                toggleCartStatus();
                calculateTotalCartValue();
            }
        })
    }

    addProductToCart();

    const removeProductFromCart = () => {
        cardList.addEventListener('click', function(e){
            if(e.target.classList.contains('close')){
                const cartItem = e.target.closest('.js-cart-item');
                cartItem.remove();
                toggleCartStatus();
                calculateTotalCartValue();
            }
        })
    }
    removeProductFromCart();

    const renderProductCards = ({id, model, price, photo}) => {
        const li = document.createElement('li');
        li.classList.add('cart-item', 'column', 'js-cart-item');
        li.innerHTML = `
            <span class="close"></span>
                                <div class="cartline row jcfs aic" id="${id}">
                                    <div class="cart-image-container">
                                        <img src="${photo}" alt="" class="cart-img">
                                    </div>
                                    <div class="column">
                                        <div class="cart-model row jcfs aic">
                                            ${model}
                                        </div>
                                        <div class="row jcsb aic">
                                            <div class="counter row jcc aic js-counter">
                                                <button type="button" class="minus control row jcc aic js-minus disabled" >-</button>
                                                <div class="current-items row jcc aic js-current-items">1</div>
                                                <button type="button" class="plus control row jcc aic js-plus">+</button>
                                            </div>
                                            <div class="row jcc aic">
                                                <span class="cart-price  row jcfe" data-price="${price}">${price}</span>
                                                <span class="rouble">₽</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        `

        cardList.append(li);
    }

    const toggleCartStatus = () => {
        console.log(cart);
        if(cart.querySelector('.js-cart-item')){
            cartOrder.classList.remove('hidden');
            cartEmpty.classList.add('hidden');
        }else{
            cartOrder.classList.add('hidden');
            cartEmpty.classList.remove('hidden');
        }
    }

    toggleCartStatus();

    const calculateTotalCartValue = () => {
        const cartItems = document.querySelectorAll('.js-cart-item');
        const cartTotalPrice = document.querySelector('.js-cart-total-price');

        let totalCartValue = 0;

        cartItems.forEach((item) => {
            const itemCount = item.querySelector('.js-current-items');
            const itemPrice = item.querySelector('.cart-price');
            const itemTotalPrice = parseInt(itemCount.textContent) * parseInt(itemPrice.textContent.split(' ').join(''));

            totalCartValue += itemTotalPrice;
        });

        cartTotalPrice.textContent = totalCartValue;
    };

    calculateTotalCartValue();

};

export {
    cardData,
};