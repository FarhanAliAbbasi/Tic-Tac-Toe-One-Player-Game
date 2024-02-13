let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#resetbtn");
let newbtn=document.querySelector("#newbtn");
let msgcontainer=document.querySelector(".msgcontainer");
let msg=document.querySelector("#msg");
let move_msg_container=document.querySelector(".move-msg-container");
let move_msg=document.querySelector("#move-msg");



move_msg.innerText="Your move";
let count =0;
let turnO=true; //playerO
let randomIndex;
let compChoice;



    // when this pattern match end of game due to win
const winningPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];


const genCompChoice=()=>{
    randomIndex = Math.floor(Math.random()*9);
    while(boxes[randomIndex].disabled === true){
        randomIndex = Math.floor(Math.random()*9);
    }
    return randomIndex;
  
   
};


        // if match tie remove hide class and show msgcontainer class
const matchTie=()=>{
    
   msg.innerText=`Match Tie, try again`;
   msgcontainer.classList.remove("hide");
   move_msg_container.classList.add("hide");
   disableBoxes();
};


            // if pattern match, select winner or match tie
const checkWinner = () => {
    if (count === 9) {
        matchTie();
    }
    
    for (let pattern of winningPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val);
            return; // Exit the function if a winner is found
        }
    }

    
};


const setCompChoice = () => {
        compChoice = genCompChoice();
        count++;
        boxes[compChoice].style.color = "#b09137";
        boxes[compChoice].innerText = "X";
        boxes[compChoice].disabled = true;
        move_msg.innerText = "Your move";
        turnO = true;

};




            // Switch turns, increase count, and check match or tie
boxes.forEach((box) => {
    box.addEventListener("click", () => { // Removed async keyword from here
        if (turnO) { // Player O's turn
            count++;
            box.style.color = "#b0413e";
            box.innerText = "O";
            turnO = false;
            box.disabled = true;
            move_msg.innerText = "Computer move";
            setCompChoice();
            checkWinner();
            
        }
    });
});




    // when any player win all boxes click disable
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
    
};


            //when reset or new game innertext remove and all boxes click enable and turn start from playerX
const enableBoxes=()=>{
    count=0;
	 move_msg.innerText = "Your move";
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }

};



            // when any player game and click reset game this function add hide property on msgcontainer class
const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgcontainer.classList.add("hide");
    move_msg_container.classList.remove("hide");
};






        // show winner and winner name
const showWinner=(winner)=>{
   msg.innerText=`Congratulations, Winner is ${winner}`;
   msgcontainer.classList.remove("hide");
   move_msg_container.classList.add("hide");
   disableBoxes();
};



        

        // if user click "new game" button
newbtn.addEventListener("click",resetGame);
        // if user click "reset game"  button
resetbtn.addEventListener("click",resetGame);