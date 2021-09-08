const added = document.querySelector('#added');
const addedbtn = document.querySelector('#addedbtn');
const tastklist = document.querySelector('.tasklist');
const completedlist = document.querySelector('.completedlist');
const form = document.querySelector('form');
const continuing = document.querySelector('#continuing');
const completed = document.querySelector('#completed');
const deleteAll = document.querySelector('#deleteAll');
const completedAllb = document.querySelector('#completedAll');
const darkmode = document.querySelector('#darkmode');
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

    // completed all
    completedAllb.addEventListener('click', completedAll);
    //dark mode
    darkmode.addEventListener('click', () => {
        document.querySelector('html').classList.toggle('dark');
        if(document.querySelector('html').classList.contains('dark')){
            darkmode.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px" y="0px" width="30px" height="auto" viewBox="0 0 471.78 471.78"
                style="enable-background:new 0 0 471.78 471.78;" xml:space="preserve">
                        <path d="M121.272,21.354c-16.676,5.345-13.114,28.421,0.427,31.438c1.805,2.58,4.479,4.712,8.145,5.979
			c85.163,29.467,143.153,104.352,115.514,195.888C217.16,348.059,115.531,383.655,26.974,366.309
			c-2.481-0.482-4.778-0.432-6.881,0.016c-13.7-3.118-27.797,14.771-15.183,26.842c66.237,63.398,152.59,89.55,242.372,69.146
			c81.237-18.453,154.035-75.483,195.223-147.221c38.745-67.471,40.802-149.79-4.494-214.48
			C365.061-3.584,234.135-14.837,121.272,21.354z M408.959,308.72c-35.978,59.528-97.853,102.809-164.338,121.135
			c-61.901,17.057-123.837,5.226-175.851-27.4c89.431,0.751,172.341-44.001,205.82-134.014
			c36.063-96.956-20.348-184.226-103.799-226.817c90.83-18.486,185.498-1.876,242.931,80.15
			C454.2,179.586,443.693,251.236,408.959,308.72z" />
            </svg>
            `;
        }else{
            darkmode.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="#f9be06" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="30px" height="auto" viewBox="0 0 481.378 481.378" style="enable-background:new 0 0 481.378 481.378;"
            xml:space="preserve">
       
               <path d="M385.464,228.53c-16.072-92.163-108.923-135.712-194.218-112.427c-6.865,1.871-10.049,7.051-10.379,12.51
                   c-52.537,28.812-82.4,88.857-72.224,150.523c12.812,77.633,96.807,115.601,167.406,98.559
                   C340.722,362.075,397.484,297.479,385.464,228.53z M274.088,347.685c-57.091,19.068-118.712-11.725-135.638-69.857
                   c-17.661-60.629,29.331-121.712,87.047-134.861c2.905-0.66,5.093-1.97,6.759-3.603c57.163-2.382,109.309,29.554,123.786,90.756
                   C368.935,284.606,321.522,331.842,274.088,347.685z"/>
               <path d="M255.381,58.286V14.211c0-18.949-29.381-18.949-29.381,0v44.074C226,77.234,255.381,77.234,255.381,58.286z"/>
               <path d="M384.763,109.807c9.425-11.004,18.773-22.068,27.274-33.824c4.696-6.505,1.132-16.349-5.276-20.099
                   c-7.414-4.342-15.417-1.206-20.094,5.273c-7.022,9.717-14.884,18.781-22.679,27.876c-5.204,6.073-5.986,14.787,0,20.773
                   C369.321,115.142,379.548,115.896,384.763,109.807z"/>
               <path d="M461.049,236.043h-35.261c-18.946,0-18.946,29.379,0,29.379h35.261C479.996,265.427,479.996,236.043,461.049,236.043z"/>
               <path d="M399.454,378.442c-13.324-13.503-34.094,7.281-20.773,20.773c11.74,11.903,22.059,25.015,32.316,38.196
                   c4.925,6.333,15.64,5.134,20.773,0c6.18-6.18,4.91-14.462,0-20.773C421.518,403.451,411.2,390.345,399.454,378.442z"/>
               <path d="M227.468,424.088c-0.005,14.219-0.025,28.437-1.467,42.599c-0.818,7.983,7.302,14.691,14.69,14.691
                   c8.622,0,13.878-6.729,14.69-14.691c1.442-14.162,1.463-28.38,1.468-42.599C256.849,405.137,227.473,405.137,227.468,424.088z"/>
               <path d="M115.717,387.257c-8.582,10.004-17.159,20.013-26.441,29.377c-13.345,13.467,7.424,34.245,20.774,20.773
                   c9.283-9.363,17.864-19.372,26.441-29.376c5.205-6.073,5.982-14.797,0-20.774C131.154,381.921,120.932,381.174,115.717,387.257z"
                   />
               <path d="M67.339,238.98H20.332c-18.951,0-18.951,29.381,0,29.381h47.012C86.285,268.366,86.285,238.98,67.339,238.98z"/>
               <path d="M98.122,141.488c16.844,8.574,31.717-16.775,14.828-25.369c-13.131-6.688-25.512-14.519-36.688-24.148
                   c-14.279-12.297-35.155,8.394-20.774,20.773C68.568,124.018,82.73,133.653,98.122,141.488z"/>
       </svg>
            `;
        }
    });
}

