// BUTTON ANIMATE  START ================================
function buttonAnimate() {
	const buttons = document.getElementsByClassName('btn'),
		forEach = Array.prototype.forEach;

	forEach.call(buttons, function (b) {
		b.addEventListener('click', addElement);
	});

	function addElement(e) {
		const addDiv = document.createElement('div'),
			mValue = Math.max(this.clientWidth, this.clientHeight),
			rect = this.getBoundingClientRect();
		const sDiv = addDiv.style,
			px = 'px';
		sDiv.width = sDiv.height = mValue + px;
		sDiv.left = e.clientX - rect.left - (mValue / 2) + px;
		sDiv.top = e.clientY - rect.top - (mValue / 2) + px;

		addDiv.classList.add('pulse');
		this.appendChild(addDiv);
	}
}

buttonAnimate()
// BUTTON ANIMATE  END ================================