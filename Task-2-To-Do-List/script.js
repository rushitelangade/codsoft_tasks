/* =========================================
   TASKFLOW - PREMIUM TODO APP
   ========================================= */

// =========================================
// DOM ELEMENTS
// =========================================

const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("categoryInput");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const totalTasks =
    document.getElementById("totalTasks");

const pendingTasks =
    document.getElementById("pendingTasks");

const completedTasks =
    document.getElementById("completedTasks");

const progressPercent =
    document.getElementById("progressPercent");

const circlePercent =
    document.getElementById("circlePercent");

const progressCircle =
    document.getElementById("progressCircle");

const currentDate =
    document.getElementById("currentDate");

const themeBtn =
    document.getElementById("themeBtn");


// =========================================
// MODAL ELEMENTS
// =========================================

const editModal =
    document.getElementById("editModal");

const closeModal =
    document.getElementById("closeModal");

const editTaskId =
    document.getElementById("editTaskId");

const editTaskTitle =
    document.getElementById("editTaskTitle");

const editCategory =
    document.getElementById("editCategory");

const editPriority =
    document.getElementById("editPriority");

const editDueDate =
    document.getElementById("editDueDate");

const saveEditBtn =
    document.getElementById("saveEditBtn");


const deleteModal =
    document.getElementById("deleteModal");

const cancelDelete =
    document.getElementById("cancelDelete");

const confirmDelete =
    document.getElementById("confirmDelete");

const clearCompletedBtn =
    document.getElementById("clearCompletedBtn");


// =========================================
// TOAST
// =========================================

const toast =
    document.getElementById("toast");

const toastIcon =
    document.getElementById("toastIcon");

const toastMessage =
    document.getElementById("toastMessage");


// =========================================
// STORAGE
// =========================================

const STORAGE_KEY =
    "taskflow_tasks_v2";

const THEME_KEY =
    "taskflow_theme_v2";


// =========================================
// DATA
// =========================================

let tasks =
    JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];

let currentFilter = "all";

let taskToDelete = null;


// =========================================
// SAVE TASKS
// =========================================

function saveTasks() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );

}


// =========================================
// TODAY'S DATE
// =========================================

