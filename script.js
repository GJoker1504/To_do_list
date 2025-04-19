// ===== ОСНОВНЫЕ ЭЛЕМЕНТЫ DOM =====
// Получаем кнопку добавления задачи
const addTaskButton = document.querySelector('#addTaskButton');
// Получаем поле ввода задачи
const taskInput = document.querySelector('#taskInput');
// Получаем контейнер для списка задач
const taskList = document.querySelector('#taskList');
// Получаем кнопку очистки выполненных задач
const clearCompleted = document.querySelector('#clearCompleted');

// ===== ЭЛЕМЕНТЫ ФИЛЬТРАЦИИ =====
// Получаем кнопки фильтров
const showAll = document.querySelector('#showAll');
const showActive = document.querySelector('#showActive');
const showCompleted = document.querySelector('#showCompleted');

// Текущий активный фильтр (по умолчанию "Все")
let currentFilter = 'all';

// ===== ЗАГРУЗКА ЗАДАЧ ПРИ СТАРТЕ =====
// Этот код выполняется при полной загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем задачи из localStorage или используем пустой массив
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Для каждой сохраненной задачи создаем элемент в DOM
    savedTasks.forEach(task => {
        createTaskElement(task.text, task.id, task.completed);
    });
    // Применяем фильтр после загрузки задач
    applyFilter();
    // Устанавливаем активным фильтр "Все"
    setActiveFilter(showAll);
});

// ===== ФУНКЦИЯ СОХРАНЕНИЯ ЗАДАЧ =====
// Сохраняет текущее состояние всех задач в localStorage
function saveTasks() {
    const tasks = [];
    // Перебираем все элементы задач на странице
    document.querySelectorAll('.taskBlock').forEach(taskElement => {
        // Собираем данные каждой задачи
        tasks.push({
            id: taskElement.dataset.id,         // Уникальный идентификатор
            text: taskElement.querySelector('span').innerText, // Текст задачи
            completed: taskElement.querySelector('span').classList.contains('completed') // Статус
        });
    });
    // Сохраняем в localStorage в формате JSON
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Обновляем отображение согласно текущему фильтру
    applyFilter();
}

// ===== СОЗДАНИЕ ЭЛЕМЕНТА ЗАДАЧИ =====
// Создает DOM-элемент для новой задачи
function createTaskElement(taskText, taskId = null, isCompleted = false) {
    // Создаем контейнер для задачи
    const listItem = document.createElement('div');
    listItem.classList.add('taskBlock');  // Добавляем класс для стилизации
    
    // Генерируем уникальный ID (используем переданный или создаем новый)
    const id = taskId || Date.now() + Math.floor(Math.random() * 1000);
    listItem.dataset.id = id;  // Сохраняем ID в data-атрибут

    // Создаем элемент для текста задачи
    const taskTextElement = document.createElement('span');
    taskTextElement.innerText = taskText;
    // Если задача завершена, добавляем класс для зачеркивания
    if (isCompleted) {
        taskTextElement.classList.add('completed');
    }

    // ===== СОЗДАЕМ КНОПКИ УПРАВЛЕНИЯ =====
    // Кнопка подтверждения выполнения
    const confirmButton = document.createElement('button');
    confirmButton.innerHTML = '✔️';  // Используем эмодзи
    confirmButton.classList.add('confirmButton');

    // Кнопка удаления задачи
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '❌';  // Используем эмодзи
    deleteButton.classList.add('delete-button');

    // ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
    // Обработчик для отметки выполнения задачи
    confirmButton.addEventListener('click', function() {
        // Переключаем класс completed (зачеркивание)
        taskTextElement.classList.toggle('completed');
        // Сохраняем изменения
        saveTasks();
    });

    // Обработчик для удаления задачи
    deleteButton.addEventListener('click', function() {
        listItem.remove();  // Удаляем элемент из DOM
        saveTasks();       // Сохраняем изменения
    });

    // ===== ДОБАВЛЯЕМ ЭЛЕМЕНТЫ В DOM =====
    listItem.append(taskTextElement, confirmButton, deleteButton);
    taskList.append(listItem);
}

// ===== ФИЛЬТРАЦИЯ ЗАДАЧ =====
// Применяет текущий фильтр к списку задач
function applyFilter() {
    const tasks = document.querySelectorAll('.taskBlock');
    tasks.forEach(task => {
        const isCompleted = task.querySelector('span').classList.contains('completed');
        
        // В зависимости от текущего фильтра показываем/скрываем задачи
        switch(currentFilter) {
            case 'active':
                // Показываем только активные (не выполненные) задачи
                task.style.display = isCompleted ? 'none' : 'flex';
                break;
            case 'completed':
                // Показываем только выполненные задачи
                task.style.display = isCompleted ? 'flex' : 'none';
                break;
            default:
                // Показываем все задачи
                task.style.display = 'flex';
        }
    });
}

// Устанавливает активный фильтр (визуальное выделение кнопки)
function setActiveFilter(activeButton) {
    // Убираем выделение со всех кнопок фильтров
    [showAll, showActive, showCompleted].forEach(btn => {
        btn.classList.remove('active');
    });
    // Добавляем класс active к выбранной кнопке
    activeButton.classList.add('active');
}

// ===== ДОБАВЛЕНИЕ НОВОЙ ЗАДАЧИ =====
// Обработчик клика по кнопке добавления
addTaskButton.addEventListener('click', function() {
    // Получаем текст задачи, удаляя лишние пробелы
    const taskText = taskInput.value.trim();
    // Проверяем, что поле не пустое
    if (taskText !== '') {
        createTaskElement(taskText);  // Создаем элемент задачи
        taskInput.value = '';         // Очищаем поле ввода
        saveTasks();                  // Сохраняем изменения
    }
});

// ===== ОБРАБОТКА НАЖАТИЯ ENTER =====
// Добавляем возможность добавлять задачи по нажатию Enter
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTaskButton.click();  // Имитируем клик по кнопке добавления
    }
});

// ===== ОЧИСТКА ВЫПОЛНЕННЫХ ЗАДАЧ =====
// Обработчик для кнопки очистки выполненных задач
clearCompleted.addEventListener('click', function() {
    // Находим все выполненные задачи
    document.querySelectorAll('.taskBlock .completed').forEach(completedTask => {
        // Удаляем родительский элемент задачи
        completedTask.closest('.taskBlock').remove();
    });
    // Сохраняем изменения
    saveTasks();
});

// ===== ОБРАБОТЧИКИ ФИЛЬТРОВ =====
// Показываем все задачи
showAll.addEventListener('click', function() {
    currentFilter = 'all';
    applyFilter();
    setActiveFilter(showAll);
});

// Показываем только активные задачи
showActive.addEventListener('click', function() {
    currentFilter = 'active';
    applyFilter();
    setActiveFilter(showActive);
});

// Показываем только выполненные задачи
showCompleted.addEventListener('click', function() {
    currentFilter = 'completed';
    applyFilter();
    setActiveFilter(showCompleted);
});