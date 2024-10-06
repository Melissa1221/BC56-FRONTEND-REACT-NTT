const url = 'https://dummyjson.com/products';
let products = [];
let filteredProducts = [];
let categories = [];
const categoriesSelect = document.querySelector('select');
let cartCount = 0;
let totalCartValue = 0;
let favoritesCount = 0;
async function getAllProducts() {
    try {
        const response = await fetch(`${url}`);
        const data = await response.json();
        products = data.products;
        filteredProducts = products; 
        renderProducts(filteredProducts); 
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

async function loadCategories() {
    try {
        const response = await fetch(`${url}/categories`); 
        const data = await response.json();
        categories = data;
        renderCategories(categories);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
    }
}

categoriesSelect.addEventListener('change', async (event) => {
    const selectedCategory = event.target.value;
    
    try {
        const response = await fetch(`${url}/category/${selectedCategory}`);
        const data = await response.json();
        renderProducts(data.products);
    } catch (error) {
        console.error('Error al obtener los productos por categoría:', error);
    }
});

function renderCategories(categories) {
    categoriesSelect.options.length = 0;

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione una categoría';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    categoriesSelect.appendChild(defaultOption);

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.slug;
        option.textContent = category.name;
        categoriesSelect.appendChild(option);
    });
}
function clearProductsContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}


function renderProducts(products) {
    const productsContainer = document.getElementById('products-container');
    clearProductsContainer(productsContainer);

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('shop-card');

        const cardBanner = document.createElement('div');
        cardBanner.classList.add('card-banner', 'img-holder');
        cardBanner.style.setProperty('--width', '540');
        cardBanner.style.setProperty('--height', '720');

        const img = document.createElement('img');
        img.src = product.thumbnail;
        img.alt = product.title;
        img.width = 540;
        img.height = 720;
        img.classList.add('img-cover');
        cardBanner.appendChild(img);

        const badge = document.createElement('span');
        badge.classList.add('badge');
        badge.setAttribute('aria-label', `${product.discountPercentage}% de descuento`);
        badge.textContent = `-${product.discountPercentage}%`;
        cardBanner.appendChild(badge);

        const cardActions = document.createElement('div');
        cardActions.classList.add('card-actions');

        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('action-btn');
        addToCartBtn.setAttribute('aria-label', 'añadir al carrito');
        const cartIcon = document.createElement('ion-icon');
        cartIcon.setAttribute('name', 'bag-handle-outline');
        addToCartBtn.appendChild(cartIcon);

        addToCartBtn.addEventListener('click', () =>{
            updateCartCounter(product.price);
        })

        const addToWishlistBtn = document.createElement('button');
        addToWishlistBtn.classList.add('action-btn');
        addToWishlistBtn.setAttribute('aria-label', 'añadir a la lista de deseos');
        const wishlistIcon = document.createElement('ion-icon');
        wishlistIcon.setAttribute('name', 'star-outline');
        addToWishlistBtn.appendChild(wishlistIcon);
        addToWishlistBtn.addEventListener('click', () => {
            updateFavoritesCounter();
        })

        cardActions.appendChild(addToCartBtn);
        cardActions.appendChild(addToWishlistBtn);
        cardBanner.appendChild(cardActions);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const priceDiv = document.createElement('div');
        priceDiv.classList.add('price');
        const oldPrice = document.createElement('del');
        oldPrice.classList.add('del');
        oldPrice.textContent = `s/.${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}`;
        const currentPrice = document.createElement('span');
        currentPrice.classList.add('span');
        currentPrice.textContent = `s/.${product.price.toFixed(2)}`;
        priceDiv.appendChild(oldPrice);
        priceDiv.appendChild(currentPrice);
        cardContent.appendChild(priceDiv);

        const title = document.createElement('h3');
        const titleLink = document.createElement('a');
        titleLink.classList.add('card-title');
        titleLink.href = '#';
        titleLink.textContent = product.title;
        title.appendChild(titleLink);
        cardContent.appendChild(title);

        const cardRating = document.createElement('div');
        cardRating.classList.add('card-rating');
        const ratingWrapper = document.createElement('div');
        ratingWrapper.classList.add('rating-wrapper');
        ratingWrapper.setAttribute('aria-label', `${product.rating} estrellas`);

        const stars = getStars(product.rating);
        stars.forEach(star => {
            ratingWrapper.appendChild(star);
        });
        
        cardRating.appendChild(ratingWrapper);

        const stockInfo = document.createElement('p');
        stockInfo.classList.add('rating-text');
        stockInfo.textContent = `${product.stock} disponibles`;
        cardRating.appendChild(stockInfo);

        cardContent.appendChild(cardRating);
        productCard.appendChild(cardBanner);
        productCard.appendChild(cardContent);
        productsContainer.appendChild(productCard);
    });
}

function updateFavoritesCounter() {
    favoritesCount += 1;
    const favoritesBadge = document.querySelector('.btn-badge-star');
    favoritesBadge.textContent = favoritesCount;
   
}
function updateCartCounter(productPrice){
    cartCount += 1;
    totalCartValue += productPrice;

    const cartBadge = document.querySelector('.btn-badge-cart');
    const cartTotal = document.querySelector('.btn-text');

    cartBadge.textContent = cartCount;
    cartTotal.textContent = `s/.${totalCartValue.toFixed(2)}`;

}

function getStars(rating) {
    const maxStars = 5;
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
        const starIcon = document.createElement('ion-icon');
        if (i <= rating) {
            starIcon.setAttribute('name', 'star');
        } else {
            starIcon.setAttribute('name', 'star-outline');
        }
        stars.push(starIcon);
    }

    return stars;  
}

function filterProducts(searchTerm) {
    const lowerCaseTerm = searchTerm.toLowerCase();
    filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(lowerCaseTerm) ||
               product.description.toLowerCase().includes(lowerCaseTerm) ||
               product.tags.some(tag => tag.toLowerCase().includes(lowerCaseTerm));
    });
    renderProducts(filteredProducts);
}

const searchField = document.querySelector('.search-field');
searchField.addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    filterProducts(searchTerm);
});

document.addEventListener('DOMContentLoaded', () => {
    getAllProducts();
    loadCategories();
});
