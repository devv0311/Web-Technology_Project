const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

window.addEventListener('resize', () => {
    scroll.update();
});

function scrollToCharacters() {
    scroll.scrollTo(document.querySelector('#character-section'));
}

function scrollToArc() {
    scroll.scrollTo(document.querySelector('#section1'));
}

function profile() {
    window.location.href = "profile.html";
}

const characterCards = document.querySelectorAll('.character-card');

const observerOptions = {
    root: null,
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

characterCards.forEach(card => {
    observer.observe(card);
});