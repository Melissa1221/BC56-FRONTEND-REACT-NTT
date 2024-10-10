const url: string = 'https://dummyjson.com/products';
let products: Product[] = [];
let filteredProducts: Product[] = [];
let categories: Category[] = [];
const categoriesSelect = document.querySelector('select') as HTMLSelectElement | null;
let cartCount: number = 0;
let totalCartValue: number = 0;
let favoritesCount: number = 0;
import {Product, Category} from './interfaces'

async function getAllProducts(): Promise<void> {
    try {
        const response = await fetch(`${url}`);
        const data = await response.json();
        products = data.products as Product[];
        filteredProducts = products; 
        renderProducts(filteredProducts); 
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

async function loadCategories(): Promise<void> {
    try {
        const response = await fetch(`${url}/categories`);
        const data = await response.json();
        categories = data as Category[];
        renderCategories(categories);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
    }
}

if (categoriesSelect) {
    categoriesSelect.addEventListener('change', async (event: Event) => {
        const target = event.target as HTMLSelectElement;
        const selectedCategory = target.value;
        
        try {
            const response = await fetch(`${url}/category/${selectedCategory}`);
            const data = await response.json();
            renderProducts(data.products as Product[]);
        } catch (error) {
            console.error('Error al obtener los productos por categoría:', error);
        }
    });
}

function renderCategories(categories: Category[]): void {
    if (!categoriesSelect) return;

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

function clearProductsContainer(container: HTMLElement): void {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function renderProducts(products: Product[]): void {
    const productsContainer = document.getElementById('products-container') as HTMLElement | null;
    if (!productsContainer) return;
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

        addToCartBtn.addEventListener('click', () => {
            updateCartCounter(product.price);
        });

        const addToWishlistBtn = document.createElement('button');
        addToWishlistBtn.classList.add('action-btn');
        addToWishlistBtn.setAttribute('aria-label', 'añadir a la lista de deseos');
        const wishlistIcon = document.createElement('ion-icon');
        wishlistIcon.setAttribute('name', 'star-outline');
        addToWishlistBtn.appendChild(wishlistIcon);
        addToWishlistBtn.addEventListener('click', () => {
            updateFavoritesCounter();
        });

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

function updateFavoritesCounter(): void {
    favoritesCount += 1;
    const favoritesBadge = document.querySelector('.btn-badge-star') as HTMLElement | null;
    if (favoritesBadge) favoritesBadge.textContent = favoritesCount.toString();
}

function updateCartCounter(productPrice: number): void {
    cartCount += 1;
    totalCartValue += productPrice;

    const cartBadge = document.querySelector('.btn-badge-cart') as HTMLElement | null;
    const cartTotal = document.querySelector('.btn-text') as HTMLElement | null;

    if (cartBadge) cartBadge.textContent = cartCount.toString();
    if (cartTotal) cartTotal.textContent = `s/.${totalCartValue.toFixed(2)}`;
}

function getStars(rating: number): HTMLElement[] {
    const maxStars = 5;
    const stars: HTMLElement[] = [];

    for (let i = 1; i <= maxStars; i++) {
        const starIcon = document.createElement('ion-icon');
        starIcon.setAttribute('name', i <= rating ? 'star' : 'star-outline');
        stars.push(starIcon);
    }

    return stars;
}

function filterProducts(searchTerm: string): void {
    const lowerCaseTerm = searchTerm.toLowerCase();
    filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(lowerCaseTerm) ||
               product.description.toLowerCase().includes(lowerCaseTerm) ||
               product.tags.some(tag => tag.toLowerCase().includes(lowerCaseTerm));
    });
    renderProducts(filteredProducts);
}

const searchField = document.querySelector('.search-field') as HTMLInputElement | null;
if (searchField) {
    searchField.addEventListener('input', (e: Event) => {
        const searchTerm = (e.target as HTMLInputElement).value;
        filterProducts(searchTerm);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getAllProducts();
    loadCategories();
});
