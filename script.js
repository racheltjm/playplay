// Function to update the live date
function updateLiveDate() {
    const liveDateElement = document.getElementById('liveDate');
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Singapore' };
    const formattedDate = new Date().toLocaleDateString('en-SG', options);
    liveDateElement.textContent = formattedDate;
}

// Update the live date every second
setInterval(updateLiveDate, 1000);

// Initial call to update the live date when the page loads
updateLiveDate();

// Function to save tasks and their states to local storage
function saveTasksToLocalStorage() {
    const tasks = {
        program1: document.getElementById('program1TaskList').innerHTML,
        program2: document.getElementById('program2TaskList').innerHTML
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach((checkbox, index) => {
        localStorage.setItem(`checkbox${index}`, checkbox.checked);
    });
}

// Function to load tasks and their states from local storage
function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        document.getElementById('program1TaskList').innerHTML = tasks.program1;
        document.getElementById('program2TaskList').innerHTML = tasks.program2;

        const checkboxes = document.querySelectorAll('.form-check-input');
        checkboxes.forEach((checkbox, index) => {
            const isChecked = localStorage.getItem(`checkbox${index}`) === 'true';
            checkbox.checked = isChecked;
        });
    }
}

// Load tasks and their states when the page loads
window.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();
    
    // Attach event listeners for checkboxes after loading
    document.querySelectorAll('.form-check-input').forEach(checkbox => {
        checkbox.addEventListener('click', saveTasksToLocalStorage);
    });
});

// Save tasks and their states when a task is added
document.getElementById('addTaskProgram1Btn').addEventListener('click', function() {
    const taskInput = document.getElementById('program1TaskInput');
    addTask(taskInput.value.trim(), '#program1TaskList');
});
document.getElementById('addTaskProgram2Btn').addEventListener('click', function() {
    const taskInput = document.getElementById('program2TaskInput');
    addTask(taskInput.value.trim(), '#program2TaskList');
});

// Function to add a new task
function addTask(taskText, listSelector) {
    if (taskText) {
        const taskList = document.querySelector(listSelector);
        const li = document.createElement('li');
        li.classList.add('mb-3');
        li.innerHTML = `
            <label class="d-flex gap-2">
                <input class="form-check-input" type="checkbox" value="">
                
                <span>${taskText}</span>
            </label>
        `;
        taskList.appendChild(li);

        // Attach event listener to the new checkbox
        const checkbox = li.querySelector('.form-check-input');
        checkbox.addEventListener('click', saveTasksToLocalStorage);

        saveTasksToLocalStorage(); // Save task state after adding a new task
    }
}

// Add event listener to handle "Enter" key press on input fields
document.getElementById('program1TaskInput').addEventListener('keydown', function(event) {
    if (event.keyCode === 13) { // Check if the pressed key is "Enter"
        addTask(document.getElementById('program1TaskInput').value.trim(), '#program1TaskList'); // Call the function to add a task for Programme 1
        document.getElementById('program1TaskInput').value = ''; // Clear the input field
    }
});

document.getElementById('program2TaskInput').addEventListener('keydown', function(event) {
    if (event.keyCode === 13) { // Check if the pressed key is "Enter"
        addTask(document.getElementById('program2TaskInput').value.trim(), '#program2TaskList'); // Call the function to add a task for Programme 2
        document.getElementById('program2TaskInput').value = ''; // Clear the input field
    }
});

// Function to delete checked tasks
function deleteCheckedTasks() {
    const checkedCheckboxes = document.querySelectorAll('.form-check-input:checked');
    checkedCheckboxes.forEach(checkbox => {
        const taskItem = checkbox.closest('li');
        taskItem.remove(); // Remove the task item from the DOM
    });
    saveTasksToLocalStorage(); // Save the updated tasks to local storage
}

// Add event listener to the delete button
document.getElementById('deleteTaskBtn').addEventListener('click', deleteCheckedTasks);
