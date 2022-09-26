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
    } , {
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
                top: document.getElementById(ref.replace(/#/g, '')).getBoundingClientRect().top - (4*16) + window.scrollY,
                behavior: 'smooth'
            });
            changeMenuState();
        });
    }
});