"use strict"


document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
	}
}

const icons = document.querySelectorAll('.icon-menu');
icons.forEach(icon => {
	icon.addEventListener('click', (event) => {
		icon.classList.toggle("active");
	});
});

// let arrow = document.getElementById("arrow-1");

// console.log(arrow.getTotalLength());

window.addEventListener('scroll', () => {
	const header = document.querySelector('.menu');
	if (window.scrollY > 50) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
});

document.addEventListener('DOMContentLoaded', () => {
	const animation = document.querySelector('.animation');

	function updateAnimationPosition() {
		const windowWidth = window.innerWidth;
		const activeLink = document.querySelector('.menu__link.active');

		if (windowWidth >= 800) {
			if (activeLink) {
				const rect = activeLink.getBoundingClientRect();
				const headerRect = document.querySelector('header').getBoundingClientRect();

				// Використовуємо requestAnimationFrame для плавного оновлення позиції
				requestAnimationFrame(() => {
					animation.style.left = `${rect.left - headerRect.left - 5}px`;
					animation.style.width = `${rect.width + 10}px`;
					animation.classList.add('show');
				});
			} else {
				animation.classList.remove('show');
			}
		} else {
			animation.classList.remove('show');
		}
	}

	// Оновлюємо позицію після завантаження всіх ресурсів
	window.addEventListener('load', () => {
		setTimeout(updateAnimationPosition, 200); // Збільшена затримка для повного завантаження стилів та ресурсів
	});

	// Оновлюємо позицію при зміні розміру вікна
	window.addEventListener('resize', () => {
		requestAnimationFrame(updateAnimationPosition);
	});

	// Динамічне перемикання активного пункту меню
	document.querySelectorAll('.menu__link').forEach(link => {
		link.addEventListener('click', () => {
			document.querySelectorAll('.menu__link').forEach(l => l.classList.remove('active'));
			link.classList.add('active');

			// Використовуємо тайм-аут для коректного оновлення анімації
			setTimeout(updateAnimationPosition, 50);
		});
	});
});

const heroSwiper = new Swiper('.hero__swiper', {
	loop: true, // Вимкнене зациклення
	autoplay: {
		delay: 7000,  // Можна змінити час затримки між слайдами

	},
	spaceBetween: 10,
	slidesPerView: 1,  // Один слайд для мобільних
	effect: "fade", // Додаємо ефект зміни
	fadeEffect: {
		crossFade: true, // Дозволяє плавний перехід між слайдами
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper__button-next',
		prevEl: '.swiper__button-prev',
	},
	breakpoints: {
		640: {  // Для маленьких екранів
			slidesPerView: 1,
			spaceBetween: 10,
		},
		1024: {  // Для більших екранів
			slidesPerView: 1,
			spaceBetween: 10,
		},
	},
	on: {
		resize: function () {
			this.update();  // Оновлює слайдер після зміни розміру
		}
	}
});


const openBtns = document.querySelectorAll(".slide-hero__button");
const modal = document.querySelector(".hero__form");
const overlay = document.querySelector(".overlay");

// Перевірка наявності елементів
if (openBtns.length > 0 && modal && overlay) {
	// Відкриття форми
	openBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			modal.classList.add("visible");
			overlay.classList.add("visible");
			document.body.style.overflow = "hidden"; // Заборона прокрутки
		});
	});

	// Закриття форми
	overlay.addEventListener("click", closeModal);
	const closeBtn = document.querySelector("#closeFormBtn");
	if (closeBtn) {
		closeBtn.addEventListener("click", closeModal);
	}

	function closeModal() {
		modal.classList.remove("visible");
		overlay.classList.remove("visible");
		document.body.style.overflow = ""; // Відновлення прокрутки
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const counters = document.querySelectorAll('.item-counter__number');

	if (counters.length === 0) return; // Перевірка наявності елементів

	const animateCounter = (element, start, end, suffix, duration) => {
		let current = start;
		const increment = (end - start) / (duration / 20); 

		const timer = setInterval(() => {
			current += increment;

			if (current >= end) {
				current = end;
				clearInterval(timer);
			}

			// Оновлюємо текст із суфіксом
			element.textContent = `${Math.floor(current).toLocaleString()}${suffix}`;
		}, 20); // Частота оновлення (20 мс)
	};

	const handleIntersect = (entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const counter = entry.target;
				const start = parseInt(counter.getAttribute('data-start'), 10) || 0; // Перевірка на наявність атрибутів
				const end = parseInt(counter.getAttribute('data-end').replace(/\D/g, ""), 10) || 0;
				const suffix = counter.getAttribute('data-suffix') || ""; // Якщо суфікс відсутній, беремо пустий рядок
				animateCounter(counter, start, end, suffix, 1500); // Тривалість: 1.5 секунди
				observer.unobserve(counter); // Вимикаємо спостереження для цього елемента
			}
		});
	};

	const observer = new IntersectionObserver(handleIntersect, { threshold: 0.5 });
	counters.forEach(counter => observer.observe(counter));
});
