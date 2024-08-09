let input = document.getElementById("inputField");
let button = document.getElementById("add");
let toDoContainer = document.getElementById("toDoContainer");
let monster = document.getElementById("monster");
let monsterPicture = document.getElementById("monsterPicture");
let difficultyEasy = document.getElementById("difficultyEasy");
let difficultyMed = document.getElementById("difficultyMed");
let difficultyHard = document.getElementById("difficultyHard");
let initialImg = document.getElementById("questionMark");

let monsters = ["lucifer", "badidi", "papi"];
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

button.addEventListener('click', () => {

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

    //counts number of tasks
    taskCount++;

    //adds task
    var task = document.createElement("p");
    var difficulty;
    if (document.getElementById("difficultyEasy").checked){
        difficulty = "easy";
    } else if (document.getElementById("difficultyMed").checked){
        difficulty = "med";
    } else {
        difficulty = "hard";
    }

    // adds a style to said element
    task.classList.add("task-styling");
    task.innerText = `${taskCount}. ${input.value}`;
    toDoContainer.appendChild(task);

    //removes input
    input.value = "";
    difficultyEasy.checked = false;
    difficultyMed.checked = false;
    difficultyHard.checked = false;

  

    task.addEventListener('click', () => {
        if (task.style.textDecoration == "line-through"){
            task.style.textDecoration = "none";
        } else {
            task.style.textDecoration = "line-through";
        }
    })

    task.addEventListener("dblclick", () =>{
        toDoContainer.removeChild(task);
        if (difficulty === "easy"){
            health.value -= 1*levelNumber;
        } 
        else if (difficulty === "med"){
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

    // level.innerText = `level ${levelNumber}`;

})



//create a function for if a radio button is not checked, show an error