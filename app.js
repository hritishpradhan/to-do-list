document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("taskInput").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById("taskList");

        const li = document.createElement("li");
        li.innerHTML = `
            ${taskText}
            <button onclick="removeTask(this)">Delete</button>
        `;

        taskList.appendChild(li);

        saveTask(taskText);

        taskInput.value = "";
    }
}

function removeTask(button) {
    const taskText = button.parentNode.firstChild.nodeValue.trim();
    button.parentNode.remove();

    removeTaskFromStorage(taskText);
}

function saveTask(taskText) {
    let tasks = getTasksFromStorage();
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromStorage(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = getTasksFromStorage();

    tasks.forEach(taskText => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${taskText}
            <button onclick="removeTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
    });
}
