//  ANIMATION ================================================
const animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
    function animOnScroll(params) {
        window.addEventListener('scroll', animOnScroll); //  Событие
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('anim-active');
            }
            else {
                if (!animItem.classList.contains('anim-no-hide')) { // Если есть клас anim-no-hide - повторной анимации не будет
                    animItem.classList.remove('anim-active'); // Повторная аанимация обьекта
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(function () {
        animOnScroll();
    }, 300);

}
