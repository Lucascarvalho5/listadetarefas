
function addTask(event) {
  event.preventDefault();
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  if (taskInput.value !== '') {
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.innerText = taskInput.value;
    li.appendChild(taskText);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Excluir';
    deleteBtn.addEventListener('click', deleteTask);
    li.appendChild(deleteBtn);

    const editBtn = document.createElement('button');
    editBtn.innerText = 'Editar';
    editBtn.addEventListener('click', editTask);
    li.appendChild(editBtn);

    taskList.appendChild(li);
    taskInput.value = '';

    saveTasks();
  }
}


function deleteTask(event) {
  event.target.parentNode.remove();
  saveTasks(); 
}


function editTask(event) {
  event.preventDefault();
  const li = event.target.parentNode;
  const taskText = li.firstChild;
  const newText = prompt('Editar tarefa:', taskText.innerText);

  if (newText !== null && newText !== '') {
    taskText.innerText = newText;
    saveTasks(); 
  }
}


function saveTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = [];

  for (let i = 0; i < taskList.children.length; i++) {
    const taskText = taskList.children[i].querySelector('span');
    tasks.push(taskText.innerText);
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
  const taskList = document.getElementById('taskList');
  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);

    tasks.forEach(task => {
      const li = document.createElement('li');
      const taskText = document.createElement('span');
      taskText.innerText = task;
      li.appendChild(taskText);

      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Excluir';
      deleteBtn.addEventListener('click', deleteTask);
      li.appendChild(deleteBtn);

      const editBtn = document.createElement('button');
      editBtn.innerText = 'Editar';
      editBtn.addEventListener('click', editTask);
      li.appendChild(editBtn);

      taskList.appendChild(li);
    });
  }
}


const taskForm = document.getElementById('taskForm');
taskForm.addEventListener('submit', addTask);


window.addEventListener('load', loadTasks);
