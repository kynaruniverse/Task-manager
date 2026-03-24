// DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');
const taskCount = document.getElementById('taskCount');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        const span = document.createElement('span');
        span.className = `task-text ${task.completed ? 'completed' : ''}`;
        span.textContent = task.text;
        span.addEventListener('click', () => toggleComplete(index));
        
        const delBtn = document.createElement('button');
        delBtn.textContent = '✗';
        delBtn.className = 'delete-btn';
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTask(index);
        });
        
        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
    updateCount();
    saveToLocalStorage();
}

// Add new task
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;
    tasks.push({ text, completed: false });
    taskInput.value = '';
    renderTasks();
}

// Toggle completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Clear all tasks
function clearAll() {
    tasks = [];
    renderTasks();
}

// Update task count
function updateCount() {
    const remaining = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} left`;
}

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listeners
addBtn.addEventListener('click', addTask);
clearBtn.addEventListener('click', clearAll);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial render
renderTasks();