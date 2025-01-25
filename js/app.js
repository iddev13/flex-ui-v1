// IFRAME =====================================================

const time = 1;
const counter = document.querySelector('#counter');
const counterNumItems = counter.querySelectorAll('.counter__num');
const contactBlock = document.querySelector('.contact');
const contactOffsetTop = contactBlock.offsetTop;
const mapBlock = document.querySelector('.map');
const mapOffsetTop = mapBlock.offsetTop;
let isCounterScrolled = false;
let isMapScrolled = false;

const counterFunc = () => {
	counterNumItems.forEach((elem) => {
		let i = 1;
		const num = elem.getAttribute('data-num');
		const step = (1000 * time) / num;
		let int = setInterval(() => {
			if (i <= num) {
				elem.querySelector('.counter__num-value').innerText = i;
			} else {
				clearInterval(int);
			}
			i++;
		}, step);
	});
};

function isElementInView(el) {
	const rect = el.getBoundingClientRect();
	return rect.top >= 0 && rect.bottom <= window.innerHeight - 10;
}

const insertIframes = () => {
	mapBlock.innerHTML = `<iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d539.2229870277196!2d36.231597488970905!3d49.992773485942514!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a0f07183da57%3A0xcda1d17154a2b99f!2z0JjRgdGC0L7RgNC40YfQtdGB0LrQuNC5INCc0YPQt9C10Lk!5e0!3m2!1sru!2sua!4v1597329829618!5m2!1sru!2sua"
        width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false"
        tabindex="0"></iframe>`;
};

window.addEventListener('scroll', () => {
	if (isElementInView(counter) && !isCounterScrolled) {
		counterFunc();
		insertIframes();
		isCounterScrolled = true;
	}
	if (contactOffsetTop <= window.pageYOffset && !isMapScrolled) {
		console.dir(window.pageYOffset);
		insertIframes();
		isMapScrolled = true;
	}
});

window.addEventListener('load', () => {
	if (mapOffsetTop <= window.pageYOffset) {
		insertIframes();
		isMapScrolled = true;
	}
});