function showCurrentDate() {

    const today = new Date();

    currentDate.textContent =
        today.toLocaleDateString(
            "en-IN",
            {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

}


// =========================================
// GET LOCAL DATE
// =========================================

function getLocalDate() {

    const date = new Date();

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


// =========================================
// FORMAT DATE
// =========================================

function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    const date =
        new Date(
            `${dateString}T00:00:00`
        );

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


// =========================================
// DATE STATUS
// =========================================

function getDateStatus(task) {

    if (!task.dueDate) {
        return null;
    }

    if (task.completed) {
        return "normal";
    }

    const today =
        getLocalDate();

    if (task.dueDate < today) {
        return "overdue";
    }

    if (task.dueDate === today) {
        return "today";
    }

    return "normal";

}


// =========================================
// GENERATE ID
// =========================================

function generateId() {

    return Date.now() +
        Math.random()
            .toString(16)
            .slice(2);

}


// =========================================
// ADD TASK
// =========================================

function addTask() {

    const title =
        taskInput.value.trim();

    if (!title) {

        showToast(
            "Please enter a task name.",
            "error"
        );

        taskInput.focus();

        return;
    }


    const newTask = {

        id: generateId(),

        title: title,

        category:
            categoryInput.value,

        priority:
            priorityInput.value,

        dueDate:
            dueDateInput.value,

        completed: false,

        createdAt:
            new Date().toISOString()

    };


    tasks.unshift(newTask);

    saveTasks();

    renderTasks();

    updateStats();

    clearTaskForm();

    showToast(
        "Task added successfully!",
        "success"
    );

}


// =========================================
// CLEAR FORM
// =========================================

function clearTaskForm() {

    taskInput.value = "";

    categoryInput.value =
        "Personal";

    priorityInput.value =
        "Medium";

    dueDateInput.value = "";

    taskInput.focus();

}


// =========================================
// TOGGLE TASK
// =========================================

function toggleTask(id) {

    const task =
        tasks.find(
            item => item.id === id
        );

    if (!task) {
        return;
    }

    task.completed =
        !task.completed;

    saveTasks();

    renderTasks();

    updateStats();

    if (task.completed) {

        showToast(
            "Task completed! 🎉",
            "success"
        );

    } else {

        showToast(
            "Task moved back to pending.",
            "success"
        );

    }

}


// =========================================
// OPEN EDIT MODAL
// =========================================

function openEditModal(id) {

    const task =
        tasks.find(
            item => item.id === id
        );

    if (!task) {
        return;
    }

    editTaskId.value =
        task.id;

    editTaskTitle.value =
        task.title;

    editCategory.value =
        task.category;

    editPriority.value =
        task.priority;

    editDueDate.value =
        task.dueDate || "";

    editModal.classList.add("show");

    setTimeout(() => {

        editTaskTitle.focus();

    }, 100);

}


// =========================================
// CLOSE EDIT MODAL
// =========================================

function closeEditModal() {

    editModal.classList.remove("show");

}


// =========================================
// SAVE EDIT
// =========================================

function saveEditedTask() {

    const id =
        editTaskId.value;

    const title =
        editTaskTitle.value.trim();

    if (!title) {

        showToast(
            "Task name cannot be empty.",
            "error"
        );

        editTaskTitle.focus();

        return;
    }


    const task =
        tasks.find(
            item =>
                String(item.id) ===
                String(id)
        );

    if (!task) {
        return;
    }


    task.title =
        title;

    task.category =
        editCategory.value;

    task.priority =
        editPriority.value;

    task.dueDate =
        editDueDate.value;


    saveTasks();

    renderTasks();

    updateStats();

    closeEditModal();

    showToast(
        "Task updated successfully!",
        "success"
    );

}


// =========================================
// OPEN DELETE MODAL
// =========================================

function openDeleteModal(id) {

    taskToDelete = id;

    deleteModal.classList.add("show");

}


// =========================================
// CLOSE DELETE MODAL
// =========================================

function closeDeleteModal() {

    taskToDelete = null;

    deleteModal.classList.remove("show");

}


// =========================================
// CONFIRM DELETE
// =========================================

function deleteTask() {

    if (taskToDelete === null) {
        return;
    }


    tasks =
        tasks.filter(
            task =>
                String(task.id) !==
                String(taskToDelete)
        );


    saveTasks();

    renderTasks();

    updateStats();

    closeDeleteModal();

    showToast(
        "Task deleted successfully.",
        "success"
    );

}


// =========================================
// CLEAR COMPLETED
// =========================================

function clearCompleted() {

    const completedCount =
        tasks.filter(
            task => task.completed
        ).length;


    if (completedCount === 0) {

        showToast(
            "There are no completed tasks.",
            "error"
        );

        return;
    }


    const confirmed =
        confirm(
            `Delete ${completedCount} completed task(s)?`
        );


    if (!confirmed) {
        return;
    }


    tasks =
        tasks.filter(
            task => !task.completed
        );


    saveTasks();

    renderTasks();

    updateStats();

    showToast(
        "Completed tasks cleared.",
        "success"
    );

}


// =========================================
// SEARCH + FILTER
// =========================================

function getFilteredTasks() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    return tasks.filter(task => {

        const matchesSearch =
            task.title
                .toLowerCase()
                .includes(search) ||

            task.category
                .toLowerCase()
                .includes(search) ||

            task.priority
                .toLowerCase()
                .includes(search);


        if (!matchesSearch) {
            return false;
        }


        if (
            currentFilter ===
            "pending"
        ) {

            return !task.completed;

        }


        if (
            currentFilter ===
            "completed"
        ) {

            return task.completed;

        }


        return true;

    });

}


// =========================================
// RENDER TASKS
// =========================================

function renderTasks() {

    const filteredTasks =
        getFilteredTasks();


    taskList.innerHTML = "";


    if (
        filteredTasks.length === 0
    ) {

        emptyState.style.display =
            "block";

        return;

    }


    emptyState.style.display =
        "none";


    filteredTasks.forEach(
        (task, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "task-card";


            if (task.completed) {

                card.classList.add(
                    "completed"
                );

            }


            const priorityClass =
                `priority-${task.priority.toLowerCase()}`;


            const dateStatus =
                getDateStatus(task);


            let dateBadge = "";


            if (task.dueDate) {

                let dateText =
                    formatDate(
                        task.dueDate
                    );

                let dateClass = "";


                if (
                    dateStatus ===
                    "overdue"
                ) {

                    dateText =
                        `Overdue · ${dateText}`;

                    dateClass =
                        "overdue";

                }


                if (
                    dateStatus ===
                    "today"
                ) {

                    dateText =
                        `Today · ${dateText}`;

                    dateClass =
                        "today-date";

                }


                dateBadge = `

                    <span class="badge ${dateClass}">

                        <i class="fa-regular fa-calendar"></i>

                        ${dateText}

                    </span>

                `;

            }


            card.innerHTML = `

                <button
                    class="task-check"
                    title="${
                        task.completed
                            ? "Mark as pending"
                            : "Mark as completed"
                    }"
                ></button>


                <div class="task-info">

                    <div class="task-title">
                        ${escapeHTML(task.title)}
                    </div>


                    <div class="task-meta">

                        <span class="badge">

                            <i class="fa-solid fa-folder"></i>

                            ${escapeHTML(
                                task.category
                            )}

                        </span>


                        <span
                            class="badge ${priorityClass}"
                        >

                            <i class="fa-solid fa-bolt"></i>

                            ${task.priority}

                        </span>


                        ${dateBadge}

                    </div>

                </div>


                <div class="task-actions">

                    <button
                        class="action-btn edit-btn"
                        title="Edit task"
                    >
                        <i class="fa-solid fa-pen"></i>
                    </button>


                    <button
                        class="action-btn delete-btn"
                        title="Delete task"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            `;


            const checkButton =
                card.querySelector(
                    ".task-check"
                );


            checkButton.addEventListener(
                "click",
                () => {

                    toggleTask(task.id);

                }
            );


            const editButton =
                card.querySelector(
                    ".edit-btn"
                );


            editButton.addEventListener(
                "click",
                () => {

                    openEditModal(
                        task.id
                    );

                }
            );


            const deleteButton =
                card.querySelector(
                    ".delete-btn"
                );


            deleteButton.addEventListener(
                "click",
                () => {

                    openDeleteModal(
                        task.id
                    );

                }
            );


            card.style.animationDelay =
                `${index * 0.035}s`;


            taskList.appendChild(card);

        }
    );

}


// =========================================
// UPDATE STATISTICS
// =========================================

function updateStats() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const pending =
        total - completed;


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    totalTasks.textContent =
        total;

    pendingTasks.textContent =
        pending;

    completedTasks.textContent =
        completed;

    progressPercent.textContent =
        `${percentage}%`;

    circlePercent.textContent =
        `${percentage}%`;


    updateProgressCircle(
        percentage
    );

}


// =========================================
// CIRCULAR PROGRESS
// =========================================

function updateProgressCircle(
    percentage
) {

    const radius = 50;

    const circumference =
        2 * Math.PI * radius;


    const offset =
        circumference -
        (
            percentage / 100
        ) * circumference;


    progressCircle.style.strokeDasharray =
        circumference;


    progressCircle.style.strokeDashoffset =
        offset;

}


// =========================================
// FILTER BUTTONS
// =========================================

filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                renderTasks();

            }
        );

    }
);


