// Состояние CLI
const commands = {
    help: {
        desc: 'Показать список команд',
        execute: () => addOutput(`
Доступные команды:
<span class="highlight">help</span> - эта справка
<span class="highlight">start</span> - запустить цифровой организм
<span class="highlight">about</span> - информация обо мне
<span class="highlight">projects</span> - мои проекты
<span class="highlight">skills</span> - мои навыки
<span class="highlight">contact</span> - контакты
<span class="highlight">clear</span> - очистить терминал
<span class="highlight">secret</span> - секретная команда
        `)
    },
    
    start: {
        desc: 'Запустить цифровой организм',
        execute: () => {
            addOutput('Запускаю цифровой организм...');
            setTimeout(() => {
                cliContainer.classList.add('hidden');
                labContainer.classList.add('active');
                initOrganism();
            }, 800);
        }
    },
    
    about: {
        desc: 'Информация обо мне',
        execute: () => addOutput(`
Иван | Фронтенд-инженер
Создаю пульсирующие интерфейсы и оживляю макеты.
Верю, что код — это поэзия, а интерфейс — это история.
Опыт: 5+ лет в веб-разработке.
Философия: минимализм, перформанс, user experience.
        `)
    },
    
    projects: {
        desc: 'Мои проекты',
        execute: () => addOutput(`
1. <span class="highlight">Интерактивная 3D галерея</span> - WebGL галерея с физикой элементов.
2. <span class="highlight">Библиотека ivanko-engine</span> - микро-библиотека для игровых интерфейсов.
3. <span class="highlight">Цифровой организм</span> - этот сайт (генетический алгоритм визуализации).
Введите <span class="highlight">start</span> для просмотра деталей.
        `)
    },
    
    skills: {
        desc: 'Мои навыки',
        execute: () => addOutput(`
Основной стек:
• React / TypeScript / Next.js
• Three.js / WebGL / Canvas
• Node.js / Express
• Git / CI-CD
• Figma / UI-UX дизайн

Специализация:
• Сложная фронтенд-логика
• 3D графика в браузере
• Оптимизация производительности
        `)
    },
    
    contact: {
        desc: 'Контактная информация',
        execute: () => addOutput(`
Свяжитесь со мной:
• Email: ivan@example.com (кликните для копирования)
• GitHub: https://github.com/Kivanort
• Telegram: @Kivanort
Введите <span class="highlight">start</span> для удобного интерфейса.
        `)
    },
    
    clear: {
        desc: 'Очистить терминал',
        execute: () => terminalOutput.innerHTML = ''
    },
    
    secret: {
        desc: 'Секретная команда',
        execute: () => addOutput(`
Найдена секретная команда! 🎉
Попробуй:
1. Кликни на секретную дверь в правом нижнем углу (зажми Ctrl+Shift)
2. Нажми F12 для режима отладки
3. Наведи на навыки в лаборатории
        `)
    }
};
