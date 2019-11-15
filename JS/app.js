//Variables
const ui = new UI();
/* ui.displayOverview(); */
/* ui.displayFitness(); */
ui.displayTasks();
ui.loadBtEventListeners();

//Event Listeners
/* const amHours = document.querySelector('.am-hours');
amHours.addEventListener('click', firstClick); */
/* amHours.addEventListener('mouseleave', leftArea); */
//Fitness Add Activity
/* const fitAddActivity = document.querySelector('#add-workout');
fitAddActivity.addEventListener('click', fitAddActivityEvent); */


//Event Listener Functions
//First Click
let clicked = false;
function firstClick(e){
    let start;
    if(e.target.classList[0] == 'hour'){
        start = Number(e.target.textContent);
    } else{
    start = Number(e.target.classList[1].match(/\d+/)[0]);
    }

    if(secondClick(e, start)){
        return;
    }
    clicked = true;
}

//Second Click
function secondClick(e, start){
    let end;
    if(clicked){
        if(e.target.classList[0] == 'hour'){
            end = Number(e.target.textContent);
        } else{
        end = Number(e.target.classList[1].match(/\d+/)[0]);
        }
    clicked = false;
    ui.getEventDetails(start, end);
    return true;
    }
}

//Fit Add Activity Event
function fitAddActivityEvent(e){
    console.log(e.target)
}
