window.addEventListener('DOMContentLoaded', function () {
	// Tabs

	const tab = {
		tabs: document.querySelectorAll('.tabheader__item'),
		tabsContent: document.querySelectorAll('.tabcontent'),
		tabsParent: document.querySelector('.tabheader__items'),
		hideTabContent() {
			this.tabsContent.forEach(item => {
				item.classList.add('hide');
				item.classList.remove('show', 'fade');
			});

			this.tabs.forEach(item => {
				item.classList.remove('tabheader__item_active');
			});
		},
		showTabContent(i = 0) {
			this.tabsContent[i].classList.add('show', 'fade');
			this.tabsContent[i].classList.remove('hide');
			this.tabs[i].classList.add('tabheader__item_active');
		},
		init() {
			this.hideTabContent();
			this.showTabContent();
			this.tabsParent.addEventListener('click', function (event) {
				const target = event.target;
				if (target && target.classList.contains('tabheader__item')) {
					tab.tabs.forEach((item, i) => {
						if (target == item) {
							tab.hideTabContent();
							tab.showTabContent(i);
						}
					});
				}
			});
		},
	};
	tab.init();

	// Timer
	const time = {
		init(selector, endtime) {
			let timer = document.querySelector(selector),
				days = timer.querySelector('#days'),
				hours = timer.querySelector('#hours'),
				minutes = timer.querySelector('#minutes'),
				seconds = timer.querySelector('#seconds'),
				timeInterval = setInterval(updateClock, 1000);

			function updateClock() {
				const t = time.getTimeRemaining(endtime);

				days.innerHTML = time.getZero(t.days);
				hours.innerHTML = time.getZero(t.hours);
				minutes.innerHTML = time.getZero(t.minutes);
				seconds.innerHTML = time.getZero(t.seconds);

				if (t.total <= 0) {
					clearInterval(timeInterval);
				}
			}
		},
		getTimeRemaining(endtime) {
			let t = Date.parse(endtime) - Date.parse(new Date()),
				days = Math.floor(t / (1000 * 60 * 60 * 24)),
				hours = Math.floor((t / (1000 * 60 * 60)) % 24),
				minutes = Math.floor((t / (1000 * 60)) % 60),
				seconds = Math.floor((t / 1000) % 60);

			return {
				total: t,
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds,
			};
		},
		getZero(num) {
			if (num >= 0 && num < 10) {
				return `0${num}`;
			} else {
				return num;
			}
		},
	};
	time.init('.timer', '2020-05-28');

	// Modal
	const modal = {
		window: document.querySelector('.modal'),
		btnsOpen: document.querySelectorAll('[data-modal]'),
		btnClose: document.querySelector('[data-close]'),
		open() {
			this.window.classList.add('show');
			this.window.classList.remove('hide');
			document.body.style.overflow = 'hidden';
		},
		close() {
			this.window.classList.add('hide');
			this.window.classList.remove('show');
			document.body.style.overflow = '';
		},
		init() {
			// let modalTimerId = setTimeout(() => {
			// 	modal.open();
			// }, 5000);
			modal.btnsOpen.forEach(btn => {
				btn.addEventListener('click', () => {
					modal.open();
				});
			});
			modal.btnClose.addEventListener('click', () => {
				modal.close();
			});
			modal.window.addEventListener('click', e => {
				if (e.target == this.window) {
					this.window.classList.add('hide');
					this.window.classList.remove('show');
					document.body.style.overflow = '';
				}
			});
		},
	};
	modal.init();

	// Карточки
	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.discr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');

			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
				<img src="${this.src}" alt="${this.alt}" />
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.discr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
			this.parent.append(element);
		}
	}

	new MenuCard('img/tabs/vegy.jpg', 'vegy', 'Меню "Фитнес"', 'Меню "Фитнес" -', 9, '.menu .container').render();

	// const inputRub = document.querySelector('#rub');
	// const inputUsd = document.querySelector('#usd');

	// inputRub.addEventListener('input', () => {
	// 	const request = new XMLHttpRequest();
	// 	request.open('GET', 'js/current.json');
	// 	request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	// 	request.send();

	// 	request.addEventListener('load', () => {
	// 		if (request.status === 200) {
	// 			console.log(request.response);
	// 			const data = JSON.parse(request.response);
	// 			inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
	// 		} else {
	// 			inputUsd.value = 'Что-то пошло не так';
	// 		}
	// 	});

	// 	// status / statusText / response / readyState
	// });

	// Forms

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'Загрузка',
		success: 'Успешно',
		failure: 'Ошибка',
	};

	forms.forEach(item => {
		postData(item);
	});

	function postData(form) {
		form.addEventListener('submit', event => {
			event.preventDefault();

			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			statusMessage.textContent = message.loading;
			form.append(statusMessage);

			const request = new XMLHttpRequest();
			request.open('POST', 'server.php');

			request.setRequestHeader('Content-type', 'application/json');
			const formData = new FormData(form);

			const object = {};
			formData.forEach(function (value, key) {
				object[key] = value;
			});

			const json = JSON.stringify(object);

			request.send(json);

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					statusMessage.textContent = message.success;
					form.reset();
					setTimeout(() => {
						statusMessage.remove();
					}, 2000);
				} else {
					statusMessage.textContent = message.failure;
				}
			});
		});
	}

	// Promise

	const req = new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Подготовка данных...');

			const product = {
				name: 'TV',
				price: 2000,
			};

			resolve(product);
		}, 2000);
	});

	req.then(product => {
		console.log('Данные получены');
		setTimeout(() => {
			product.status = 'order';
		}, 2000);
	});

	req.then(product => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				product.status = 'order';
				resolve(product);
			});
		});
	})
		.then(data => {
			data.modify = true;
			return data;
		})
		.then(data => {
			console.log(data);
		})
		.catch(() => {
			console.error('Ошибка');
		})
		.finally(() => {
			// console.error('finally');
		});

	// Test

	const test = time => {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(), time);
		});
	};

	test(1000).then(() => console.log('1000 ms'));
	test(2000).then(() => console.log('2000 ms'));

	// Promise.all([test(1000), test(2000)]).then(() => {
	// 	console.log('Done');
	// });

	Promise.race([test(1000), test(2000)]).then(() => {
		console.log('All');
	});

	// Fetch
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		body: JSON.stringify({ name: 'Alex' }),
		headers: {
			'Content-type': 'application/json',
		},
	})
		.then(response => response.json())
		.then(json => console.log(json))
		.catch(() => {
			alert('Ошибка');
		})
		.finally(() => {
			//
		});

	// Filter
	const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemart'];
	const shortNames = names.filter(name => name.length < 5);
	console.log(shortNames);

	// Map
	let answers = ['IvAn', 'AnnA', 'Hello'];
	answers = answers.map(item => item.toLocaleLowerCase());
	console.log(answers);

	// every/some
	const some = [4, 3, 2];
	console.log(some.some(item => typeof item === 'number'));
	console.log(some.every(item => typeof item === 'number'));

	// reduce
	const arr = [4, 5, 1, 3, 2, 6];
	const res = arr.reduce((sum, curret) => sum + curret);
	console.log(res);

	const obj = {
		ivan: 'persone',
		ann: 'persone',
		dog: 'animal',
		cat: 'animal',
	};

	const newArr = Object.entries(obj)
		.filter(item => item[1] === 'persone')
		.map(item => item[0]);
	console.log(newArr);
});