function addTask(e){
    if (tastklist.childElementCount <= 4) {
        if (added.value.length < 4) {
            alert('Please enter a valid task');
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
            countTask();
            foundTask();
        }, 600);
    }
    e.preventDefault();
    return true;
}

function deletecTask(e) {
    if(e.target.id === 'deletebtn') {
        e.target.parentElement.classList.add('faded-out');
        setInterval(() => {
            e.target.parentElement.remove();
            completecount();
            foundcTask()
        }, 600);
    }
    e.preventDefault();
    return true;
}

function foundTask() {
    var found = document.querySelector('.found');
    if(tastklist.childElementCount > 0) {
        found.classList.add('faded-out');
        completedAllb.classList.remove('faded-out');
    }else{
        found.classList.remove('faded-out'); 
        completedAllb.classList.add('faded-out');
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
        const span = document.createElement('div');
        div.id = 'task';
        div.setAttribute('class', 'col border border-primary');
        div.classList.add("task", "faded-out")
        span.classList.add('sp');
        deletebtn.href = '#';
        deletebtn.id = 'deletebtn';
        deletebtn.innerHTML = 'X';
        

        requestAnimationFrame(() => {
         div.classList.remove("faded-out")
        });

        span.innerHTML = e.target.parentElement.parentElement.textContent.slice(0, -2);
        div.appendChild(span);
        div.appendChild(deletebtn);
        completedlist.appendChild(div);

        // remove from task
        e.target.parentElement.parentElement.classList.add('faded-out');
        
        setInterval(() => {
            e.target.parentElement.parentElement.remove();
            countTask();
            completecount();
            foundTask();
        }, 600);
        foundcTask();
    }
    e.preventDefault();
}

// Completed All items 
function completedAll() {
    if(tastklist.childElementCount > 0) {
        for (let i = 0; i < tastklist.childElementCount; i++) {
            tastklist.children[i].classList.add('faded-out');
            const div = document.createElement('div');
            const deletebtn = document.createElement('a');
            const span = document.createElement('div');
            div.id = 'task';
            div.setAttribute('class', 'col border border-primary');
            div.classList.add("task", "faded-out")
            span.classList.add('sp');
            deletebtn.href = '#';
            deletebtn.id = 'deletebtn';
            deletebtn.innerHTML = 'X';
            requestAnimationFrame(() => {
             div.classList.remove("faded-out")
            });
    
            span.innerHTML = tastklist.children[i].textContent.slice(0, -2);
            div.appendChild(span);
            div.appendChild(deletebtn);
            completedlist.appendChild(div);
            setTimeout(() => {
                tastklist.children[0].remove();
                foundTask();
                countTask();
            }, 600);
            completecount(0);
            foundcTask();
        }
    }
}


foundTask();
