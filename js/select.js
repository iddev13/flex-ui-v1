// SELECT START ============================================
const initialSelect = () => {

	let city = localStorage.getItem('city') ?? 'kharkiv'

	document.querySelectorAll('.select').forEach(function (selectWrapper) {
		const selectBtn = selectWrapper.querySelector('.select__button');
		const selectList = selectWrapper.querySelector('.select__list');
		const selectItems = selectList.querySelectorAll('.select__list-item');
		const selectInput = selectWrapper.querySelector('.select__input-hidden')

		selectBtn.textContent = city


		selectList.setAttribute('aria-expanded', false);
		selectList.setAttribute('aria-hidden', true);
		if (selectItems.length > 4) {
			selectList.style.overflowY = 'scroll'
		}

		selectBtn.addEventListener('click', function () {
			selectList.classList.toggle('active');
			this.classList.toggle('active');
			if (selectList.classList.contains('active')) {
				selectList.setAttribute('aria-expanded', true);
				selectList.setAttribute('aria-hidden', false);
			}
		});

		selectItems.forEach(function (listItem) {
			listItem.addEventListener('click', function (e) {
				selectItems.forEach(function (el) {
					el.classList.remove('active');
				})
				e.target.classList.add('active');
				selectBtn.textContent = this.innerText;
				selectInput.value = this.dataset.value;
				console.log(selectInput.value);
				selectList.classList.remove('active');
				localStorage.setItem('city', this.dataset.value)
				selectList.setAttribute('aria-expanded', false);
				selectList.setAttribute('aria-hidden', true);
			})
		})

		document.addEventListener('click', function (event) {
			if (event.target !== selectBtn) {
				selectBtn.classList.remove('active');
				selectList.classList.remove('active');
				selectList.setAttribute('aria-expanded', false);
				selectList.setAttribute('aria-hidden', true);
			}
		})

		document.addEventListener('keydown', function (event) {
			if (event.key === 'Tab' || event.key === 'Escape') {
				selectBtn.classList.remove('active');
				selectList.classList.remove('active');
				selectList.setAttribute('aria-expanded', false);
				selectList.setAttribute('aria-hidden', true);
			}
		})
	})
}


initialSelect()
// SELECT END ============================================