document.addEventListener('DOMContentLoaded', function() {
    const addProgramBtn = document.getElementById('addProgramBtn');
    const programsContainer = document.getElementById('programs');
  
    // Function to load programs from localStorage
    function loadPrograms() {
      const programs = JSON.parse(localStorage.getItem('programs')) || [];
      programs.forEach(program => {
        createProgram(program.name, program.tasks);
      });
    }
  
    // Function to save programs to localStorage
    function savePrograms() {
      const programs = [];
      document.querySelectorAll('.program').forEach(programDiv => {
        const programName = programDiv.querySelector('h3').textContent;
        const tasks = [];
        programDiv.querySelectorAll('li').forEach(taskItem => {
          tasks.push({
            text: taskItem.querySelector('span').textContent,
            completed: taskItem.querySelector('input[type="checkbox"]').checked
          });
        });
        programs.push({ name: programName, tasks });
      });
      localStorage.setItem('programs', JSON.stringify(programs));
    }
  
    // Function to create a new program
    function createProgram(name = 'New Program', tasks = []) {
      const programDiv = document.createElement('div');
      programDiv.classList.add('program');
  
      const programHeader = document.createElement('h3');
      programHeader.textContent = name;
  
      const taskInput = document.createElement('input');
      taskInput.type = 'text';
      taskInput.placeholder = 'Add new task';
      taskInput.classList.add('task-input');
  
      const addTaskBtn = document.createElement('button');
      addTaskBtn.textContent = 'Add Task';
      addTaskBtn.classList.add('add-task-btn');
  
      const taskList = document.createElement('ul');
      taskList.classList.add('task-list');
  
      const deleteCheckedBtn = document.createElement('button');
      deleteCheckedBtn.textContent = 'Delete Checked Tasks';
      deleteCheckedBtn.classList.add('delete-checked-btn');
  
      const deleteProgramBtn = document.createElement('button');
      deleteProgramBtn.textContent = 'Delete Program';
      deleteProgramBtn.classList.add('delete-program-btn');
  
      // Function to handle adding tasks
function addTask(taskInput, taskList) {
    const taskText = taskInput.value.trim();
    if (taskText) {
      const listItem = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
  
      const span = document.createElement('span');
      span.textContent = taskText;
  
      listItem.appendChild(checkbox);
      listItem.appendChild(span);
      taskList.appendChild(listItem);
  
      taskInput.value = '';
      savePrograms();
    }
  }
  
  // Event listener for adding tasks with the "Enter" key
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTask(taskInput, taskList);
    }
  });
  
  // Event listener for adding tasks with the button
  addTaskBtn.addEventListener('click', function() {
    addTask(taskInput, taskList);
  });
  
      
      // Event listener for deleting checked tasks
      deleteCheckedBtn.addEventListener('click', function() {
        const checkedTasks = taskList.querySelectorAll('input[type="checkbox"]:checked');
        checkedTasks.forEach(task => task.parentElement.remove());
        savePrograms();
      });
  
      // Event listener for deleting the program
      deleteProgramBtn.addEventListener('click', function() {
        programDiv.remove();
        savePrograms();
      });
  
      // Append existing tasks if any
      tasks.forEach(task => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
  
        const span = document.createElement('span');
        span.textContent = task.text;
  
        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        taskList.appendChild(listItem);
      });
  
      programDiv.appendChild(programHeader);
      programDiv.appendChild(taskInput);
      programDiv.appendChild(addTaskBtn);
      programDiv.appendChild(taskList);
      programDiv.appendChild(deleteCheckedBtn);
      programDiv.appendChild(deleteProgramBtn);
  
      programsContainer.appendChild(programDiv);
    }
  
    // Load programs from localStorage on page load
    loadPrograms();
  
    // Event listener for adding new programs
    addProgramBtn.addEventListener('click', function() {
      const programName = prompt('Enter the name of the new program:');
      if (programName) {
        createProgram(programName);
        savePrograms();
      }
    });
  
    // Save the programs whenever a change happens in the programs container
    programsContainer.addEventListener('change', savePrograms);
  });
  