// =========================================
// SEARCH
// =========================================

searchInput.addEventListener(
    "input",
    renderTasks
);


// =========================================
// ADD TASK
// =========================================

addTaskBtn.addEventListener(
    "click",
    addTask
);


// =========================================
// ENTER KEY
// =========================================

taskInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Enter"
        ) {

            addTask();

        }

    }
);


// =========================================
// EDIT MODAL EVENTS
// =========================================

closeModal.addEventListener(
    "click",
    closeEditModal
);


saveEditBtn.addEventListener(
    "click",
    saveEditedTask
);


editModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            editModal
        ) {

            closeEditModal();

        }

    }
);


// =========================================
// DELETE MODAL EVENTS
// =========================================

cancelDelete.addEventListener(
    "click",
    closeDeleteModal
);


confirmDelete.addEventListener(
    "click",
    deleteTask
);


deleteModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            deleteModal
        ) {

            closeDeleteModal();

        }

    }
);


// =========================================
// CLEAR COMPLETED
// =========================================

clearCompletedBtn.addEventListener(
    "click",
    clearCompleted
);


// =========================================
// THEME
// =========================================

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            THEME_KEY
        );


    if (
        savedTheme ===
        "light"
    ) {

        document.body.classList.add(
            "light"
        );

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

}


themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );


        const isLight =
            document.body.classList.contains(
                "light"
            );


        localStorage.setItem(
            THEME_KEY,
            isLight
                ? "light"
                : "dark"
        );


        themeBtn.innerHTML =
            isLight
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';

    }
);


// =========================================
// KEYBOARD SHORTCUT
// =========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey ||
             event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput.focus();

        }


        if (
            event.key === "Escape"
        ) {

            closeEditModal();

            closeDeleteModal();

        }

    }
);


// =========================================
// ESCAPE HTML
// =========================================

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent = text;

    return div.innerHTML;

}


// =========================================
// TOAST
// =========================================

let toastTimer;


function showToast(
    message,
    type = "success"
) {

    clearTimeout(toastTimer);


    toastMessage.textContent =
        message;


    toast.classList.remove(
        "success",
        "error",
        "show"
    );


    if (
        type ===
        "error"
    ) {

        toast.classList.add(
            "error"
        );

        toastIcon.className =
            "fa-solid fa-circle-exclamation";

    } else {

        toast.classList.add(
            "success"
        );

        toastIcon.className =
            "fa-solid fa-circle-check";

    }


    // Small delay allows animation

    requestAnimationFrame(
        () => {

            toast.classList.add(
                "show"
            );

        }
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2600
        );

}


// =========================================
// INITIALIZE
// =========================================

showCurrentDate();

loadTheme();

renderTasks();

updateStats();

taskInput.focus();