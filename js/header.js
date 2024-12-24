// HEADER ANIMATION  START ================================
function fixedMenu() {
	let header = document.querySelector('.header');

	if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
		header.classList.add('header__fixed');
		window.onscroll = function showHeader() {
			if (window.pageYOffset > 50) {
				header.classList.add('scrolled-page');
			} else {
				header.classList.remove('scrolled-page');
			}
		};
	} else {
		window.onscroll = function showHeader() {
			if (window.pageYOffset > 50) {
				header.classList.add('header__fixed');
				header.classList.add('scrolled-page');
			} else {
				header.classList.remove('header__fixed');
				header.classList.remove('scrolled-page');
			}
		};
	}
}

fixedMenu();
// HEADER ANIMATION  END ================================

// MENU  START ================================
let isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPdo/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		);
	},
};

const touchToggle = (arrow) => {
	if (arrow.length > 0) {
		for (let i = 0; i < arrow.length; i++) {
			let thisLink = arrow[i].previousElementSibling;
			let subMenu = arrow[i].parentElement.nextElementSibling;
			let thisArrow = arrow[i];
			thisLink.classList.add('parent');

			thisArrow.addEventListener('click', () => {
				subMenu.classList.toggle('open');
				thisArrow.classList.toggle('active');

				if (subMenu.classList.contains('menu-active')) {
					subMenu.setAttribute('aria-expanded', false);
					subMenu.setAttribute('aria-hidden', true);
					subMenu.classList.remove('menu-active');
					subMenu.style.transition =
						'opacity 0.3s ease-out, max-height 0.3s ease-out, padding 0.4s ease-out';
					subMenu.style.maxHeight = null;
				} else {
					let subSubMenuParent = subMenu.closest('ul .sub-menu');
					let subSubSubMenuParent = subMenu.closest('ul .sub-sub-menu');
					let actualHeight = subMenu.scrollHeight;

					function setHeight(actualHeight) {
						subMenu.classList.add('menu-active');
						subMenu.style.maxHeight = actualHeight + 'px';
						subMenu.style.transition =
							'opacity 0.5s ease-out, max-height 0.6s ease-out, padding 0.3s ease-out';
						subMenu.setAttribute('aria-expanded', true);
						subMenu.setAttribute('aria-hidden', false);

						if (subSubMenuParent) {
							subSubMenuParent.style.maxHeight =
								subSubMenuParent.scrollHeight + subMenu.scrollHeight + 'px';
						}
						if (subSubSubMenuParent) {
							subSubSubMenuParent.style.maxHeight =
								subSubSubMenuParent.scrollHeight + subMenu.scrollHeight + 'px';
						}
					}

					setHeight(actualHeight);

					window.addEventListener('resize', () => {
						actualHeight = subMenu.scrollHeight;
						if (thisArrow.classList.contains('active')) setHeight(actualHeight);
					});
				}
			});
		}
	}
};

const mouseEnter = (headerItem, headerItemMenu) => {
	const headerLink = headerItem.querySelector('.btn');
	if (headerLink) headerLink.classList.add('active');

	const subSubMenu = headerItem.querySelector('.sub-sub-menu');
	const arrow = headerItem.querySelector('.arrow');

	headerItemMenu.classList.add('menu-active');
	if (subSubMenu && subSubMenu.classList.contains('sub-sub-menu')) {
		arrow.classList.add('active');
	}

	if (headerItemMenu.classList.contains('menu-active')) {
		headerItemMenu.setAttribute('aria-expanded', true);
		headerItemMenu.setAttribute('aria-hidden', false);
		headerItemMenu.style.transition =
			'opacity 0.4s ease-out, max-height 0.3s ease-in-out';
		headerItemMenu.style.maxHeight = headerItemMenu.scrollHeight + 'px';
	}
};

const mouseLeave = (headerItem, headerItemMenu) => {
	const headerLink = headerItem.querySelector('.btn');
	if (headerLink) headerLink.classList.remove('active');

	const subSubMenu = headerItem.querySelector('.sub-sub-menu');
	const arrow = headerItem.querySelector('.arrow');

	if (subSubMenu && subSubMenu.classList.contains('sub-sub-menu')) {
		arrow.classList.remove('active');
	}

	headerItemMenu.setAttribute('aria-expanded', false);
	headerItemMenu.setAttribute('aria-hidden', true);
	headerItemMenu.style.maxHeight = null;
	headerItemMenu.classList.remove('menu-active');
};

