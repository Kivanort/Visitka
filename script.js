document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const cliContainer = document.getElementById('cli-container');
    const labContainer = document.getElementById('lab-container');
    const commandInput = document.getElementById('command-input');
    const terminalOutput = document.getElementById('terminal-output');
    const backToCliBtn = document.getElementById('back-to-cli');
    const secretDoor = document.getElementById('secret-door');
    const debugOverlay = document.getElementById('debug-overlay');
    const closeDebugBtn = document.getElementById('close-debug');
    const emailLink = document.getElementById('email-link');
    const projectButtons = document.querySelectorAll('.view-project');
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
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
• GitHub: https://github.com
• Telegram: @ivan_frontend
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
    
    // CLI функции
    function addOutput(text) {
        const outputLine = document.createElement('div');
        outputLine.className = 'output-line';
        outputLine.innerHTML = `<span class="output">${text}</span>`;
        terminalOutput.appendChild(outputLine);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    function processCommand(cmd) {
        addOutput(`<span class="prompt">ivan@portfolio:~$</span> <span class="command">${cmd}</span>`);
        
        if (commands[cmd]) {
            commands[cmd].execute();
        } else if (cmd.trim() !== '') {
            addOutput(`Команда не найдена: ${cmd}. Введите <span class="highlight">help</span> для списка команд.`);
        }
    }
    
    // Canvas организм
    function initOrganism() {
        const canvas = document.getElementById('organism-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const cells = [];
        const techs = ['React', 'TS', 'JS', 'CSS', 'Node', 'WebGL', 'Git', 'Three'];
        
        // Создаем клетки
        for (let i = 0; i < 30; i++) {
            cells.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 15 + 10,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                tech: techs[Math.floor(Math.random() * techs.length)],
                growth: 0,
                color: `hsl(${Math.random() * 60 + 120}, 100%, 50%)`
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Рисуем связи
            ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < cells.length; i++) {
                for (let j = i + 1; j < cells.length; j++) {
                    const dx = cells[i].x - cells[j].x;
                    const dy = cells[i].y - cells[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(cells[i].x, cells[i].y);
                        ctx.lineTo(cells[j].x, cells[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            // Рисуем клетки
            cells.forEach(cell => {
                // Движение
                cell.x += cell.speedX;
                cell.y += cell.speedY;
                
                // Отскок от краев
                if (cell.x < cell.radius || cell.x > canvas.width - cell.radius) cell.speedX *= -1;
                if (cell.y < cell.radius || cell.y > canvas.height - cell.radius) cell.speedY *= -1;
                
                // Рисуем клетку
                ctx.beginPath();
                ctx.arc(cell.x, cell.y, cell.radius + cell.growth, 0, Math.PI * 2);
                ctx.fillStyle = cell.color;
                ctx.fill();
                
                // Текст технологии
                ctx.fillStyle = '#000';
                ctx.font = `${Math.max(10, cell.radius / 2)}px JetBrains Mono`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(cell.tech, cell.x, cell.y);
                
                // Плавное изменение роста
                cell.growth = Math.max(0, cell.growth - 0.1);
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        // Взаимодействие с клетками
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            cells.forEach(cell => {
                const dx = cell.x - x;
                const dy = cell.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < cell.radius + 20) {
                    cell.growth = Math.min(10, cell.growth + 0.5);
                }
            });
        });
        
        // Ресайз
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // События
    commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cmd = commandInput.value.trim().toLowerCase();
            processCommand(cmd);
            commandInput.value = '';
        }
    });
    
    backToCliBtn.addEventListener('click', () => {
        labContainer.classList.remove('active');
        cliContainer.classList.remove('hidden');
        addOutput('Возврат в терминал... Введите <span class="highlight">help</span> для списка команд.');
    });
    
    // Секретная дверь
    let secretClick = false;
    secretDoor.addEventListener('click', (e) => {
        if (e.ctrlKey && e.shiftKey) {
            addOutput('🎮 Секретная дверь открыта! Запускаю мини-игру...');
            
            // Простая игра
            alert('🎯 Мини-игра: Угадай число от 1 до 10!');
            const secretNumber = Math.floor(Math.random() * 10) + 1;
            const guess = prompt('Введите число от 1 до 10:');
            
            if (parseInt(guess) === secretNumber) {
                addOutput('🎉 Победа! Вы угадали число!');
                addOutput('Награда: вы нашли скрытую команду! Введите <span class="highlight">secret</span>');
            } else {
                addOutput(`😞 Не угадали. Было число ${secretNumber}. Попробуйте снова!`);
            }
            
            secretClick = true;
        } else if (!secretClick) {
            addOutput('Подсказка: зажмите Ctrl+Shift и кликните на дверь для секрета');
        }
    });
    
    // Режим отладки (F12)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12') {
            e.preventDefault();
            debugOverlay.style.display = 'flex';
        }
    });
    
    closeDebugBtn.addEventListener('click', () => {
        debugOverlay.style.display = 'none';
    });
    
    // Копирование email
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText('ivan@example.com').then(() => {
            const originalText = emailLink.innerHTML;
            emailLink.innerHTML = '<i class="fas fa-check"></i> Email скопирован!';
            emailLink.style.color = '#00ff00';
            
            setTimeout(() => {
                emailLink.innerHTML = originalText;
                emailLink.style.color = '';
            }, 2000);
        });
    });
    
    // Проекты модалки
    projectButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const project = this.closest('.project');
            const title = project.querySelector('h3').textContent;
            
            modalTitle.textContent = title;
            
            if (title.includes('3D галерея')) {
                modalBody.innerHTML = `
                    <p><strong>Технологии:</strong> Three.js, WebGL, React Three Fiber, Blender</p>
                    <p><strong>Особенность:</strong> Оптимизировал рендеринг, что увеличило FPS с 40 до 60</p>
                    <p><strong>Ссылка:</strong> <a href="#" style="color:#00ff9d">github.com/ivan/3d-gallery</a></p>
                    <div style="margin-top:20px; padding:15px; background:#222; border-radius:8px;">
                        <p>🎨 В этом проекте я реализовал:</p>
                        <ul style="margin-left:20px; margin-top:10px;">
                            <li>Кастомный шейдер для частиц</li>
                            <li>LOD-систему для сложных моделей</li>
                            <li>Физику на основе Cannon.js</li>
                        </ul>
                    </div>
                `;
            } else {
                modalBody.innerHTML = `
                    <p><strong>Технологии:</strong> TypeScript, Vite, Canvas API</p>
                    <p><strong>Особенность:</strong> Вес библиотеки всего 8KB gzipped</p>
                    <p><strong>Ссылка:</strong> <a href="#" style="color:#00ff9d">github.com/ivan/ivanko-engine</a></p>
                    <div style="margin-top:20px; padding:15px; background:#222; border-radius:8px;">
                        <pre style="color:#00ff9d; overflow:auto;">
// Пример использования:
import { Engine, Entity } from 'ivanko-engine';

const game = new Engine('#canvas');
const player = new Entity({ x: 100, y: 100 });
player.addComponent('sprite', './character.png');
game.addEntity(player);</pre>
                    </div>
                `;
            }
            
            modal.classList.add('active');
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Навыки hover эффект
    document.querySelectorAll('.skill-cell').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            const skillName = this.dataset.skill;
            this.textContent = `${skillName}++`;
            this.style.background = '#ff00ff';
            this.style.color = '#000';
        });
        
        skill.addEventListener('mouseleave', function() {
            const skillName = this.dataset.skill;
            this.textContent = skillName.charAt(0).toUpperCase() + skillName.slice(1);
            this.style.background = '';
            this.style.color = '';
        });
    });
    
    // Автозапуск
    setTimeout(() => {
        commandInput.focus();
    }, 100);
});
