// Локация 1 "Кремовые вершины" и 2 "Леденцовые луга" 
// Перемещение кондитерских декораций на торт, перемещение частей пазла
const decorations1 = document.querySelectorAll('.event__1 .decoration');
const decorations2 = document.querySelectorAll('.event__2 .puzzle');
const eventArea1 = document.querySelector('.event__1');
const eventArea2 = document.querySelector('.event__2');
// Функция для перетаскивания элементов
function setupDraggableElements(elements, eventArea) {
    elements.forEach(element => {
        let isDragging = false;
        let offsetX, offsetY;
        // Сохраняем исходную позицию элемента
        const initialPosition = {
            x: parseFloat(getComputedStyle(element).transform.split(',')[4]) || 0,
            y: parseFloat(getComputedStyle(element).transform.split(',')[5]) || 0
        };
        element.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - parseFloat(getComputedStyle(element).transform.split(',')[4]);
            offsetY = e.clientY - parseFloat(getComputedStyle(element).transform.split(',')[5]);
            element.style.zIndex = '100';
        });
        element.addEventListener('touchstart', (e) => {
            isDragging = true;
            const touch = e.touches[0];
            offsetX = touch.clientX - parseFloat(getComputedStyle(element).transform.split(',')[4]);
            offsetY = touch.clientY - parseFloat(getComputedStyle(element).transform.split(',')[5]);
            element.style.zIndex = '100';
        });
        const moveHandler = (clientX, clientY) => {
            if (isDragging && eventArea) {
                const x = clientX - offsetX;
                const y = clientY - offsetY;
                
                element.style.transform = `translate(${x}px, ${y}px)`;
            }
        };
        const checkBoundsAndReset = () => {
            if (!eventArea) return;
            const elementRect = element.getBoundingClientRect();
            const eventRect = eventArea.getBoundingClientRect();
            // Проверка, находится ли элемент после перетаскивания в пределах секции, если нет
            if (
                elementRect.left < eventRect.left ||
                elementRect.right > eventRect.right ||
                elementRect.top < eventRect.top ||
                elementRect.bottom > eventRect.bottom
            ) {
                // Возвращаем на исходную позицию
                element.style.transform = `translate(${initialPosition.x}px, ${initialPosition.y}px)`;
                element.style.zIndex = '';
            }
        };
        
        document.addEventListener('mousemove', (e) => {
            moveHandler(e.clientX, e.clientY);
        });
        
        document.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            moveHandler(touch.clientX, touch.clientY);
        });
        
        const stopDragging = () => {
            if (isDragging) {
                isDragging = false;
                checkBoundsAndReset();
                element.style.zIndex = '';
            }
        };
        
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchend', stopDragging);
    });
}
// Инициализация для обеих секций
setupDraggableElements(decorations1, eventArea1);
setupDraggableElements(decorations2, eventArea2)

// Локация 3 "КАРАМЕЛЬНЫЕ ВОДОПАДЫ" 
const eventSection = document.querySelector('.event__3');
// Виды конфет
const candyImages = [
    'images/drop-candy1.svg',
    'images/drop-candy2.svg',
    'images/drop-candy3.svg',
    'images/drop-candy4.svg',
    'images/drop-candy5.svg'
];
let collected = 0;
const totalDisplay = document.querySelector('.total span');
let candyInterval;

// Обновление отображения собранных конфет
function updateTotal() {
    totalDisplay.textContent = `${collected}`;
}

