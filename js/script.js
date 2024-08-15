// Получаем элементы слайдера
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('img'));
const slidesCount = slides.length;
let slideIndex = 0;
let isTransitionaling = false; // Флаг для отслеживания состояния перехода

// Создаем точки для слайдера
const sliderDotsContainer = document.getElementById('sliderDots');
for (let i = 0; i < slidesCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    sliderDotsContainer.appendChild(dot);
    dot.addEventListener('click', function () {
        goToSlide(i);
        updateDots();

    })
};

// Функция для перехода к определенному слайду по индексу
function goToSlide(index) {
    if (!isTransitionaling) {
        slideIndex = index;
        updateSlider();
        updateDots();
    }
}

//Обновление отображения точек
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(function (dot, index) {
        if (index === slideIndex) {
            dot.classList.add('active')
        }
        else {
            dot.classList.remove('active')
        }
    });
};

// Стрелка вправо
function showNextSlide() {
    if (!isTransitionaling) {
        slideIndex = (slideIndex + 1) % slidesCount;
        updateSlider();
        updateDots();
    }
};

// Стрелка влево
function showPrevSlide() {
    if (!isTransitionaling) {
        slideIndex = (slideIndex - 1 + slidesCount) % slidesCount;
        updateSlider();
        updateDots();
    }
};

// Функция для обновления отображения слайдера
function updateSlider() {
    isTransitionaling = true;
    const translateValue = -slideIndex * 100 + '%';
    slider.style.transform = 'translateX(' + translateValue + ')';
    setTimeout(() => {
        isTransitionaling = false;
    }, 500);
};

// Устанавливаем интервал для автоматической смены слайдов
let interval;

// Функция для автоматического переключения слайдов
function startAutoSlide() {
    interval = setInterval(showNextSlide, 3000);
};

// Функция для остановки автоматического переключения слайдов
function stopAutoSlide() {
    clearInterval(interval);
};

// События для остановки слайдера
slider.addEventListener('mouseenter', stopAutoSlide);

// События для возобновления автоматического переключения слайдера
slider.addEventListener('mouseleave', startAutoSlide);

// Обработчик событий нажатии для клавиш влево и вправо
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        stopAutoSlide();
        showPrevSlide();
        startAutoSlide();
    } else if (event.key === 'ArrowRight') {
        stopAutoSlide();
        showNextSlide();
        startAutoSlide();
    }
});

// Вызываем функции 
updateSlider();
updateDots();
startAutoSlide();

const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks')

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
