let ele = document.querySelector('.loading header');
let count = 0;
let textNode = ele.textContent;
let interval = setInterval(() => {
    count = (count + 1) % 4;
    ele.textContent = textNode + '.'.repeat(count);
}, 1000);
var delay = async () => {
    let randomload = (Math.floor(Math.random() * 3)) * 1000;
    return new Promise((resolve) => {
        setTimeout(() => {
            document.querySelector('.loading').classList.add('notdisplay');
            resolve();
        }, randomload);
    })
};
var boxes = document.querySelectorAll('.box');
var board = ["", "", "", "", "", "", "", "", ""];
var winCombo = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];
var annoncer = document.querySelector(".annoncer");
var checkWinner = (player) => {
    for (let i = 0; i < winCombo.length; i++) {
        const [a, b, c] = winCombo[i];
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}
let gameOver = false;
var makeMove = (index, player) => {
    if (board[index] === "" && !gameOver) {
        let XO = document.createElement('img');
        if (player === "X") {
            XO.src = 'https://img.icons8.com/?size=100&id=1510&format=png&color=ffffff';
            XO.alt = 'X-img';
            annoncer.innerText = "Player O's Turn";
        } else {
            XO.src = 'https://img.icons8.com/?size=100&id=TBVOsh5onJms&format=png&color=ffffff';
            XO.alt = 'circle-img';
            annoncer.innerText = "Player X's Turn";
        }
        boxes[index].appendChild(XO);
        clickSound.currentTime = 0;
        clickSound.play();
        board[index] = player;
        if (checkWinner(player)) {
            annoncer.innerText = `Player ${player} Won`;
            gameOver = true;
            win_game.play();
            document.querySelector('.restart').classList.remove('resHand');
        } else if (!board.includes("")) {
            gameOver = true;
            annoncer.innerText = "It's a Tie";
            tie_game.play();
            document.querySelector('.restart').classList.remove('resHand');
        }
    }
}

var ComputerMove = () => {
    let emptySpace = [];
    board.forEach((value, index) => {
        if (value === "") emptySpace.push(index);
    });
    const randomIndex = emptySpace[Math.floor(Math.random() * emptySpace.length)];
    if (board[randomIndex] === "" && !gameOver) {
        let computerPlayer = choice === "X" ? "O" : "X";
        clickSound.currentTime = 0;
        clickSound.play();
        board[randomIndex] = computerPlayer;
        let XO = document.createElement('img');
        if (computerPlayer === "X") {
            XO.src = 'https://img.icons8.com/?size=100&id=1510&format=png&color=ffffff';
            XO.alt = 'X-img';
            annoncer.innerText = "Player O's Turn";
        } else {
            XO.src = 'https://img.icons8.com/?size=100&id=TBVOsh5onJms&format=png&color=ffffff';
            XO.alt = 'circle-img';
            annoncer.innerText = "Player X's Turn";
        }
        boxes[randomIndex].appendChild(XO);
        if (checkWinner(computerPlayer)) {
            annoncer.innerText = `Player ${computerPlayer} (Computer) Won`;
            gameOver = true;    
            tie_game.play();
            document.querySelector('.restart').classList.remove('resHand');
        } else if (!board.includes("")) {
            gameOver = true;
            annoncer.innerText = "It's a Tie";
            tie_game.play();
            document.querySelector('.restart').classList.remove('resHand');
        }
    }
}

let restartGame = async () => {
    document.querySelectorAll('.e').forEach(e => e.classList.toggle('disHand'))
    document.querySelector('.restart').classList.add('resHand');
    document.querySelector('.loading').classList.remove('notdisplay');
    clickSound.currentTime = 0;
    clickSound.play();
    await delay();
    location.reload();
}

// games sounds effects
var clickSound = new Audio('./assets/Click_sound.wav');
var tie_game = new Audio('./assets/game_tie_sound.mp3');
var win_game = new Audio('./assets/win_gamesound.mp3');

var choice;
(async function () {
    var startbtn = document.querySelectorAll('.btn button');
    var turn;
    var computer = false;
    startbtn.forEach(e => {
        e.addEventListener("click", async () => {
            choice = e.dataset.choice;
            computer = choice !== "Pvp";
            turn = choice === "X";
            annoncer.innerText = turn ? "Player X's Turn" : "Player O's Turn";
            document.querySelectorAll('.overlay')[0].classList.toggle('notdisplay');
            document.querySelector('.loading').classList.remove('notdisplay');
            clickSound.currentTime = 0;
            clickSound.play();
            await delay();
            document.querySelectorAll('.disHand').forEach(e => e.classList.toggle('disHand'))
        })
    })

    // swtiching between X and O
    let player = "";
    boxes.forEach((e) => {
        e.addEventListener("click", () => {
            if (e.children.length > 0) return;
            let index = e.dataset.index;
            if (board[index] !== "") return;

            if (!gameOver) {
                if(!computer) {
                    player = turn ? "X" : "O";
                    makeMove(index, player);
                    turn = !turn;
                }else {
                    player = turn ? "X" : "O";
                    makeMove(index, player);
                    setTimeout(() => {
                        ComputerMove();
                    }, 500);
                }
            }
        })
    })

    document.querySelector('.restart button').addEventListener("click", () => {
        restartGame();
    })
})()