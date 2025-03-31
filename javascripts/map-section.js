// Фразы для персонажа
const texts = [
    "...",
    "Ой, привет! Ты как раз вовремя! Я Пряня, и теперь ты в Мире Сладостей! Тут всё сделано из сладостей — горы из тортов, луга из леденцов и карамельные водопады.",
    "Ты можешь выбрать, куда хочешь отправиться! Я подготовил карту, на которой указаны самые вкусные и волшебные места.",
    "На карте ты увидишь несколько интересных территорий. Тебе предстоит не только наслаждаться их видами, но и взаимодействовать с ними!",
    "Удачи!"
];
let currentIndex = 0;
let isTyping = false; // Флаг, указывающий, идет ли в данный момент печать текста

// Функция для посимвольного вывода текста
function typeText(element, text, speed, callback) {
    let i = 0;
    element.textContent = '';
    isTyping = true; // Устанавливаем флаг, что началась печать
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            isTyping = false; // Сбрасываем флаг по завершении печати
            if (callback) callback();
        }
    }
    type();
}
// Функция для изменения текста
function changeText() {
    // Если идет печать текста, игнорируем клик
    if (isTyping) return;
    const textElement = document.querySelector('.character-text');
    // Меняем текст на следующий из массива
    currentIndex = (currentIndex + 1) % texts.length;
    // Выводим текст с эффектом печати (ускоренная печать, speed = 10 мс)
    typeText(textElement, texts[currentIndex], 10, () => {
        // Если фразы закончились
        if (currentIndex === texts.length - 1) {
            const dialogBox = document.querySelector('.dialog-box');
            const character = document.querySelector('.character');
            dialogBox.classList.add('fade-out');
            character.classList.add('fade-out');
            // Показываем карту мира
            const worldMap = document.querySelector('.map-container');
            worldMap.style.display = 'block';
            const worldMapFooter = document.querySelector('.footer');
            worldMapFooter.style.display = 'block';
            // Убираем обработчик события, чтобы больше нельзя было кликать
            dialogBox.removeEventListener('click', changeText);
        }
    });
}

// Назначаем обработчик события на элемент с классом .dialog-box
const dialogBox = document.querySelector('.dialog-box');
dialogBox.addEventListener('click', changeText);

// svg картинка диалогового окна
fetch('images/box.svg')
    .then(response => response.text())
    .then(svg => {
        document.getElementById('svg-dialog').innerHTML = svg;
});

//svg картинка карты, чтоб js видел айди островков
fetch('images/map.svg')
.then(response => response.text())
.then(svg => {
    document.getElementById('svg-map').innerHTML = svg;
});

// Анимированный градиент на фон карты
const bgAnimation = document.getElementById('map');
let angle = 0;
// Функция для вращения градиента
function animateGradient() {
  angle = (angle + 0.4) % 360;
  const gradient = `linear-gradient(${angle}deg, #FF9EF9, #FFD752)`;
  bgAnimation.style.background = gradient;
  
  requestAnimationFrame(animateGradient);
}
animateGradient();

// popup окно для "Кремовые вершины"
const observer_1 = new MutationObserver(function() {
    const island_1 = document.getElementById('island__1');
    if (island_1) {
        const popup = document.querySelector('.popup__1');
        const closeBtn = popup.querySelector('.close-btn');
        island_1.addEventListener('click', function() {
            if (popup.classList.contains('active')) {
                popup.classList.remove('active');
            } else {
                popup.classList.add('active');
            }
        });
        closeBtn.addEventListener('click', function() {
            popup.classList.remove('active');
        });
        observer_1.disconnect();
    }
});
// Обработчик для кнопки "Перейти"
document.getElementById('event1').addEventListener('click', function() {
    document.querySelector('.popup__1').classList.remove('active');
    document.querySelector('.event__1').classList.add('active');
    // Скрываем футер при переходе на секцию
    document.querySelector('.footer').style.display = 'none';
});
// Обработчик для кнопки "Обратно"
document.getElementById('backButton_1').addEventListener('click', function() {
    document.querySelector('.event__1').classList.remove('active');
    // Показываем футер при возврате
    document.querySelector('.footer').style.display = 'block';
});
observer_1.observe(document.body, { childList: true, subtree: true });

// popup окно для "Леденцовые луга"
const observer_2 = new MutationObserver(function() {
    const island_2 = document.getElementById('island__2');
    if (island_2) {
        const popup = document.querySelector('.popup__2');
        const closeBtn = popup.querySelector('.close-btn');
        island_2.addEventListener('click', function() {
            if (popup.classList.contains('active')) {
                popup.classList.remove('active');
            } else {
                popup.classList.add('active');
            }
        });
        closeBtn.addEventListener('click', function() {
            popup.classList.remove('active');
        });
        observer_2.disconnect();
    }
});
observer_2.observe(document.body, { childList: true, subtree: true });
document.getElementById('event2').addEventListener('click', function() {
    document.querySelector('.popup__2').classList.remove('active');
    document.querySelector('.event__2').classList.add('active');
    // Скрываем футер при переходе на секцию
    document.querySelector('.footer').style.display = 'none';
});
document.getElementById('backButton_2').addEventListener('click', function() {
    document.querySelector('.event__2').classList.remove('active');
    // Показываем футер при возврате
    document.querySelector('.footer').style.display = 'block';
});

// popup окно для "Карамельные водопады"
const observer_3 = new MutationObserver(function() {
    const island_3 = document.getElementById('island__3');
    if (island_3) {
        const popup = document.querySelector('.popup__3');
        const closeBtn = popup.querySelector('.close-btn');
        island_3.addEventListener('click', function() {
            if (popup.classList.contains('active')) {
                popup.classList.remove('active');
            } else {
                popup.classList.add('active');
            }
        });
        closeBtn.addEventListener('click', function() {
            popup.classList.remove('active');
        });
        observer_3.disconnect();
    }
});
observer_3.observe(document.body, { childList: true, subtree: true });
document.getElementById('event3').addEventListener('click', function() {
    document.querySelector('.popup__3').classList.remove('active');
    document.querySelector('.event__3').classList.add('active');
    // Скрываем футер при переходе на секцию
    document.querySelector('.footer').style.display = 'none';
});
document.getElementById('backButton_3').addEventListener('click', function() {
    document.querySelector('.event__3').classList.remove('active');
    // Показываем футер при возврате
    document.querySelector('.footer').style.display = 'block';
});

// popup окно для "Долина десертов"
const observer_4 = new MutationObserver(function() {
    const island_4 = document.getElementById('island__4');
    if (island_4) {
        const popup = document.querySelector('.popup__4');
        const closeBtn = popup.querySelector('.close-btn');
        island_4.addEventListener('click', function() {
            if (popup.classList.contains('active')) {
                popup.classList.remove('active');
            } else {
                popup.classList.add('active');
            }
        });
        closeBtn.addEventListener('click', function() {
            popup.classList.remove('active');
        });
        observer_4.disconnect();
    }
});
observer_4.observe(document.body, { childList: true, subtree: true });
document.getElementById('event4').addEventListener('click', function() {
    document.querySelector('.popup__4').classList.remove('active');
    document.querySelector('.event__4').classList.add('active');
    // Скрываем футер при переходе на секцию
    document.querySelector('.footer').style.display = 'none';
});
document.getElementById('backButton_4').addEventListener('click', function() {
    document.querySelector('.event__4').classList.remove('active');
    // Показываем футер при возврате
    document.querySelector('.footer').style.display = 'block';
});