const swiper = new Swiper('.swiper', {
	// Optional parameters
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	slideToClickedSlide: false,

	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},
	slidesPerView: 5,
	initialSlide: 0,
	effect: 'slide',
	autoplay: {
		delay: 2000,
		stopOnLastSlide: true,
		disableOnInteraction: false,
	},
	speed: 1500,
	observer: true,
	observeSlideChildren: true,
	observeParents: true,
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		480: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 5,
		},
	},
});
