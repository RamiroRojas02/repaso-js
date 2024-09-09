const $form = document.getElementById("form-create-task");

const $tasks = document.getElementById("section-tasks");

const $filterTasks = document.getElementById("filter-tasks");

const $search = document.getElementById("search");

const $status = document.getElementById("filter-status");

let tasks = JSON.parse(localStorage.getItem('tasks')) || []


printTasks(tasks, $tasks, createCardTask);

//Events


//Create new tasks
$form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = e.target[0].value;
  const description = e.target[1].value;
  //Id random
  const id = Math.random().toString(36).slice(2)
  if (title == "") {
    alert("Please put a title");
  } else if (description == "") {
    alert("Please put a description");
  } else {
    const newTask = createTask({ title, description, id });
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    printTasks(tasks, $tasks, createCardTask);
  }
});

//Change status task or delete them
$tasks.addEventListener('click', (e)=>{
  const dataSet = e.target.dataset
  if (dataSet.status) {
    let task = tasks.find( task => task.id === dataSet.status)
    task.status = !task.status
    // console.log(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    printTasks(tasks, $tasks, createCardTask);
  }
  if(dataSet.delete){
    console.log(dataSet);
    tasks = tasks.filter(task => task.id !== dataSet.delete)
    localStorage.setItem("tasks", JSON.stringify(tasks));
    printTasks(tasks, $tasks, createCardTask);
    
  }
})

//Event filter Tasks
$filterTasks.addEventListener('input', e =>{
  // console.log($status.checked);
  
  let tasksFiltered = tasks.filter(task => task.title.toLowerCase().includes($search.value.toLowerCase()) && ( !$status.checked || $status.checked != task.status))
  // console.log(tasksFiltered);

  printTasks(tasksFiltered, $tasks, createCardTask)
  
})



//Functions

function createTask({ title, description, status = false, id }) {
  const task = {
    id,
    title,
    description,
    status,
  };

  return task;
}

function createCardTask({ id, title, description, status }) {
  const $article = document.createElement("article");
  $article.className = "card-task";

  const $h4 = document.createElement("h4");
  $h4.className = "title-card-task";
  $h4.textContent = title;

  const $btnDelete = document.createElement("button");
  $btnDelete.setAttribute("data-delete", id);
  $btnDelete.className = "btn-delete-task";
  $btnDelete.textContent = "X";

  const $p = document.createElement("p");
  $p.className = "description-card-task";
  $p.textContent = description;

  const $btnStatus = document.createElement("button");
  $btnStatus.className = `btn-${status ? "complete" : "pending"}-task`;
  $btnStatus.setAttribute("data-status", id);
  $btnStatus.textContent = status ? "Complete" : "Pending";

  $article.append($btnDelete, $h4,  $p, $btnStatus);

  return $article;
}

function printTasks(array, container, fn) {
  console.log(array);
  // console.log(container);
  const fragment = document.createDocumentFragment();
  for (const item of array) {
    fragment.appendChild(fn(item));
  }
  // console.log(fragment);
  container.innerHTML = "";
  container.appendChild(fragment);
}
