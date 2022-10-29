/*  Déclaration des variables nécessaires
    au menu de navigation
*/
const body = document.body;
const menuToggle = document.getElementById('menu__toggle');
const menu = document.getElementById('menu');

// Fonction de changement d'état du menu (Ouvert / Fermé)
const changeMenuState = () => {
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('no-scroll')
};

// Ajoute un évènement 'click' sur le bouton du menu
menuToggle.addEventListener('click', event => {
    event.preventDefault();
    changeMenuState();
});


/*  Déclaration des variables nécessaires
    pour le bouton 'Vers le haut de page'
*/
const scrollToTopBtn = document.getElementById('to__top');
const observed = document.getElementById('about');

// Ajoute un évènement 'click' sur le bouton 'Vers le haut de page'
scrollToTopBtn.addEventListener('click', event => {
    event.preventDefault();
    scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});

/*  Créer un point d'observation sur la page pour savoir si
    le bouton 'Vers le haut de page' doit s'afficher ou non
*/
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.isIntersecting ? scrollToTopBtn.classList.remove('show') : scrollToTopBtn.classList.add('show');
        });
    }, {
    threshold: 0.5,
}
);

// Lance l'observation de la page
observer.observe(observed);


/*  Déclaration des variables nécessaires
    pour les liens du menu de navigation
*/
const links = document.getElementsByTagName('a');

/*  Ajoute un évènement 'click' à tous les liens présent
    dans le menu de navigation ET qui mènent à des ancres
    sur cette page
*/
Array.prototype.forEach.call(links, el => {
    let ref = el.getAttribute('href');
    if (ref && ref.includes('#')) {
        el.addEventListener('click', event => {
            event.preventDefault();
            scrollTo({
                left: 0,
                top: document.getElementById(ref.replace(/#/g, '')).getBoundingClientRect().top - (4 * 16) + window.scrollY,
                behavior: 'smooth'
            });
            changeMenuState();
        });
    }
});

const docProducts = document.getElementById('products');
async function getProducts() {
    const res = await fetch("./products_list.json");
    const obj = await res.json();
    let arr = [];
    for (let i in obj) {
        arr.push(obj[i]);
    }
    return arr;
}
const products = getProducts();

const sm = window.matchMedia('(min-width: 1px) and (max-width: 767px)');
const md = window.matchMedia('(min-width: 768px) and (max-width: 1279px)');
const xl = window.matchMedia('(min-width: 1280px)');

function changeProductsToSM() {
    products.then(data => {
        docProducts.lastElementChild.outerHTML =
            `<div id="product__carousel" class="carousel slide" data-bs-ride="carousel">
                <ul>
                ${data.reduce((u, l) => u.concat(
                `<li class="carousel-item ${data[0] === l ? 'active' : null}">
                        <div class="card">
                            <div class="card__top">
                                <h3>${l.name}</h3>
                            </div>
                            <div class="card__mid">
                                <img src="./assets/img/products/${l.image}" alt="${l.alt}">
                            </div>
                            <div class="card__bot">
                                <p>${l.size}</p>
                            </div>
                        </div>
                    </li>`), '')}
                </ul>
                <button
                    class="carousel-control-prev"
                    type="button" data-bs-target="#product__carousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button
                    class="carousel-control-next"
                    type="button" data-bs-target="#product__carousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon"
                        aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>`;
    });
}

function changeProductsToMD() {
    products.then(data => {
        docProducts.lastElementChild.outerHTML =
            `<div id="product__carousel" class="carousel slide" data-bs-ride="carousel">
                    <ul>
                    ${data.reduce((u, l, i) => u.concat(
                `${i % 3 == 0 && i != 0 ? `</div></li>` : ''}${i % 3 == 0 || i == 0 ? `<li class="carousel-item ${data[0] === l ? 'active ' : ''}"><div>` : ''}
                            <div class="card">
                                <div class="card__top">
                                    <h3>${l.name}</h3>
                                </div>
                                <div class="card__mid">
                                    <img src="./assets/img/products/${l.image}" alt="${l.alt}">
                                </div>
                                <div class="card__bot">
                                    <p>${l.size}</p>
                                </div>
                            </div>
                        `), '')}
                    </ul>
                    <button
                        class="carousel-control-prev"
                        type="button" data-bs-target="#product__carousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                        class="carousel-control-next"
                        type="button" data-bs-target="#product__carousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon"
                            aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>`;
    });
}

function changeProductsToXL() {
    products.then(data => {
        docProducts.lastElementChild.outerHTML =
            `<div id="product__carousel" class="carousel slide" data-bs-ride="carousel">
                    <ul>
                    ${data.reduce((u, l, i) => u.concat(
                `${i % 6 == 0 && i != 0 ? `</div></li>` : ''}${i % 6 == 0 || i == 0 ? `<li class="carousel-item ${data[0] === l ? 'active ' : ''}"><div>` : ''}
                            <div class="card">
                                <div class="card__top">
                                    <h3>${l.name}</h3>
                                </div>
                                <div class="card__mid">
                                    <img src="./assets/img/products/${l.image}" alt="${l.alt}">
                                </div>
                                <div class="card__bot">
                                    <p>${l.size}</p>
                                </div>
                            </div>
                        `), '')}
                    </ul>
                    <button
                        class="carousel-control-prev"
                        type="button" data-bs-target="#product__carousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                        class="carousel-control-next"
                        type="button" data-bs-target="#product__carousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon"
                            aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>`;
    });
}

if (sm.matches) changeProductsToSM();
if (md.matches) changeProductsToMD();
if (xl.matches) changeProductsToXL();

sm.addEventListener('change', e => {
    if (e.matches) changeProductsToSM();
});
md.addEventListener('change', e => {
    if (e.matches) changeProductsToMD();
});
xl.addEventListener('change', e => {
    if (e.matches) changeProductsToXL();
});