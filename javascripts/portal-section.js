// Обратный отсчет при телепортации
let countdownTime = 3;
let interval;
function updateCountdown() {
    const countdownElement = document.querySelector('.countdown h1');
    if (countdownTime > 0) {
        countdownElement.textContent = `ТЕЛЕПОРТАЦИЯ ЧЕРЕЗ ${countdownTime}...`;
        countdownTime--;
    } else {
        countdownElement.textContent = "ТЕЛЕПОРТАЦИЯ!";
        // Запуск первой анимации (наложение размытия)
        const section1 = document.getElementById('portal');
        section1.classList.add('blur-in');
        // Ждем завершения первой анимации (2 секунды)
        setTimeout(() => {
            // Скрываем секцию 1 и показываем секцию 2
            section1.style.display = 'none';
            const section2 = document.getElementById('map');
            section2.style.display = 'block';
            // Запуск второй анимации (исчезновение размытия)
            setTimeout(() => {
                section2.classList.add('blur-out');
            }, 100);
        }, 2000);
        clearInterval(interval);
    }
}
// Обработчик клика по порталу
document.querySelector('.portal img').addEventListener('click', function() {
    // Добавляем класс, который включает анимацию
    this.classList.add('rotate');
    // Запускаем таймер с задержкой в 0.8 сек только при клике
    interval = setInterval(updateCountdown, 800);
    // Меняем текст сразу при клике
    document.querySelector('.countdown h1').textContent = `ТЕЛЕПОРТАЦИЯ ЧЕРЕЗ ${countdownTime}...`;
});