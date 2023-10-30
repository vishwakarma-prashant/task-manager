const addNewTask = document.querySelector(".addNewtask");

const overlay = document.querySelector(".overlay");
const overlayRemoveBtn = document.querySelector("#btn-remove");
const taskList = document.querySelector(".taskList");
const form = document.querySelector(".form");
const titleInp = document.querySelector("#titleInp");
const descriptionInp = document.querySelector("#description");
const dateInp = document.querySelector("#dateInp");
const doneBtn = document.querySelector("#edit-btn");
const addBtn = document.querySelector("#add-btn");

let d = new Date();
let todoArr =[];
if(localStorage.getItem("todo-Data")==null ||localStorage.getItem("todo-Data")==undefined ){

}else{
  todoArr =JSON.parse(localStorage.getItem("todo-Data"))
}


const openOverlay = () => {
  overlay.classList.remove("hidden");
  dateInp.value = `${d.getFullYear()}-09-${d.getDate()}`;
};
const closeOverlay = () => {
  renderTodo();
  overlay.classList.add("hidden");
};
const renderTodo = () => {
  console.log("render Todo()");

  localStorage.setItem("todo-Data", JSON.stringify(todoArr));

  taskList.innerHTML = "";

  for (let i = 0; i < todoArr.length; i++) {
    taskList.innerHTML += `<div class="task" id="${i}">
    <h3 id="title">${todoArr[i].title}</h3>
    <span id="dateAndTime">${todoArr[i].date}</span>
    <p>${todoArr[i].description}
    </p>
    <div class="options">             
    <i onClick="editTask(this)" class="fa-regular fa-pen-to-square"></i>
    
    <i onClick="removeTask(this)" class="fa-regular fa-square-minus"></i>
    </div>
    </div>
    `;
  }
};
renderTodo();

const removeTask = (ele) => {
  console.log("remove Task ()");
  // console.log(ele);
  todoArr.splice(ele.parentElement.parentElement.id, 1);
  console.log(todoArr);
  renderTodo();
};
let x;
const editTask = (ele) => {
  console.log("edit Task");
  // console.log(ele.parentElement.parentElement);
  let id = ele.parentElement.parentElement.id;
  titleInp.value = todoArr[id].title;
  dateInp.value = todoArr[id].date;
  descriptionInp.value = todoArr[id].description;
  titleInp.focus();
  addBtn.classList.add("hidden");
  doneBtn.classList.remove("hidden");
  openOverlay();
  // console.log(addBtn);

  x = id;
};

doneBtn.addEventListener("click", () => {
  console.log("clicked Edit button");
  console.log(x);
  if (titleInp.value == "") alert("No title Present");
  else {
    todoArr[x].title = titleInp.value;
    todoArr[x].date = dateInp.value;
    todoArr[x].description = descriptionInp.value;
    closeOverlay();

    console.log(todoArr);
  }
});

addBtn.addEventListener("click", (e) => {
  console.log("add Task ()");

  // console.log(e);
  e.preventDefault();
  if (titleInp.value == "") alert("No title Present");
  else {
    let obj = {
      title: titleInp.value,
      date: dateInp.value,
      description: descriptionInp.value,
    };

    todoArr.push(obj);

    closeOverlay();
    // console.log(todoArr);
    renderTodo();
  }
});

addNewTask.addEventListener("click", () => {
  addBtn.classList.remove("hidden");
  doneBtn.classList.add("hidden");
  titleInp.value = "";
  dateInp.value = "";
  descriptionInp.value = "";
  openOverlay();
  titleInp.focus();
});

overlayRemoveBtn.addEventListener("click", () => {
  closeOverlay();
});
