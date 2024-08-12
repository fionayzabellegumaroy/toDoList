let input = document.getElementById("inputField");
let button = document.getElementById("add");
let boxContainer = document.getElementById("boxContainer");
let monster = document.getElementById("monster");
let monsterPicture = document.getElementById("monsterPicture");
let difficultyEasy = document.getElementById("difficultyEasy");
let difficultyMed = document.getElementById("difficultyMed");
let difficultyHard = document.getElementById("difficultyHard");
let initialImg = document.getElementById("questionMark");
let container = document.getElementById("container");
let instructionsButton = document.getElementById("instructionsButton");
let errorRateContainer = document.getElementById("errorRateContainer");
let errorInputContainer = document.getElementById("errorInputContainer")
let instructionsContainer = document.getElementById("instructionsContainer");
let rateXButton = document.getElementById("rateXButton");
let inputXButton = document.getElementById("inputXButton");
let toDoContainer = document.getElementById("toDoContainer");
let instructionsReopenButton = document.getElementById("instructionsReopenButton");

let monsters = ["lucifer", "badidi", "papi"];
let radios = [difficultyEasy, difficultyMed, difficultyHard];
var monsterImg = document.createElement("img");

let randomNum = Math.floor(Math.random() * monsters.length);

let health = document.getElementById("health");
    //sets it invisbible at first
    health.style.opacity = "0";

    let maxNumber = 5;
    health.value = maxNumber;
    health.max = maxNumber;
    
let levelNumber = 1;
let taskCount = 0;

input.style.display = "none";
button.style.display = "none";
button.disabled = true;

radios.forEach((radio) => {
    radio.addEventListener("input", function(e){
        if (radio.checked == true){
            input.style.display = "inline-block";
            button.style.display = "inline-block";

            input.addEventListener("input", function(e){
                if (input.value.length > 0){          
                    button.disabled = false;
                } else {
                    button.disabled = true;
                }
            }) 
        }
    })
})

//closes instruction window
instructionsButton.addEventListener('click', () =>{
    instructionsContainer.style.display = "none";
    boxContainer.style.display = "block";
})

//reopens instruction window
instructionsReopenButton.addEventListener('click', () =>{
    instructionsContainer.style.display = "block";
    boxContainer.style.display = "none";
})


//task array and class
var tasksArray = [];

class Task {
    constructor(task, difficulty) {
      this._task = task;
      this._difficulty = difficulty;

    }

    get task() {
      return this._task;
    }
    
    get difficulty() {
      return this._difficulty;
    }
}

//function to find task in array
function findTask(tasksArray, actualTask){
    for (let i = 0; i < tasksArray.length; i++){
        var task = tasksArray[i];
        if (task._task == actualTask){ //maybe .equals
            return task;
        };
    }
}
  

button.addEventListener('click', () => {

    taskCount++;

    //adds initial task!
    var taskToBeAdded = document.createElement("p");
    var difficulty;
    if (document.getElementById("difficultyEasy").checked){
        difficulty = "easy";
    } else if (document.getElementById("difficultyMed").checked){
        difficulty = "med";
    } else {
        difficulty = "hard";
    }

    // adds a style to said element
    taskToBeAdded.classList.add("task-styling");
    taskToBeAdded.innerText = `${input.value}`;
    toDoContainer.appendChild(taskToBeAdded);

    //creates a task object to add to the array
    var taskObject = new Task(taskToBeAdded.innerText, difficulty);
    tasksArray.push(taskObject);

    //resets inputs
    button.disabled = "true"; 
    input.style.display = "none";
    button.style.display = "none";
    input.value = "";
    difficultyEasy.checked = false;
    difficultyMed.checked = false;
    difficultyHard.checked = false;   
 
    //makes health visible
    health.style.opacity = "100";
    monster.style.opacity = "100";
    
    //randomize monster
    monster.innerText = monsters[randomNum];

    // //remove initial picture
    if (monsterPicture.querySelector(".initialImg")){
        monsterPicture.removeChild(initialImg);
    } else if (monsterPicture.querySelector(".monsterImg")){
        monsterPicture.removeChild(monsterImg);
    }

    //monsterPicture
        if (randomNum == 0){
            monsterImg.src = "lucifer.gif";
            monsterImg.style.backgroundColor = "lightblue";
        } else if (randomNum == 1){
            monsterImg.src = "badidi.gif";
            monsterImg.style.backgroundColor = "lightpink";
        } else {
            monsterImg.src = "papi.gif";
            monsterImg.style.backgroundColor = "lightyellow";
        }

        //adds style to monsterImg and adds it
        monsterImg.style.maxHeight = "300px";
        monsterImg.style.border = "black solid 2px";
        monsterImg.style.padding = "10px";
        monsterImg.classList.add("monsterImg");
        monsterPicture.appendChild(monsterImg);

    //xbutton click
    rateXButton.addEventListener('click', ()=> {
        errorRateContainer.style.display = "none";
    })

    inputXButton.addEventListener('click', ()=> {
        errorInputContainer.style.display = "none";
    })

    radios.forEach((radio) => {
        radio.addEventListener("input", function(e){
            if (radio.checked == true){
                input.style.display = "inline-block";
                button.style.display = "inline-block";
    
                input.addEventListener("input", function(e){
                    if (input.value.length > 0){          
                        button.disabled = false;
                    } else {
                        button.disabled = true;
                    }
                }) 
            }
        })
    })
   
    
    
    taskToBeAdded.addEventListener('click', () => {
        if (taskToBeAdded.style.textDecoration == "line-through"){
            taskToBeAdded.style.textDecoration = "none";
        } else {
            taskToBeAdded.style.textDecoration = "line-through";
        }
    })

    taskToBeAdded.addEventListener("dblclick", (event) =>{
            
        var taskInQuestion = findTask(tasksArray, event.target.innerText); //idk about task.value!!
        
        tasksArray.pop(taskInQuestion);
        toDoContainer.removeChild(taskToBeAdded);
            
        if (taskInQuestion._difficulty === "easy"){
            health.value -= 1*levelNumber;
        } 
        else if (taskInQuestion._difficulty === "med"){
            health.value -= 2*levelNumber;
        } 
        else {
            health.value -= 3*levelNumber;
        } 
                
            //decreases task count
            taskCount--;
    
            if (health.value <= 0){
                monsterImg.src = "questionMark.gif";
                monsterImg.style.backgroundColor = "lightyellow";
    
                maxNumber += maxNumber*3;
                health.max = maxNumber;
                health.value = maxNumber;
                levelNumber += 1;
    
    
                //randomize monster
                randomNum = Math.floor(Math.random() * monsters.length);
                monster.innerText = monsters[randomNum];
    
                health.style.opacity = "0";
                monster.style.opacity = "0";

            }
    })
})

//maybe do an animation once monster dies!

//create an instructions button to reopen
