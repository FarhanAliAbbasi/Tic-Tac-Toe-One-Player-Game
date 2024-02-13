
// Initialize variables
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newbtn = document.querySelector("#newbtn");
let msgcontainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");
let move_msg_container = document.querySelector(".move-msg-container");
let move_msg = document.querySelector("#move-msg");

let count = 0;
let playerTurn = true; // true for player O, false for player X

const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];



// Generates a random index for computer's move
const genCompChoice = () => {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * 9);
    } while (boxes[randomIndex].disabled);
    return randomIndex;
};

// Checks if a player has won
const checkWinner = () => {

    for (let pattern of winningPatterns) {
        const [pos1, pos2, pos3] = pattern;
        const pos1val = boxes[pos1].innerText;
        if (pos1val !== "" &&
            pos1val === boxes[pos2].innerText &&
            pos1val === boxes[pos3].innerText) {
            showWinner(pos1val);
            return true; // Winner found
        }
    }
	
	 if (count === 9) {
        matchTie();
		 return true;
    }
    return false; 
};

// Sets the computer's move
const setCompChoice = () => {
    const compChoice = genCompChoice();
	 boxes[compChoice].style.color = "#b09137";
    boxes[compChoice].innerText = "X";
    boxes[compChoice].disabled = true;
    move_msg.innerText = "Your move";
    playerTurn = true;
    count++;
    checkWinner();
};

        // if match tie remove hide class and show msgcontainer class
const matchTie=()=>{
   msg.innerText=`Match Tie, try again`;
   msgcontainer.classList.remove("hide");
   move_msg_container.classList.add("hide");
   disableBoxes();
};

// Disables all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enables all boxes and resets the game state
const enableBoxes = () => {
    count = 0;
    playerTurn = true;
    move_msg.innerText = "Your move";
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Shows the winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    move_msg_container.classList.add("hide");
    disableBoxes();
};

// Resets the game
const resetGame = () => {
    enableBoxes();
    msgcontainer.classList.add("hide");
    move_msg_container.classList.remove("hide");
};

// Event listeners

// Box click event
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (playerTurn && box.innerText === "") {
			   box.style.color = "#b0413e";
            box.innerText = "O";
            box.disabled = true;
            move_msg.innerText = "Computer move";
            playerTurn = false;
            count++;
            checkWinner();
            if (!checkWinner() && count < 9) {
					setTimeout(setCompChoice,500);
                // setCompChoice();
            }
			  
        }
    });
});

// New game button click event
newbtn.addEventListener("click", resetGame);

// Reset button click event
resetbtn.addEventListener("click", resetGame);