// Создание новой конфеты
function createCandy() {
    const candy = document.createElement('img');
    candy.src = candyImages[Math.floor(Math.random() * candyImages.length)];
    candy.classList.add('candy');
    
    // Рандомные стили
    const size = Math.random() * 60 + 40;
    const rotation = Math.random() * 360;
    const left = Math.random() * (window.innerWidth - size);
    const fallDuration = Math.random() * 3 + 2;
    
    // Применение рандомных стилей
    candy.style.width = `${size}px`;
    candy.style.height = `${size}px`;
    candy.style.position = 'absolute';
    candy.style.top = `-${size}px`;
    candy.style.left = `${left}px`;
    candy.style.transform = `rotate(${rotation}deg)`;
    candy.style.transition = `top ${fallDuration}s linear, opacity 0.3s ease`;
    candy.style.cursor = 'pointer';
    
    // Добавление конфеты в секцию
    eventSection.appendChild(candy);
    // Запуск анимации падения
    setTimeout(() => {
        candy.style.top = `${window.innerHeight}px`;
    }, 10);
    
    // Функция обработки клика
    function handleCandyClick() {
        // Удаляем обработчики сразу после первого клика
        candy.removeEventListener('click', handleCandyClick);
        candy.removeEventListener('touchstart', handleCandyClick);
        
        collected++;
        updateTotal();
        candy.style.opacity = '0';
        setTimeout(() => {
            candy.remove();
        }, 300);
    }
    
    // Добавляем обработчики
    candy.addEventListener('click', handleCandyClick);
    candy.addEventListener('touchstart', handleCandyClick);
    
    // Удаление конфет через некоторое время
    setTimeout(() => {
        if (candy.parentNode) {
            // Удаляем обработчики перед удалением конфеты
            candy.removeEventListener('click', handleCandyClick);
            candy.removeEventListener('touchstart', handleCandyClick);
            candy.style.opacity = '0';
            setTimeout(() => {
                candy.remove();
            }, 300);
        }
    }, (fallDuration + 1) * 1000);
}

// Функция для очистки всех конфет
function clearAllCandies() {
    const candies = document.querySelectorAll('.candy');
    candies.forEach(candy => {
        candy.remove();
    });
}

// При нажатии на кнопку "перейти" скрипт стартует, конфеты начинают падать
document.getElementById('event3').addEventListener('click', function() {
    collected = 0;
    updateTotal();
    clearAllCandies();
    // создание конфет каждые 0,5сек
    candyInterval = setInterval(createCandy, 500);
});

// При нажатии на кнопку "обратно" скрипт останавливается, конфеты пропадают
document.getElementById('backButton_3').addEventListener('click', function() {
    clearInterval(candyInterval);
    clearAllCandies();
});

updateTotal();

// Локация 4 "ДОЛИЛИНА ДЕСЕРТОВ"
//svg картинка торта
fetch('images/scake.svg')
.then(response => response.text())
.then(svg => {
    document.getElementById('svg-cake').innerHTML = svg;
});
// Элементы списка
document.addEventListener('DOMContentLoaded', function() {
    const points = [
        { id: 'point_1', target: '.duff', unlocked: true },
        { id: 'point_2', target: '.creamwhite', unlocked: false },
        { id: 'point_3', target: '.creampink', unlocked: false },
        { id: 'point_4', target: '.berries', unlocked: false },
        { id: 'point_5', target: '.plate', unlocked: false }
    ].map(item => {
        const element = document.getElementById(item.id);
        return { ...item, element };
    });

    points.forEach((point, index) => {
        if (!point.element) {
            console.error(`Элемент ${point.id} не найден!`);
            return;
        }

        if (!point.unlocked) {
            point.element.setAttribute('disabled', 'true');
        }

        point.element.addEventListener('click', function() {
            if (!point.unlocked) return;
            
            // Показываем целевые элементы
            document.querySelectorAll(point.target).forEach(el => {
                el.style.display = 'block';
            });
            // Запускаем функцию конфетти для последнего пункта
            if (index === 4) {
                startConfetti();
            }
            // Разблокируем следующий пункт
            if (index + 1 < points.length) {
                points[index + 1].unlocked = true;
                points[index + 1].element.removeAttribute('disabled');
            }
        });
    });
// Функция для конфетти
    function startConfetti() {
        const container = document.getElementById('confetti-container');
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '-10px';
            confetti.style.opacity = '0.8';
            // Анимация падения (уменьшаем высоту, чтобы конфетти не вылетали за секцию)
            const animationDuration = Math.random() * 3 + 2;
            confetti.style.animation = `fall ${animationDuration}s linear forwards`;
            container.appendChild(confetti);
            // Удаляем конфетти после анимации
            setTimeout(() => confetti.remove(), animationDuration * 1000);
        }
    }
});