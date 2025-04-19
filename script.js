const addTaskButton = document.querySelector('#addTaskButton');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');

const clearCompleted = document.querySelector('#clearCompleted');

taskInput.addEventListener('input', function(event) {
    return event.target.value
})

addTaskButton.addEventListener('click', function(event) {
    const taskText = taskInput.value// Получаю значение из поля ввода
    if (taskText !== '') {
        // Создаю новый элемент <div>(listItem)
        const listItem = document.createElement('div');
        // add создает class taskBlock
        listItem.classList.add('taskBlock') ;
        //Создаём элемент для текста задачи(span)
        const taskTextElement = document.createElement('span');
        taskTextElement.innerText = taskText;
        //создаю кнопку подтверждения
        const confirmButton = document.createElement('button');
        //добавляем ico(тут я использовал эмодзи)
        confirmButton.innerHTML = '✔️';
        //Добавлю класс для кнопки confirmButton 
        confirmButton.classList.add('confirmButton')
        //создаем крест по аналогии
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '❌';
        deleteButton.classList.add('delete-button'); 
        //обработчики событий
        
        confirmButton.addEventListener('click', function() {
            taskTextElement.classList.toggle('completed');
        });

        deleteButton.addEventListener('click', function() {
            listItem.remove(); // Удаляем задачу
            });
        
        // задаю текстовое содержимое элемента(диву)
        //listItem.innerText = taskText
        // классу taskList (у меня там ul) добавляю в него эл.
        listItem.append(taskTextElement);
        listItem.append(confirmButton);
        listItem.append(deleteButton);
        taskList.append(listItem);
        // очищаю инпут
        taskInput.value = '';
    }
    
})

clearCompleted.addEventListener('click', function() {
    // Находим все выполненные задачи
    const completedTasks = document.querySelectorAll('.taskBlock .completed');
    console.log(completedTasks)
    completedTasks.forEach(task => {
        task.closest('.taskBlock').remove(); // Удаляем родительский блок задачи
    });
    
});




