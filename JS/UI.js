class UI {
    constructor(){
        this.container = document.querySelector('.wrapper');
        this.appWrapper = document.querySelector('.app-wrapper');
        this.booktabWrapper = document.querySelector('.booktabs')
        this.amHoursContainer = document.querySelector('.am-hours');
        this.pmHoursContainer = document.querySelector('.pm-hours');
        this.gridArr = [1,2,3,4,5,6,7,8,9,10,11,12,13];
        this.eventNumbArr = [1,2,3,4,5,6,7];
        this.booktabArr = ['Overview','Tasks','Meals', 'Fitness', 'Family','Work','Self','EXP'];

        this.getBooktabs = (function(bt){
            let booktabHTML = '';
            //bt must be an Array
            bt.forEach((e)=> booktabHTML += `<div class="booktab ${e.toLowerCase()}-bt">${e}</div>`);
            return booktabHTML;
        })(this.booktabArr);

        this.booktabWrapper.innerHTML = `
            ${this.getBooktabs};
        `


    }

    /* BOOKTABS */
    highlightBooktab(booktab){
        const booktabHTML = document.querySelector(`.${booktab}-bt`);
        this.booktabArr.forEach((bt)=>{
            let btHTML = document.querySelector(`.${bt.toLowerCase()}-bt`);
            btHTML.id = '';
        });
        booktabHTML.id = 'bt-highlight';
    }
    /* END OF BOOKTABS */

    /* OVERVIEW */
    displayOverview(){
        this.appWrapper.innerHTML = `
        `;
        
        this.appWrapper.id = 'app-overview';
        
        this.highlightBooktab('overview');
    }

    getEventDetails(start, end, AmPm){
        /* let gridStart, gridEnd;
        if(start == 12){
            gridStart = this.gridArr[0];
        } else{
            gridStart = this.gridArr[(start + 1)];
        }
        if(end == 12){
            gridEnd = this.gridArr[1];
        } else{
            gridEnd = this.gridArr[(start + 2)];
        } */

        const startDiv = document.querySelector(`.${start}am`);
        let midDiv;
        while (start <= end){
            midDiv.document.querySelector(`.${start}`);
            midDiv.classList.add(`event${this.eventNumbArr[0]}`);
            start++;
        }
        startDiv.classList.add(`event${this.eventNumbArr[0]}`);
        this.amHoursContainer.appendChild(div);
        document.documentElement.style.setProperty('--event1S', gridStart);
        document.documentElement.style.setProperty('--event1F', gridEnd);
    }

    /* END OF OVERVIEW */

    /* TASKS */
    displayTasks(){
        /* Can't reformat template literal we're using 'firstChild' */
        this.appWrapper.innerHTML = `
            <div class="app-heading" id="tasks-heading">Tasks</div>
            <div class="create-task-wrapper"><input type="button" value="Create Task" class="task-btn" id="create-task-btn"></div>
            <ul class="tasks-items">
                <li class="task-item"><p>Take out garbage</p>
                <div class="task-item-check">&#10003</div>
                <div class="task-item-x">X</div>
                </li>
                <li class="task-item"><p>Do the dishes</p>
                <div class="task-item-check">&#10003</div>
                <div class="task-item-x">X</div>
                </li>
                <li class="task-item"><p>Clean room</p>
                <div class="task-item-check">&#10003</div>
                <div class="task-item-x">X</div>
                </li>
                <li class="task-item"><p>Do laundry</p>
                <div class="task-item-check">&#10003</div>
                <div class="task-item-x">X</div>
                </li>
            </ul>
        `;
        this.appWrapper.id = `app-tasks`
        this.tasksEventListeners().btnEvent();
        this.tasksEventListeners().taskEvents();

        this.highlightBooktab('tasks');
    }

    tasksHTML(){
    }

    tasksEventListeners(){
        const self = this;
        const btn = document.querySelector('.task-btn');
        const tasks = document.querySelector('.tasks-items');

        /* These functions toggle between each other allowing 2 event listeners to alternate within the same btn */
        const createTaskEvent = (e)=>{
            e.preventDefault();
            btn.value = 'Submit Task';
            const newTask = document.createElement('li');
            newTask.className = 'task-item';
            newTask.innerHTML = `
            <input type="text" id="task-input">
            `

            tasks.prepend(newTask);
            let textfield = document.getElementById('task-input');
            textfield.focus();

            /* event listener for enter */
            textfield.addEventListener('keypress', (e)=>{
                if (e.keyCode == 13) {
                    submitTaskEvent(e);
                }
            })

            btn.removeEventListener('click', createTaskEvent);
            btn.addEventListener('click', submitTaskEvent);
        }
        const submitTaskEvent = (e)=>{
            e.preventDefault();
            btn.value = 'Create Task';
            const text = document.getElementById('task-input').value;
            tasks.firstChild.innerHTML = `
            <p>${text}</p>
            <div class="task-item-check">&#10003</div>
            <div class="task-item-x">X</div>
            `

            btn.removeEventListener('click', submitTaskEvent);
            btn.addEventListener('click', createTaskEvent);
        }

        return {
            btnEvent: function(){
                btn.addEventListener('click', createTaskEvent);
            },
            taskEvents: function(){
                tasks.addEventListener('click', (e)=>{
                    if(e.target.className === 'task-item-check'){
                        e.target.parentElement.id = 'task-completed';
                    }
                    if(e.target.className === 'task-item-x'){
                        /* removing an element without resorting to the parentElement and removing childNode */
                        e.target.parentElement.outerHTML= "";
                    }
                });
            }
        }
    }
    /* END OF TASKS */

    /* MEALS */
    displayMeals(){
        console.log('Meals Displayed')
        this.highlightBooktab('meals');
    }
    /* END OF MEALS */

    /* FITNESS */
    /* displayFitness re-initializes the chart, and thus should be called when changes are made */
    displayFitness(){
        this.appWrapper.innerHTML = `
            <div class="app-heading" id="fitness-heading">Fitness</div>
                <div class="add-workout-wrapper">     
                </div>
            <div class="chart-wrapper">
                <canvas id="my-chart"></canvas>
            </div>
        `;
        this.appWrapper.id = 'app-fitness';
        this.fitnessHTML().addWorkoutBtn();
        this.fitnessEventListeners().addWorkoutBtn();
        this.getPieChart(true);

        this.highlightBooktab('fitness');
    }

    getPieChart(bool){
        if (bool){
            var ctx = document.querySelector('#my-chart').getContext('2d');
            var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'doughnut',

            // The data for our dataset
            data: {
                labels: ['Arms', 'Chest', 'Cardio'],
                datasets: [{
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 106, 1, 1)',
                        'rgba(15, 206, 200, 1)',
                    ],
                    borderWidth: 3,
                    data: [35,55,10]
                }],
            },
            // Configuration options go here
        options: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        fontColor: 'white',
                        fontSize: 18
                    },
                    position: 'bottom'
                },
            }
            });
            }
    }

    getWorkoutDetails(){
        const workoutWrapper = document.querySelector('.add-workout-wrapper');
        workoutWrapper.id = 'add-workout-wrapper-clicked';

        const heading = document.getElementById('fitness-heading');
        heading.style.marginBottom = '1rem';

        const workoutArr = ['Chest','Biceps','Triceps','Back','Legs','Cardio'];
        const timeArr = [30, 45, 60, 75, 90, 105, 120, 135];

        //Pure Functions?
        function createCheckbox(workout){
            //Add Error Checking? workout must be a string for .toLowerCase() to be called
            return `
            <label class="${workout.toLowerCase()}-checkbox">
                <div class="checkbox-wrapper">
                ${workout} <input type="checkbox">
                </div>
            </label>
            `
        }
        function createSelectOption(length){
            return `<option value="${length}">${length} Mins</option>`
        }

        let checkboxesHTML = '';
        workoutArr.forEach((e)=> checkboxesHTML += createCheckbox(e));
        let selectLengthHTML = '';
        timeArr.forEach((e)=> selectLengthHTML += createSelectOption(e));

        workoutWrapper.innerHTML = `
        <form class="big-checkbox-wrapper">
            ${checkboxesHTML}
        </form>
        <div class="fitness-input">
            <p>Workout Length</p>
            <select id="select-workout-length">
                ${selectLengthHTML}
            </select>
        </div>
            <div class="fitness-btns">
            </div>
        </div>
        `;
        /* Find a way to group these */
        //Closures for memory efficiency
        const getFitnessHTML = this.fitnessHTML();
        const getFitnessEventListeners = this.fitnessEventListeners();
        getFitnessHTML.submitBtn();
        getFitnessHTML.xBtn();
        getFitnessEventListeners.xBtn();
        getFitnessEventListeners.submitBtn();
    }

    //Not pure :(
    fitnessHTML(){
        //THIS DOES NOT WORK FOR SOME REASON: declared in parent function so it doesn't have to get deleted/recreated every time. Yay functional Programming
        const addWorkoutWrapper = document.querySelector('.add-workout-wrapper');
        const fitnessBtns = document.querySelector('.fitness-btns');
        return{
            addWorkoutBtn: function(){
                addWorkoutWrapper.innerHTML = `
                <div id="add-workout">Add Workout</div>
                `
            },
            submitBtn: function(){
                fitnessBtns.innerHTML = `
                <input type="button" value="Submit" id="fitness-submit-btn">
                `
            },
            xBtn: function(){
                fitnessBtns.innerHTML += `
                <input type="button" value="&#10006" id="fitness-x-btn">
                `
                
            }
        }
    }

    fitnessEventListeners(){
        const self = this;
        const workoutWrapper = document.querySelector('.add-workout-wrapper');
        return {
            addWorkoutBtn: function(){
                const btn = document.getElementById('add-workout');
                /* .bind(self) is really important as it allows this. on getWorkoutDetails to refer to the UI object, and not the element with the eventListner (btn in this case) */
                btn.addEventListener('click', self.getWorkoutDetails.bind(self));
            }
            ,
            xBtn: function(){
                const btn = document.getElementById('fitness-x-btn');
                btn.addEventListener('click', (e) =>{
                    e.preventDefault();
                    workoutWrapper.id = ''; /* clear styling */
                    self.fitnessHTML().addWorkoutBtn();
                    this.addWorkoutBtn();
                });
            },
            submitBtn: function(){
                const btn = document.getElementById('fitness-submit-btn');
                btn.addEventListener('click', (e)=>{
                    const selectLength = document.getElementById('select-workout-length');
                    const workoutLength = Number(selectLength.value);
                    console.log(workoutLength)

                    const checkboxForm = document.querySelector('.big-checkbox-wrapper');
                    const exerciseArr = [];
                    const regex = /[^-]*/;
                    for (let i = 0; i < checkboxForm.length; i++){
                        if(checkboxForm[i].checked){
                            let className = checkboxForm[i].parentElement.parentElement.classList[0];
                            exerciseArr.push(className.match(regex)[0]);
                        }
                    }
                    console.log(exerciseArr)
                    workoutWrapper.id = ''; /* clear styling */
                    self.fitnessHTML().addWorkoutBtn();
                    this.addWorkoutBtn();
                })
            }
        }
    }


    /* END OF FITNESS */

    /* FAMILY */
    displayFamily(){
        console.log('Family Displayed')
        this.highlightBooktab('family');
    }
    /* END OF FAMILY */

    /* WORK */
    displayWork(){
        console.log('Work Displayed')
        this.highlightBooktab('work');
    }
    /* END OF WORK */

    /* SELF */
    displaySelf(){
        console.log('Self Displayed')
        this.highlightBooktab('self');
    }
    /* END OF SELF */

    /* EXP */
    displayEXP(){
        console.log('EXP Displayed')
        this.highlightBooktab('exp');
    }
    /* END OF EXP */

    /* BOOKTAB EVENT LISTENERS */
    loadBtEventListeners(){
        /* Can't use an arrow function here because arrow functions change Scope */
        let self = this;
        this.booktabArr.forEach(function(e){
            let booktabHTML = document.querySelector(`.${e.toLowerCase()}-bt`);

                /* Converting String to Function without using eval();
                    eval() is bad practice because it is slower & a security risk */
                let fnString = `display${e}`;

                /* bracket notation instead of dot notation for self object, because bracket notation allows the use of a string */
                let retrieveFn = self[fnString];

                /* bind() MUST be used in order to bind 'this' as the object and not the booktabArr in the function being called */
                let boundFn = retrieveFn.bind(self);

            booktabHTML.addEventListener('click', boundFn);
        })
    }
    /* END OF BOOKTAB EVENT LISTENERS */
}

new UI();