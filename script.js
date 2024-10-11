
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const completedList = document.getElementById('completed-list');
let tasks = [];

function renderTasks() {
    taskList.innerHTML = '';
    completedList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `${task.priority}-priority`;
        if (task.completed) {
            li.classList.add('completed');
        }
        if (!task.completed && isNearDeadline(task.deadline)) {
            li.classList.add('near-deadline');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(index));

        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        taskContent.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Deadline: ${task.deadline}</p>
            <p>Priority: ${task.priority}</p>
            <p>Category: ${task.category}</p>
        `;


        li.appendChild(checkbox);
        li.appendChild(taskContent);

        if (task.completed) {
            completedList.appendChild(li);
        } else {
            taskList.appendChild(li);
        }
    });
}
function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);

}

function isNearDeadline(deadline) {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 3 && daysDiff > 0;
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        deadline: document.getElementById('deadline').value,
        priority: document.getElementById('priority').value,
        category: document.getElementById('category').value,
        completed: false
    };
    tasks.push(newTask);
    renderTasks();
    showNotification("Your task is added successfully!");
    taskForm.reset();
});

renderTasks();