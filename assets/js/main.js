const PRODUCTS = [
    {
        name: '365 Signature Hoodie',
        thumbnail: 'green-sweatshirt',
        price: 33.95,
        colors: ['aqua', 'red', 'purple', 'green']
    },
    {
        name: 'Organic Skinny High Waist Jeans',
        thumbnail: 'yellow-tracksuit',
        price: 310.95,
        colors: ['aqua', 'red', 'purple', 'green']
    },
    {
        name: 'Organic Skinny High Waist Raw Hem Jeans',
        thumbnail: 'blue-sweatshirt',
        price: 32,
        colors: ['aqua', 'green']
    }
]


const getAvailableWidth = (swiperParent) => {

    const cs = getComputedStyle(swiperParent);

    return swiperParent.getBoundingClientRect().width -
        (parseFloat(cs.getPropertyValue('padding-left')) +
            parseFloat(cs.getPropertyValue('padding-right')))
}

function setUpSwiperWidth() {
    const allSwipers = document.querySelectorAll('.swiper')
    allSwipers.forEach(swiper => {
        const width = getAvailableWidth(swiper.parentElement)
        swiper.setAttribute('style', `width:${width}px;opacity:1`)
    })
}

function formatCurrency(currency) {
    const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'EUR',
    });

    return formatter.format(currency)
}

function getProducts() {

    const productTemplate = document.getElementById('product-template')
    const productWrapper = document.querySelector('.page--app-main>.page--app-section .page--app-products .page--app-products-wrapper')
    productWrapper.innerHTML = "";
    PRODUCTS.forEach((product, i) => {
        const clone = productTemplate.content.cloneNode(true);
        const name = clone.querySelector('.product-name')
        const price = clone.querySelector('.product-price')
        const thumbnail = clone.querySelector('.product-thumbnail')
        const colors = clone.querySelector('.product-colors')
        colors.innerHTML = "";

        product.colors.forEach((color, i) => {
            const span = document.createElement('span')
            span.classList = `product-color color-${color} ${i === 0 ? 'active' : ''}`
            colors.appendChild(span)
        })

        name.textContent = product.name
        price.textContent = formatCurrency(product.price)
        thumbnail.src = thumbnail.src.replace('THUMBNAILMOCK', product.thumbnail)
        productWrapper.appendChild(clone)
    })
    setUpSwiperWidth()
}


getProducts()

const productColors = document.querySelectorAll('.page--app-main>.page--app-section .page--app-products .page--app-products-item .product-price-colors .product-colors .product-color')
productColors.forEach(color => color.addEventListener('click', handleColorChanged))

function handleColorChanged(e) {
    const parent = this.parentElement
    const prevActiveColor = parent.querySelector('span.active')
    prevActiveColor.classList.remove('active')
    this.classList.add('active')
}


const swiper = new Swiper('.page--app-products-items', {
    slidesPerView: "auto",
    spaceBetween: 32,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: {
            spaceBetween: 12,
        },
        1024: {
            spaceBetween: 32,
        }
    }
});

window.addEventListener('resize', function () {
    setUpSwiperWidth()
})