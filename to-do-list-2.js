/*-----------------------------------------------

    Table of content 
        1. Data storage
        2. Classes
        3. Class static template variable
        4. DOM Objects creation

 -----------------------------------------------*/


/*---------------------
    Data storage
 ---------------------*/

const priorities = [
    { label: 'High', value: 1 },
    { label: 'Medium', value: 2 },
    { label: 'Low', value: 3 },
    { label: 'Done', value: 4 }
]

var days = ["Sunday", "Monday", "Tuesday", 
    "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", 
    "April", "May", "June", "July", "August", "September", "October", "November", "December"];



/*---------------------
    Classes
 ---------------------*/

class ToDoList {

    //  CONSTRUCTOR

    constructor(id, data) {
        this.id = id;
        this.data = data;

        this.el = document.getElementById(id);
        this.el.innerHTML = this.constructor.template;
        this.el.classList.add('list-content');

        this.el.addEventListener('click', e => {
            e.preventDefault();
            let elClicked = e.target;
            //console.log(elClicked);
            if(e.target.matches('.add-cta')) this.handleCreateTask();
            if(e.target.matches('.add-button')) this.handleAddTask(e);
            if(e.target.matches('.cancel-button')) this.handleCancelTask(e);
            if(e.target.matches('.delete-task')) this.handleDeleteTask(e);
            if(e.target.matches('#done-task')) this.handleTaskDone(e);
            if(e.target.matches('.subject-button'))this.handleInputSubject(e);
        })

        this.el.addEventListener('change', e => {
            e.preventDefault();
            if(e.target.matches('#task-piority')) this.handleChangePiotiry(e);
            if(e.target.matches('#done-task')) this.handleTaskDone(e);
            
        })

        this.render();

    }

    // METHODS

    handleCreateTask() {
        const addTask = document.createElement('div');
        addTask.innerHTML = `
            <input type="text" name="task-input" class="task-input">
            <button class="add-button">Add</button>
            <button class="cancel-button">Cancel</button>
        `
        addTask.classList.add('add-content');
        this.el.getElementsByClassName('task-add')[0].appendChild(addTask);
    }

    handleAddTask(e) {
        const newTask = this.el.getElementsByClassName('task-input')[0].value;
        this.data.unshift({
            title: newTask,
            piority: 1
        })
        this.el.getElementsByClassName('task-add')[0].removeChild(e.target.parentElement);
        this.render();
    }

    handleCancelTask(e) {
        this.el.getElementsByClassName('task-add')[0].removeChild(e.target.parentElement);
    }

    handleDeleteTask(e) {
        console.log(parseInt(e.target.parentElement.dataset.id));
        this.data.splice(e.target.parentElement.dataset.id, 1);
        this.render();
    }

    handleChangePiotiry(e) {
        const value = parseInt(e.target.value)
        this.data[e.target.parentElement.dataset.id].piority = value;

        function comparePriority(listItem1, listItem2) {
            if(listItem1.piority - listItem2.piority > 0) return 1;
            if(listItem1.piority - listItem2.piority < 0) return -1;
            return 0;
        }
        this.data.sort(comparePriority)
        this.render();
    }

    handleTaskDone(e){
        const listItem = e.target.parentElement;
        const id = parseInt(listItem.dataset.id);
        this.data[id].piority = 4;
        const removedTask = this.data.splice(id, 1);
        this.data.push(removedTask[0]);
        this.render()
        
    }

    handleInputSubject(e){
        e.preventDefault();
        const subjectH3Text = this.el.querySelector('.subject-input').value;
        const subjectH3El = document.createElement('h3');
        subjectH3El.innerText = subjectH3Text;
        const subjectDiv = e.target.parentElement;
        while (subjectDiv.firstChild) {
            subjectDiv.removeChild(subjectDiv.firstChild)
        };
        subjectDiv.appendChild(subjectH3El);
    }

    // RENDER

    render() {
        const taskList = this.el.getElementsByClassName('task-list')[0];
        while(taskList.firstChild) taskList.removeChild(taskList.firstChild);
        this.data.map((listObject, index) => {

            // Use list item data to create <li> elements
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <input id='done-task' type="checkbox" name="task-done" value='done'/>
                <div>${listObject.title}</div>
                <select name="task-piority" id="task-piority"></select>
                <button class='delete-task'>Delete</button>
            `
            listItem.classList.add('task-detail');
            listItem.dataset.id = index;
            const select = listItem.querySelector('select')

            priorities.forEach(p => {
                const opt = document.createElement('option')
                opt.label = p.label
                opt.innerText = p.value
                if (listObject.piority === p.value)
                    opt.selected = true
                select.append(opt)
            })
            if(listObject.piority === 4) {
                listItem.getElementsByTagName('input')[0].setAttribute('checked', 'true')
                listItem.getElementsByTagName('div')[0].style.textDecoration = 'line-through';
            }

            
            // Append all <li> elements into <ul>
            taskList.appendChild(listItem);
        })
    }
}

/*---------------------
    Static class 
    template variable
 ---------------------*/


ToDoList.template = `
    <div class="list-heading">
        <h3>${(new Date).getDate()}</h3>
        <p>${months[(new Date).getMonth()]} </br>
            <span>${days[(new Date).getDay()]}</span>
        </p>  
        <button class="add-cta">+</button>
    </div>
    
    <div class="list-content">
        <div class='list-subject'>
            <input type='text' class='subject-input' placeholder="Subject title"></input>
            <button class='subject-button'>Yes!</button>
        </div>
        <form class="task-content">
            <ul class="task-list">
            </ul>
        </form>
        <form class="task-add"> 
        </form>
        
    </div>
`


/*-------------------------
    DOM object creation 
 --------------------------*/

const todo = new ToDoList('to-do-list', [
    { title: 'JS Array', piority: 1 },
    { title: 'JS Date', piority: 1 },
    { title: 'JS String', piority: 1 },
    { title: 'HTML DOM elements', piority: 1 },
    { title: 'HTML DOM events', piority: 1 },
    { title: 'Task 6', piority: 1 }
]);

new ToDoList('to-do-list-2', [
    { title: 'Task 1', piority: 1 },
    { title: 'Task 2', piority: 2 },
    { title: 'Task 3', piority: 3 }
]);

