document.addEventListener('DOMContentLoaded', () => {
	const personalMovieDB = {
		count: 0,
		movies: {},
		actors: {},
		genres: [],
		privat: false,
		rememberMyFilms: function () {
			for (let i = 0; i < 1; i++) {
				const a = prompt('Один из последних просмотренных фильмов?', ''),
					b = prompt('На сколько оцените его?', '');

				if (a != null && b != null && a != '' && b != '' && a.length < 50) {
					personalMovieDB.movies[a] = b;
					console.log('done');
				} else {
					console.log('error');
					i--;
				}
			}
		},
		delectPersonalLevel: function () {
			if (personalMovieDB.count < 10) {
				console.log('Просмотрено довольно мало фильмов');
			} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
				console.log('Вы классический зритель');
			} else if (personalMovieDB.count >= 30) {
				console.log('Вы киноман');
			} else {
				console.log('Произошла ошибка');
			}
		},
		writeYourGenres: function () {
			for (let i = 1; i <= 3; i++) {
				let genre = prompt(`Ваш любимый жанр под номером ${i}`, '');

				if (genre === '' || genre === null) {
					console.log('Вы ввели некорректные данные');
					i--;
				} else {
					personalMovieDB.genres[i - 1] = genre;
				}
			}
			personalMovieDB.genres.forEach((item, i) => {
				console.log(`Любимый жанр ${i + 1} - это ${item}`);
			});
		},
		showMyDB: function () {
			if (personalMovieDB.privat == false) {
				console.log(personalMovieDB);
			}
		},
		toggleVisibleMyDB: function () {
			if (personalMovieDB.privat) {
				personalMovieDB.privat = false;
			} else {
				personalMovieDB.privat = true;
			}
		},
		start: function () {
			personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');

			while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
				personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
			}
		},
	};
});

document.addEventListener('DOMContentLoaded', () => {
	const movieDB = {
		movies: ['Логан', 'Лига справедливости', 'Ла-ла лэнд', 'Одержимость', 'Скотт Пилигрим против...'],
	};

	const adv = document.querySelectorAll('.promo__adv img'),
		poster = document.querySelector('.promo__bg'),
		genre = poster.querySelector('.promo__genre'),
		movieList = document.querySelector('.promo__interactive-list'),
		addForm = document.querySelector('form.add'),
		addInput = addForm.querySelector('.adding__input'),
		checkbox = addForm.querySelector('[type="checkbox"]');

	addForm.addEventListener('submit', event => {
		event.preventDefault();

		let newFilm = addInput.value;
		const favorite = checkbox.checked;

		if (newFilm) {
			if (newFilm.length > 21) {
				newFilm = `${newFilm.substring(0, 22)}...`;
			}

			if (favorite) {
				console.log('Добавляем любимый фильм');
			}

			movieDB.movies.push(newFilm);
			sortArr(movieDB.movies);

			createMovieList(movieDB.movies, movieList);
		}

		event.target.reset();
	});

	const deleteAdv = arr => {
		arr.forEach(item => {
			item.remove();
		});
	};

	const makeChanges = () => {
		genre.textContent = 'драма';

		poster.style.backgroundImage = 'url("img/bg.jpg")';
	};

	const sortArr = arr => {
		arr.sort();
	};

	function createMovieList(films, parent) {
		parent.innerHTML = '';
		sortArr(films);

		films.forEach((film, i) => {
			parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
		});

		document.querySelectorAll('.delete').forEach((btn, i) => {
			btn.addEventListener('click', () => {
				btn.parentElement.remove();
				movieDB.movies.splice(i, 1);

				createMovieList(films, parent);
			});
		});
	}

	deleteAdv(adv);
	makeChanges();
	createMovieList(movieDB.movies, movieList);
});

// touches - отслеживание мультитач
// targetTouches - мультитач конкретно на элементе
// chengedTouches - отслеживание любого пальца при мультитаче

const wrapper = document.querySelector('.wrapper');
const btns = document.querySelectorAll('button');

wrapper.addEventListener('click', event => {
	if (event.target && event.target.tagName == 'BUTTON') {
		console.log('Hello');
	}
});
