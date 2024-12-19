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
	const header = document.querySelector('header');
	if (window.scrollY > 50) { 
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
});

document.addEventListener('DOMContentLoaded', function () {
	const heroSwiper = new Swiper('.hero__swiper', {
		loop: true,
		autoplay: {
			delay: 5000, // Можна змінити час затримки між слайдами
		},
		spaceBetween: 10,
		slidesPerView: 1,
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
	});
});

