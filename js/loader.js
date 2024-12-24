// LOADER  START ================================
window.onload = function () {
	const preloader = document.querySelector('#preloader')
	preloader.classList.add('preloader--hide')

	setTimeout(() => {
		preloader.remove()
	}, 1000);
};
// LOADER  END ================================