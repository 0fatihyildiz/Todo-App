const added = document.querySelector('#added');
const addedbtn = document.querySelector('#addedbtn');
const tastklist = document.querySelector('.tasklist');
const completedlist = document.querySelector('.completedlist');
const form = document.querySelector('form');
const continuing = document.querySelector('#continuing');
const completed = document.querySelector('#completed');
const deleteAll = document.querySelector('#deleteAll');

eventListeners();

function eventListeners() {
    // add task
    form.addEventListener('submit', addTask);
    // delete task
    tastklist.addEventListener('click', deleteTask);
    // comp delete task
    completedlist.addEventListener('click', deletecTask);
    //complete task
    tastklist.addEventListener('click', completeTask);

    // delete all tasks
    deleteAll.addEventListener('click', () => {
        if (completedlist.childElementCount > 0) {
            for (let i = 0; i < completedlist.childElementCount; i++) {
                completedlist.children[i].classList.add('faded-out');
                setTimeout(() => {
                    completedlist.children[0].remove();
                    foundcTask();
                } , 600);
                completecount(i + 1);
            }
        }
    });
}

function addTask(e){
    if (tastklist.childElementCount <= 4) {
        if (added.value === '') {
            alert('Please enter a task');
        } else {
            const div = document.createElement('div');
            const deletebtn = document.createElement('a');
            const completebtn = document.createElement('a');
            const span = document.createElement('span');
            div.id = 'task';
            div.setAttribute('class', 'col border border-primary');
            div.classList.add("task", "faded-out")

            completebtn.id = 'completebtn';
            completebtn.href = '#';
            completebtn.innerHTML = '&#10003;';

            deletebtn.href = '#';
            deletebtn.id = 'deletebtn';
            deletebtn.innerHTML = 'X';
            

            requestAnimationFrame(() => {
             div.classList.remove("faded-out")
            });

            div.innerHTML = added.value;
            span.appendChild(completebtn);
            span.appendChild(deletebtn);
            div.appendChild(span);
            tastklist.appendChild(div);
            added.value = '';
            countTask();
            foundTask();
        }
    } else {
        alert('You have reached the limit of tasks');
        added.value = '';
    }  
    e.preventDefault();
}

function countTask(a = 0) {
    continuing.innerHTML = tastklist.childElementCount - a;
    foundTask();
}

function completecount(a = 0){
    completed.innerHTML = completedlist.childElementCount - a;
}

function deleteTask(e) {
    if(e.target.id === 'deletebtn') {
        e.target.parentElement.parentElement.classList.add('faded-out');
        setInterval(() => {
            e.target.parentElement.parentElement.remove();
            foundTask();
        }, 600);
        countTask(1);
    }
    e.preventDefault();
    return true;
}

function deletecTask(e) {
    if(e.target.id === 'deletebtn') {
        e.target.parentElement.parentElement.classList.add('faded-out');
        setInterval(() => {
            e.target.parentElement.parentElement.remove();
            foundcTask()
        }, 600);
        completecount(1);
    }
    e.preventDefault();
    return true;
}

function foundTask() {
    var found = document.querySelector('.found');
    if(tastklist.childElementCount > 0) {
        found.classList.add('faded-out');
        
    }else{
        found.classList.remove('faded-out'); 
    }
}

function foundcTask() {
    var cfound = document.querySelector('.cfound');
    if(completedlist.childElementCount > 0) {
        deleteAll.classList.remove('faded-out');
        cfound.classList.add('faded-out');
    }else{
        deleteAll.classList.add('faded-out');
        cfound.classList.remove('faded-out'); 
    }
}

function completeTask(e) {
    if(e.target.id === 'completebtn') {
        e.target.parentElement.parentElement.classList.add('faded-out');
        const div = document.createElement('div');
        const deletebtn = document.createElement('a');
        const span = document.createElement('span');
        div.id = 'task';
        div.setAttribute('class', 'col border border-primary');
        div.classList.add("task", "faded-out")

        deletebtn.href = '#';
        deletebtn.id = 'deletebtn';
        deletebtn.innerHTML = 'X';
        

        requestAnimationFrame(() => {
         div.classList.remove("faded-out")
        });

        div.innerHTML = e.target.parentElement.parentElement.textContent.slice(0, -2);
        span.appendChild(deletebtn);
        div.appendChild(span);
        completedlist.appendChild(div);

        // remove from task
        e.target.parentElement.parentElement.classList.add('faded-out');
        
        setInterval(() => {
            e.target.parentElement.parentElement.remove();
            foundTask();
        }, 600);
        countTask(1);
        completecount(0);
        foundcTask();
    }
    e.preventDefault();
}

// Completed All items 


foundTask();
