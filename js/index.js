let taskNameInput =document.getElementById('taskNameInput')
let taskStatusInput =document.getElementById('taskStatusInput')
let searchTaskInput =document.getElementById('searchTaskInput')
let addBtn =document.getElementById('addBtn')
let updateTaskBtn =document.getElementById('updateTaskBtn')

let rowTasks =document.getElementById('row')
let tasks= JSON.parse(localStorage.getItem("tasks"))||[];
showTasks(tasks);
function addTask(){
let newTask={
    name:taskNameInput.value,
    iscompleted:false
}
tasks.push(newTask);
clear();
localStorage.setItem("tasks",JSON.stringify(tasks))
}
addBtn.addEventListener('click',()=>{
    addTask();
    showTasks(tasks);

})

function showTasks(arr){
let box=``
for(let i=0;i<arr.length;i++){
    box+=`
      <div class="col-md-12">
                    <div class="d-flex align-items-center task ${arr[i].iscompleted==true?"completed":""}">
                        <input onchange="taskDone(${i})" ${arr[i].iscompleted==true?"checked":""} type="checkbox" class="my-checkbox d-none" name="" id="taskcheck-${i}">
                        <label for="taskcheck-${i}" class="label"></label>
                        <p class="m-0 text-white">${arr[i].name}</p>
                        <button onclick="readyTOUpdate(${i})" class="btn btn-warning ms-auto" id="updateBtn"><i class="fa-solid fa-pen-nib"></i> Update</button>
                        <button onclick="deleteTask(${i})" class="btn btn-danger mx-3" id="deleteBtn"><i class="fa-solid fa-trash-can"></i> Delete</button>
                    </div>
                </div>
    `
}
rowTasks.innerHTML=box;
}
function clear(){
    taskNameInput.value=null;
}
function deleteTask(index){
    tasks.splice(index,1);
    showTasks(tasks);
    localStorage.setItem("tasks",JSON.stringify(tasks))
}
function taskDone(index){
tasks[index].iscompleted= !tasks[index].iscompleted;
showTasks(tasks);
localStorage.setItem("tasks",JSON.stringify(tasks))

}

function searchTask(){
    let searchValue=searchTaskInput.value.toLowerCase();
    let arr=[];
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].name.toLowerCase().includes(searchValue)){
            arr.push(tasks[i])

        }
        showTasks(arr)
    }
}
searchTaskInput.addEventListener('input',searchTask)

var updatedIndex;

function readyTOUpdate(index){
    updatedIndex=index;  
    taskNameInput.value=tasks[index].name;
    addBtn.classList.add('d-none');
    updateTaskBtn.classList.remove('d-none');
}
function updateTask(){
    tasks[updatedIndex].name=taskNameInput.value;
    showTasks(tasks)
    localStorage.setItem("tasks",JSON.stringify(tasks))
    updateTaskBtn.classList.add('d-none');
    addBtn.classList.remove('d-none');
}
updateTaskBtn.addEventListener('click',updateTask)


function filterTasks(){
    let taskStatus=taskStatusInput.value;
    let arr=[];
    for(let i=0;i<tasks.length;i++){
        if(taskStatus=="All"){
            arr.push(tasks[i])
        }
        else if(taskStatus=="pended"&&tasks[i].iscompleted===false){
            arr.push(tasks[i])
        }
        else if(taskStatus=="Completed"&&tasks[i].iscompleted===true){
            arr.push(tasks[i])
        }
    }
    showTasks(arr);
}
taskStatusInput.addEventListener("change",filterTasks);