function exploreNow() {
    alert("Explore button clicked!");
}

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

window.addEventListener('resize', () => {
    scroll.update();
});
