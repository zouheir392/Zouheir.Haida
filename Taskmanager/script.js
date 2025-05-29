let tasks = [];
let filterStatus = 'all';
let searchQuery = '';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const statusFilter = document.getElementById('status-filter');
const searchInput = document.getElementById('search-input');

function renderTasks() {
    taskList.innerHTML = '';
    let filteredTasks = tasks
        .filter(task => 
            (filterStatus === 'all' || task.status === filterStatus) &&
            task.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    filteredTasks.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task-item';
