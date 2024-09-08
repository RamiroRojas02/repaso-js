const $form = document.getElementById("form-create-task");

const $tasks = document.getElementById("section-tasks");

const $search = document.getElementById("search");

const $status = document.getElementById("filter-status");

const tasks = JSON.parse(localStorage.getItem('tasks')) || []

let id = [tasks.length - 1]?.id || 0;

printTasks(tasks, $tasks, createCardTask);

//Events

$form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = e.target[0].value;
  const description = e.target[1].value;

  if (title == "") {
    alert("Please put a title");
  } else if (description == "") {
    alert("Please put a description");
  } else {
    const newTask = createTask({ title, description, id: ++id });
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    printTasks(tasks, $tasks, createCardTask);
  }
});

$tasks.addEventListener('click', (e)=>{
  const dataSet = e.target.dataset
  console.log(dataSet);
  
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

  $article.append($h4, $btnDelete, $p, $btnStatus);

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
