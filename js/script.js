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

	// function User(name, id) {
	// 	this.name = name;
	// 	this.id = id;
	// 	this.human = true;
	// 	this.hello = function () {
	// 		console.log(`Hello ${this.name}`);
	// 	};
	// }

	// const ivan = new User('Ivan', 28);
	// const alex = new User('Alex', 20);

	// class Rectangle {
	// 	constructor(height, width) {
	// 		this.height = height;
	// 		this.width = width;
	// 	}

	// 	calcArea() {
	// 		return this.height * this.width;
	// 	}
	// }

	// // Наследуем свойства от родителя
	// class ColoredRectangleWithText extends Rectangle {
	// 	constructor(height, width, text, bgColor) {
	// 		super(height, width); // Вызываем тоже самое, что было у родителя + всегда на первом месте
	// 		this.text = text;
	// 		this.bgColor = bgColor;
	// 	}

	// 	showMyProps() {
	// 		console.log(`Текст: ${this.text}, цвет: ${this.bgColor}`);
	// 	}
	// }

	// const div = new ColoredRectangleWithText(25, 10, 'Hello', 'red');

	// div.showMyProps();
	// console.log(div.calcArea());

	// Первый принцип ООП - Абстракция - когда мы разделяем концепцию (шаблона), от её экземпляра

	// Карточки
	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.discr = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			element.innerHTML = `
				<div class="menu__item">
					<img src="${this.src}" alt="${this.alt}" />
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.discr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>
				</div>
			`;
			this.parent.append(element);
		}
	}

	new MenuCard('img/tabs/vegy.jpg', 'vegy', 'Меню "Фитнес"', 'Меню "Фитнес" -', 9, '.menu .container').render();
});
