
let menuToggle = document.getElementById('menu__toggle');
let menu = document.getElementById('menu');

menuToggle.addEventListener('click', e => {
    e.preventDefault();
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
});

let scrollToTopBtn = document.getElementById('to__top');

scrollToTopBtn.addEventListener('click', e => {
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