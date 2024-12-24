// COLORS  START ================================
function colorsFunction() {
	const body = document.querySelector('body');
	const colors = document.querySelector('.colors');
	const colorsList = document.querySelectorAll('.colors__item');
	let colorsListColors = Array.from(colorsList).map((elem) => {
		return elem.getAttribute('data-color');
	});

	if (
		localStorage.getItem('activeTheme') !== null &&
		colorsListColors.includes(localStorage.getItem('activeTheme'))
	) {
		body.classList.add(localStorage.getItem('activeTheme'));
	} else {
		body.classList.add(colorsListColors[0]);
	}

	let activeColorTheme = body.getAttribute('class').split(' ')[0];
	localStorage.setItem('activeTheme', activeColorTheme);

	const intersect = (num1, num2) => {
		let result = [];

		let map = num1.reduce((acum, item) => {
			acum[item] = acum[item] ? acum[item] + 1 : 1;
			return acum;
		}, {});

		for (let i = 0; i < num2.length; i++) {
			const current = num2[i];
			const count = map[current];
			if (count && count > 0) {
				result.push(current);
				map[current] -= 1;
			}
		}

		return result;
	};

	colors.addEventListener('click', function () {
		colors.classList.toggle('colors-active');
	});

	let colorsArray = [];
	let activeClass = '';

	for (let i = 0; i < colorsList.length; i++) {
		colorsArray.push(colorsList[i].getAttribute('data-color'));

		colorsList[i].addEventListener('click', function () {
			// const newActiveClass = colorsList[i].getAttribute('data-color');
			const bodyClassesArray = body.getAttribute('class').split(' ');
			activeClass = intersect(bodyClassesArray, colorsArray);

			activeClass = activeColorTheme;
			activeColorTheme = colorsList[i].getAttribute('data-color');
			localStorage.setItem('activeTheme', activeColorTheme);
			body.classList.remove(activeClass);
			body.classList.add(activeColorTheme);
		});
	}
}

colorsFunction();
// COLORS  END ================================
