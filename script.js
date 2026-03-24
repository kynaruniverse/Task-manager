// DOM elements
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const dueDateInput = document.getElementById('dueDateInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterStatus = document.getElementById('filterStatus');
const filterPriority = document.getElementById('filterPriority');
const sortDueBtn = document.getElementById('sortDueBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const taskCount = document.getElementById('taskCount');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Helper: save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks based on current filters and sorting
function renderTasks() {
    let filtered = [...tasks];
    // Filter by status
    const status = filterStatus.value;
    if (status === 'active') filtered = filtered.filter(t => !t.completed);
    else if (status === 'completed') filtered = filtered.filter(t => t.completed);
    // Filter by priority
    const priority = filterPriority.value;
    if (priority !== 'all') filtered = filtered.filter(t => t.priority === priority);
    
    // Sort by due date if flag is set (we'll add a sort button that reorders the array)
    // For now, we'll sort based on the current sort mode (we'll add a variable)
    if (sortDueBtn.classList.contains('active')) {
        filtered.sort((a, b) => {
            if (!a.dueDate && !b.dueDate) return 0;
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }
    
    taskList.innerHTML = '';
    filtered.forEach((task, originalIndex) => {
        // Find original index for delete/update (to keep tasks array order stable)
        const idx = tasks.findIndex(t => t.id === task.id);
        const li = document.createElement('li');
        li.className = 'task-item';
        
        const leftDiv = document.createElement('div');
        leftDiv.className = 'task-left';
        leftDiv.addEventListener('click', () => toggleComplete(idx));
        
        const textSpan = document.createElement('span');
        textSpan.className = `task-text ${task.completed ? 'completed' : ''}`;
        textSpan.textContent = task.text;
        
        leftDiv.appendChild(textSpan);
        
        const metaDiv = document.createElement('div');
        metaDiv.className = 'task-meta';
        
        const prioritySpan = document.createElement('span');
        prioritySpan.className = `priority ${task.priority}`;
        prioritySpan.textContent = task.priority === 'low' ? '🔵 Low' : (task.priority === 'medium' ? '🟡 Medium' : '🔴 High');
        
        metaDiv.appendChild(prioritySpan);
        
        if (task.dueDate) {
            const dueSpan = document.createElement('span');
            dueSpan.className = 'due-date';
            const dateObj = new Date(task.dueDate);
            dueSpan.textContent = dateObj.toLocaleDateString();
            metaDiv.appendChild(dueSpan);
        }
        
        const delBtn = document.createElement('button');
        delBtn.textContent = '✗';
        delBtn.className = 'delete-btn';
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTask(idx);
        });
        
        li.appendChild(leftDiv);
        li.appendChild(metaDiv);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
    updateCount();
}

// Add new task
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        priority: priority,
        dueDate: dueDate || null
    };
    tasks.push(newTask);
    taskInput.value = '';
    dueDateInput.value = '';
    prioritySelect.value = 'medium';
    saveToLocalStorage();
    renderTasks();
}

// Toggle completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveToLocalStorage();
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveToLocalStorage();
    renderTasks();
}

// Clear all tasks
function clearAll() {
    tasks = [];
    saveToLocalStorage();
    renderTasks();
}

// Update task count (active tasks)
function updateCount() {
    const remaining = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${remaining} active task${remaining !== 1 ? 's' : ''}`;
}

// Sort by due date toggle
let sortByDue = false;
function toggleSortByDue() {
    sortByDue = !sortByDue;
    if (sortByDue) {
        sortDueBtn.classList.add('active');
        sortDueBtn.style.background = '#facc15';
        sortDueBtn.style.color = '#0f172a';
    } else {
        sortDueBtn.classList.remove('active');
        sortDueBtn.style.background = '#334155';
        sortDueBtn.style.color = '#f1f5f9';
    }
    renderTasks();
}

// Event listeners
addBtn.addEventListener('click', addTask);
clearAllBtn.addEventListener('click', clearAll);
filterStatus.addEventListener('change', renderTasks);
filterPriority.addEventListener('change', renderTasks);
sortDueBtn.addEventListener('click', toggleSortByDue);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial render
renderTasks();