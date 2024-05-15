let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let startBtn = document.querySelector(".start");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let changeName = document.querySelector(".name");
const circleWin = document.querySelector(".circle-win");
const crossWin = document.querySelector(".cross-win");
const drawHogya = document.querySelector(".draw-hogya");

let turn0 = true;
let count = 0;
let winnerFlag = false;
let circleCounter = 0;
let crossCounter = 0;
let drawCounter = 0;

const winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    count++;
    // console.log(count);
    // console.log("box was clicked");

    if (turn0) {
      box.innerHTML = `<img class="blue" src="./assets/circle.png" alt="">`;
      changeName.innerHTML = "Player 1";
      turn0 = false;
    } else {
      box.innerHTML = `<img class="red" src="./assets/close.png" alt="">`;
      changeName.innerHTML = "Player 2";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
    if (count == 9 && winnerFlag == false) {
      showDraw();
      drawCounter++;
      drawHogya.innerHTML = `${drawCounter} Draws`;
    }
  });
});

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerHTML = `Winner -  ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const showDraw = () => {
  msg.innerHTML = `Match Draw `;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winningPattern) {
    // console.log(pattern);
    let pos1 = boxes[pattern[0]].innerHTML;
    let pos2 = boxes[pattern[1]].innerHTML;
    let pos3 = boxes[pattern[2]].innerHTML;
    // console.log(pos1, pos2 , pos3);
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        // console.log(pos1);
        winnerFlag = true;
        showWinner(pos1);
        if (pos1 === `<img class="blue" src="./assets/circle.png" alt="">`) {
          circleCounter++;
          circleWin.innerHTML = `${circleCounter} Wins`;
        }
        if (pos1 === `<img class="red" src="./assets/close.png" alt="">`) {
          crossCounter++;
          crossWin.innerHTML = `${crossCounter} Wins`;
        }
      }
    }
  }
};

const resetGame = () => {
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  count = 0;
  drawHogya.innerHTML = "0 Draws";
  circleWin.innerHTML = "0 Wins";
  crossWin.innerHTML = " 0 Wins";
};
const startGame = () => {
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  count = 0;
 
};

resetBtn.addEventListener("click", resetGame);
startBtn.addEventListener("click", startGame);
