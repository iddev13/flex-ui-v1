// IFRAME =====================================================

const time = 1;
const counter = document.querySelector('#counter');
const counterNumItems = counter.querySelectorAll('.counter__num');
let isScrolled = false;

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

window.addEventListener('scroll', () => {
	if (isElementInView(counter) && !isScrolled) {
		counterFunc();
		insertIframes();
		isScrolled = true;
	}
});

// const insertIframes = () => {
// 	const videoBlock = document.querySelector('.hiw-video');
// 	const mapBlock = document.querySelector('.map');
// 	videoBlock.innerHTML = `<iframe class="iframe" src="https://www.youtube.com/embed/zKNoU2P0dQc" frameborder="0"
//       allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//       allowfullscreen></iframe>`;
// };
