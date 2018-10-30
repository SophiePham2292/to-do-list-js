const data = [
    { title: 'Task 1', done: false },
    { title: 'Task 2', done: false },
    { title: 'Task 3', done: false }
]



class ToDoList {
    constructor (id) {
        this.id = id;
        this.el = document.getElementById(id);
        this.el.innerHTML = this.constructor.template;
        this.el.classList.add('list-content');
        this.el.getElementsByClassName('add-button')[0].addEventListener('click', this.handleTaskInput.bind(this));
       
    }

    handleTaskInput (e) {
        e.preventDefault();
        const taskContent = this.el.getElementsByClassName('task-input')[0].value;
        data.push({
            title: taskContent,
            done: false
        }) 
        const taskList = this.el.getElementsByClassName('task-list')[0];
        while (taskList.firstChild) taskList.removeChild(taskList.firstChild);
        //this.el.getElementsByClassName('task-list')[0].innerHTML = null;
        listRender()      
    }

    handleDeleteTask(e){
        e.preventDefault();
        console.log(e.target);
        const button = e.target;
        console.log(button.parentElement);
    }
}

ToDoList.template = `
    <h1>To do list</h1>
    <div class="list-content">
        <form class="task-content">
            <ul class="task-list">
            </ul>
        </form>
        <form class="task-add">
            <button class="add-cta">+</button>
            <div class="add-content">
                <input type="text" name="task-input" class="task-input">
                <button class="add-button">Add</button>
                <button class="cancel-button">Cancel</button>
            </div>
        </form>
    </div>
`
new ToDoList('to-do-list');

const list = document.getElementsByClassName('task-list')[0];
console.log(list);
function listRender() {
    while(list.firstChild) list.removeChild(list.firstChild);
    return (
        data.map((item, index) => {
            const $item = document.createElement('li')
            $item.innerHTML = `
                <input type="checkbox" name="task-done">
                <div></div>
                <select name="task-piority" id="task-piority">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <button class='delete-task'>Delete</button>
            `;
            $item.classList.add('task-detail');
            $item.getElementsByTagName('div')[0].innerText = item.title;
            list.appendChild($item);

            $item.getElementsByTagName('button')[0].addEventListener('click', function(e){
                e.preventDefault();
                data.splice(index, 1);
                listRender();
            })
        }))
}


        