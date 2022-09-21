
let menuToggle = document.getElementById('menu__toggle');
let menu = document.getElementById('menu');

const changeMenuState = () => {
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
};

menuToggle.addEventListener('click', event => {
    event.preventDefault();
    changeMenuState();
});

let scrollToTopBtn = document.getElementById('to__top');

scrollToTopBtn.addEventListener('click', event => {
    scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.isIntersecting ? scrollToTopBtn.classList.remove('show') : scrollToTopBtn.classList.add('show');
        });
    } , {
        threshold: 0.5,
    }
);

let observed = document.getElementById('about');

observer.observe(observed);

let links = document.getElementsByTagName('a');

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