// @ts-check

document.addEventListener('DOMContentLoaded', async () => {
	/** @param {number} i  */
	async function updateLoop(i) {
		if (i % 10 === 0) {
			const countdown = updateCountdown();
			
			switch (countdown) {
				case false:
					// @ts-ignore
					await tsParticles.load({
						id: 'particles',
						options: {
							autoPlay: true,
							fpsLimit: 40,
							particles: {
								number: { value: 0 },
								color: { value: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'] },
								shape: { type: 'circle' },
								opacity: {
									value: 1,
									animation: { enable: true, speed: 1, minimumValue: 0, sync: false }
								},
								size: {
									value: { min: 2, max: 4 },
									animation: { enable: true, speed: 40, minimumValue: 0.1, sync: false }
								},
								life: {
									duration: { sync: true, value: 2 },
									count: 1
								},
								move: {
									enable: true,
									gravity: { enable: true, acceleration: 9.81 },
									speed: { min: 5, max: 15 },
									decay: 0.1,
									direction: 'none',
									random: true,
									straight: false,
									outModes: { default: 'destroy' }
								}
							},
							emitters: [
								{
									direction: 'none',
									rate: { quantity: 5, delay: 0.25 },
									size: { width: 0, height: 0 },
								},
								{
									direction: 'none',
									rate: { quantity: 5, delay: 0.25 },
									size: { width: 0, height: 0 },
								},
								{
									direction: 'none',
									rate: { quantity: 5, delay: 0.25 },
									size: { width: 0, height: 0 },
								},
								{
									direction: 'none',
									rate: { quantity: 5, delay: 0.25 },
									size: { width: 0, height: 0 },
								},
								{
									direction: 'none',
									rate: { quantity: 5, delay: 0.25 },
									size: { width: 0, height: 0 },
								}
							]
						}
					})
					return;
				default:
					break;
			}
		}
		i++;
		requestAnimationFrame(async () => await updateLoop(i));
	}

	// @ts-ignore
	await tsParticles.load({
		id: 'particles',
		options: {
			autoPlay: true,
			fpsLimit: 40,
			particles: {
				color: { value: ['#979ca2', '#ffffff'] },
				opacity: { value: { min: 0.2, max: 0.5 } },
				move: { enable: true, speed: { min: 1.5, max: 2 }, direction: 'bottom' },
				number: { value: 50 },
				shape: { type: 'circle' },
				size: { value: { min: 2, max: 5 } }
			}
		}
	})

	await updateLoop(0);
});

function updateCountdown() {
	/** @type {HTMLElement} */ // @ts-ignore
	const timeEl = document.getElementById('time');
	const daysEl = document.getElementById('days');
	const daysPlurialEl = document.getElementById('days-plurial');
	const hoursEl = document.getElementById('hours');
	const hoursPlurialEl = document.getElementById('hours-plurial');
	const minutesEl = document.getElementById('minutes');
	const minutesPlurialEl = document.getElementById('minutes-plurial');
	const secondsEl = document.getElementById('seconds');
	const secondsPlurialEl = document.getElementById('seconds-plurial');

	const newYear = new Date('1/01/2025').getTime();
	const currentTime = new Date().getTime();
	const diffTime = newYear - currentTime;

	if (diffTime <= 0) {
		document.body.innerHTML = '<span id="event">Merveilleuse année 2025 à vous !</span>';
		return false;
	} else {
		const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
		const hours = Math.floor(diffTime / (1000 * 60 * 60) - (24 * days));
		const minutes = Math.floor(diffTime / (1000 * 60) - (24 * 60 * days) - (60 * hours));
		const seconds = Math.floor(diffTime / 1000 - (24 * 60 * 60 * days) - (60 * 60 * hours) - (60 * minutes));

		if (
			days > 0 &&
			daysEl && daysPlurialEl
		) {
			if (daysEl.innerText !== String(days)) daysEl.innerText = String(days);
			if (days > 1 && daysPlurialEl.innerText !== 's') daysPlurialEl.innerText = days > 1 ? 's' : '';
			else if (days <= 1 && daysPlurialEl.innerText !== '') daysPlurialEl.innerText = '';
		} else if (timeEl.innerHTML.trim().startsWith('<span id="days">')) {
			timeEl.innerHTML = timeEl.innerHTML.replace(/<span id="days">\d{1,2}<\/span> jour<span id="days-plurial">s?<\/span>,/, '');
		}

		if (
			(days > 0 || hours > 0) &&
			hoursEl && hoursPlurialEl
		) {
			if (hoursEl.innerText !== String(hours)) hoursEl.innerText = String(hours);
			if (hours > 1 && hoursPlurialEl.innerText !== 's') hoursPlurialEl.innerText = hours > 1 ? 's' : '';
			else if (hours <= 1 && hoursPlurialEl.innerText !== '') hoursPlurialEl.innerText = '';
		} else if (timeEl.innerHTML.trim().startsWith('<span id="hours">')) {
			timeEl.innerHTML = timeEl.innerHTML.replace(/<span id="hours">\d{1,2}<\/span> heure<span id="hours-plurial">s?<\/span>,/, '');
		}

		if (
			(days > 0 || hours > 0 || minutes > 0) &&
			minutesEl && minutesPlurialEl
		) {
			if (minutesEl.innerText !== String(minutes)) minutesEl.innerText = String(minutes);
			if (minutes > 1 && minutesPlurialEl.innerText !== 's') minutesPlurialEl.innerText = minutes > 1 ? 's' : '';
			else if (minutes <= 1 && minutesPlurialEl.innerText !== '') minutesPlurialEl.innerText = '';
		} else if (timeEl.innerHTML.trim().startsWith('<span id="minutes">')) {
			timeEl.innerHTML = timeEl.innerHTML.replace(/<span id="minutes">\d{1,2}<\/span> minute<span id="minutes-plurial">s?<\/span> et/, '');
		}

		if (
			(days > 0 || hours > 0 || minutes > 0 || seconds > 0) &&
			secondsEl && secondsPlurialEl
		) {
			if (secondsEl.innerText !== String(seconds)) secondsEl.innerText = String(seconds);
			if (seconds > 1 && secondsPlurialEl.innerText !== 's') secondsPlurialEl.innerText = 's';
			else if (seconds <= 1 && secondsPlurialEl.innerText !== '') secondsPlurialEl.innerText = '';
		}

		return {
			days,
			hours,
			minutes,
			seconds
		}
	}
}