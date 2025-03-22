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

(async function () {
    var startbtn = document.querySelectorAll('.btn button');
    var choice;
    var turn;
    startbtn.forEach(e => {
        e.addEventListener("click", async () => {
            choice = e.dataset.choice;
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

            let XO = document.createElement('img');
            if (!gameOver) {
                if (turn) {
                    player = "X";
                    XO.src = 'https://img.icons8.com/?size=100&id=1510&format=png&color=ffffff';
                    XO.alt = 'X-img';
                    annoncer.innerText = "Player O's Turn";
                    makeMove(index, player);
                } else {
                    player = "O";
                    XO.src = 'https://img.icons8.com/?size=100&id=TBVOsh5onJms&format=png&color=ffffff';
                    XO.alt = 'circle-img';
                    annoncer.innerText = "Player X's Turn";
                    makeMove(index, player);
                }
                e.appendChild(XO);
                turn = !turn;
            }
        })
    })

    document.querySelector('.restart button').addEventListener("click", () => {
        restartGame();
    })
})()