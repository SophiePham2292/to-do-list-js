const data = [
    { title: 'Task 1', done: false, piority: 3 },
    { title: 'Task 2', done: false, piority: 3 },
    { title: 'Task 3', done: false, piority: 3 }
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
        data.unshift({
            title: taskContent,
            done: false,
            piority: 3
        }) 
        const taskList = this.el.getElementsByClassName('task-list')[0];
        while (taskList.firstChild) taskList.removeChild(taskList.firstChild);
        //this.el.getElementsByClassName('task-list')[0].innerHTML = null;
        listRender()      
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
function listRender() {
    while(list.firstChild) list.removeChild(list.firstChild);
    return (
        data.map((item, index) => {
            const $item = document.createElement('li');
            $item.innerHTML = `
                <input type="checkbox" name="task-done">
                <div></div>
                <select name="task-piority" id="task-piority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button class='delete-task'>Delete</button>
            `;
            $item.classList.add('task-detail');
            $item.getElementsByTagName('div')[0].innerText = item.title;

            // Change selected option based on data piority 

            switch(data[index].piority) {
                case 1:
                    $item.getElementsByTagName('option')[2].setAttribute('selected', 'true');
                    break;
                case 2:
                    $item.getElementsByTagName('option')[1].setAttribute('selected', 'true');
                    break;
                case 4: 
                    $item.getElementsByTagName("div")[0].style.textDecoration= "line-through";
                    break;
                default:
                    $item.getElementsByTagName('option')[0].setAttribute('selected', 'true')
            }

            list.appendChild($item);

            $item.getElementsByTagName('button')[0].addEventListener('click', function(e){
                e.preventDefault();
                data.splice(index, 1);
                listRender();
            })

            $item.getElementsByTagName("select")[0].addEventListener('change', function(e) {
                console.log(e.target.getElementsByTagName('option'));
                    switch(e.target.value){
                        case 'high':
                            data[index].piority = 1;
                            break;
                        case 'medium':
                            data[index].piority = 2;
                            break;
                        case 'low':
                            data[index].piority = 3;
                            break;
                    }

                    function comparePiority(item1, item2) {
                        if(item1.piority > item2.piority){                    
                            return 1;
                        } else if (item1.piority < item2.piority){
                            return -1;
                        }
                        return 0;
                    }
                    data.sort(comparePiority);

                    listRender();
            })

            $item.getElementsByTagName("input")[0].addEventListener("change", function(e){

                data[index].piority = 4;

                function comparePiority(item1, item2) {
                    if(item1.piority > item2.piority){                    
                        return 1;
                    } else if (item1.piority < item2.piority){
                        return -1;
                    }
                    return 0;
                }
                data.sort(comparePiority);

                listRender();
            })

        }))
}


        