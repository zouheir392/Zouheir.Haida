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
    /**
     * Filtra l'array di task in base allo stato selezionato e alla query di ricerca.
     */
    let filteredTasks = tasks
        .filter(task => 
            (filterStatus === 'all' || task.status === filterStatus) &&
            task.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    filteredTasks.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task-item';
 /**
 * Renderizza la lista dei task filtrati e aggiorna il DOM con le relative azioni di modifica, eliminazione e cambio stato.
 */
        if (task.editing) {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = task.name;
            input.className = 'task-name';
            li.appendChild(input);

            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Salva';
            saveBtn.className = 'save-btn';
            saveBtn.onclick = () => {
                task.name = input.value.trim() || task.name;
                task.editing = false;
                renderTasks();
            };
            li.appendChild(saveBtn);

            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Annulla';
            cancelBtn.className = 'cancel-btn';
            cancelBtn.onclick = () => {
                task.editing = false;
                renderTasks();
            };
            li.appendChild(cancelBtn);
        } else {
            const span = document.createElement('span');
            span.textContent = task.name;
            span.className = 'task-name' + (task.status === 'done' ? ' done' : '');
            li.appendChild(span);

            
            // Stato
            // codice crea un menu a tendina (select) per ogni task che permette di cambiare 
            // il suo stato (Da fare, In corso, Completata). Quando l’utente seleziona uno stato diverso,
            //  aggiorna il task e ricarica la lista.

            const statusSelect = document.createElement('select');
            ['todo', 'doing', 'done'].forEach(st => {
                const opt = document.createElement('option');
                opt.value = st;
                opt.textContent = st === 'todo' ? 'Da fare' : st === 'doing' ? 'In corso' : 'Completata';
                if (task.status === st) opt.selected = true;
                statusSelect.appendChild(opt);
            });
            statusSelect.onchange = () => {
                task.status = statusSelect.value;
                renderTasks();
            };
            li.appendChild(statusSelect);

            
            // Azioni
            const actions = document.createElement('span');
            actions.className = 'task-actions';
            // codice crea i pulsanti "Modifica" ed "Elimina" per ogni task nella lista, 
            // assegnando loro le funzioni per modificare o eliminare il task quando vengono cliccati.
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Modifica';
            editBtn.className = 'edit-btn';
            editBtn.onclick = () => {
                task.editing = true;
                renderTasks();
            };
            actions.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Elimina';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = () => {
                tasks.splice(tasks.indexOf(task), 1);
                renderTasks();
            };
            actions.appendChild(deleteBtn);

            li.appendChild(actions);
        }

        taskList.appendChild(li);
    });
}


taskForm.onsubmit = e => {
    e.preventDefault();
    const name = taskInput.value.trim();
    if (name) {
        tasks.push({ name, status: 'todo', editing: false });
        taskInput.value = '';
        renderTasks();
    }
};

statusFilter.onchange = () => {
    filterStatus = statusFilter.value;
    renderTasks();
};

searchInput.oninput = () => {
    searchQuery = searchInput.value;
    renderTasks();
};

// Prima visualizzazione
renderTasks();




