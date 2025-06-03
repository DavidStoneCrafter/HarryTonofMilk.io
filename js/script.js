document.addEventListener("DOMContentLoaded", function() {
	 console.log("DOM загружен, запускаем слайдер");
  /* ==== Эффект параллакса для фона header ==== */
  const header = document.querySelector('header');
  window.addEventListener("scroll", function() {
    // Получаем количество пикселей, на которое страница прокручена
    let scrolled = window.pageYOffset;
    // Коэффициент замедления — меняйте по вкусу (0.5 означает, что фон движется в 2 раза медленнее)
    header.style.backgroundPositionY = -(scrolled * 0.5) + "px";
  });

  /* ==== Слайдер ==== */
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const btnNext = document.querySelector(".slider-btn.next");
  const btnPrev = document.querySelector(".slider-btn.prev");

  let currentSlide = 0;
  const slideIntervalTime = 5000; // Интервал смены слайда (5 секунд)
  let slideInterval;

  // Функция показа слайда по индексу с обработкой цикличности
  function showSlide(index) {
    if (index >= slides.length) index = 0;
    else if (index < 0) index = slides.length - 1;

    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === index);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === index);
    });

    currentSlide = index;
  }

  // Переключение на следующий слайд
  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  // Переключение на предыдущий слайд
  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Запуск автоматической смены слайдов
  function startSlideShow() {
    slideInterval = setInterval(nextSlide, slideIntervalTime);
  }

  // Перезапуск слайдшоу для случаев ручного переключения
  function resetSlideShow() {
    clearInterval(slideInterval);
    startSlideShow();
  }

  // Обработчики событий для кнопок навигации
  btnNext.addEventListener("click", () => {
    nextSlide();
    resetSlideShow();
  });

  btnPrev.addEventListener("click", () => {
    prevSlide();
    resetSlideShow();
  });

  // Обработчики для точек навигации
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      showSlide(idx);
      resetSlideShow();
    });
  });

  // Инициализация слайдера
  showSlide(currentSlide);
  startSlideShow();

  /* ==== Обработка отправки формы обратной связи ==== */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault();
      alert("Спасибо! Ваше сообщение отправлено.");
      contactForm.reset();
    });
  }
});