const mouseToggle = (headerItems) => {
	if (headerItems.length > 0) {
		for (let i = 0; i < headerItems.length; i++) {
			const headerItem = headerItems[i];
			const headerItemMenu = headerItem.lastElementChild;

			if (window.innerWidth > 950 && !isMobile.any()) {
				headerItem.addEventListener('mouseenter', () =>
					mouseEnter(headerItem, headerItemMenu)
				);
				headerItem.addEventListener('mouseleave', () =>
					mouseLeave(headerItem, headerItemMenu)
				);
			}
		}
	}
};

let initialWindowWidth = window.innerWidth;
function menuFunction() {
	const body = document.querySelector('body');
	if (window.innerWidth <= 950 && body.classList.contains('mouse')) {
		window.location.reload();
	}
	if (isMobile.any() && body.classList.contains('mouse')) {
		window.location.reload();
	}
	if (window.innerWidth <= 950 && !isMobile.any()) {
		body.classList.add('touch');
		let arrow = document.querySelectorAll('.arrow');
		touchToggle(arrow);
	}
	if (
		window.innerWidth > 950 &&
		body.classList.contains('touch') &&
		!isMobile.any()
	) {
		body.classList.remove('touch');
	}
	if (isMobile.any() && !body.classList.contains('touch')) {
		body.classList.add('touch');
		let arrow = document.querySelectorAll('.arrow');
		touchToggle(arrow);
	}
	if (window.innerWidth > 950 && !isMobile.any()) {
		body.classList.add('mouse');
		const headerItems = document.querySelectorAll('.block-menu');
		mouseToggle(headerItems);
	}
}

document.addEventListener('DOMContentLoaded', menuFunction);
window.addEventListener('resize', () => {
	if (initialWindowWidth > 950) {
		menuFunction();
		initialWindowWidth = window.innerWidth;
	}
	if (initialWindowWidth <= 950 && window.innerWidth > 950) {
		menuFunction();
		initialWindowWidth = window.innerWidth;
	}
});
// MENU  END ================================

// BURGER MENU JS  START ===============================
function burgerFunction() {
	const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	const body = document.querySelector('body');
	const burger = document.querySelector('.header__burger');
	const burgerList = document.querySelector('.header__list');

	let arrow = document.querySelectorAll('.arrow');

	burger.addEventListener('click', function () {
		let scrollPosition = window.scrollY;
		console.log('BURGER');

		if (!burger.classList.contains('active')) {
			if (isSafari) {
				body.style.position = 'fixed';
				body.style.top = '-' + scrollPosition + 'px';
			}
		} else {
			if (isSafari) {
				body.style.position = 'static';
				let offsetTopValue = +body
					.getAttribute('style')
					.split(';')[1]
					.replace(/[^\d]/g, '');
				body.style.top = '';
				window.scrollTo(0, offsetTopValue);
			}
		}

		for (let i = 0; i < arrow.length; i++) {
			let subMenu = arrow[i].parentElement.nextElementSibling;
			let thisArrow = arrow[i];
			if (subMenu) {
				subMenu.classList.remove('open');
				thisArrow.classList.remove('active');
				subMenu.setAttribute('aria-expanded', false);
				subMenu.setAttribute('aria-hidden', true);
				subMenu.classList.remove('menu-active');
				subMenu.style.transition =
					'opacity 0.3s ease-out, max-height 0.3s ease-out, padding 0.4s ease-out';
				subMenu.style.maxHeight = null;
			}
		}

		burger.classList.toggle('active');
		burgerList.classList.toggle('active');
		body.classList.toggle('lock');
	});

	body.addEventListener('click', function (event) {
		if (
			!event.target.closest('header') &&
			burger.classList.contains('active')
		) {
			burger.classList.toggle('active');
			burgerList.classList.toggle('active');
			body.classList.toggle('lock');

			if (isSafari) {
				let offsetTopValue = +body
					.getAttribute('style')
					.split(';')[1]
					.replace(/[^\d]/g, '');
				body.style.position = 'static';
				body.style.top = '';
				window.scrollTo(0, offsetTopValue);
			}
		}
	});
}

burgerFunction();
// BURGER MENU JS  END ===============================
