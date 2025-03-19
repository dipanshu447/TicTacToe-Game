var boxes = document.querySelectorAll('.box');
var board = ["", "", "", "", "", "", "", "", ""];
var winCombo = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];
var annoncer = document.getElementsByTagName("header")[0];

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
        board[index] = player;
        if (checkWinner(player)) {
            annoncer.innerText = `Player ${player} Won`;
            gameOver = true;
        } else if (!board.includes("")) {
            gameOver = true;
            annoncer.innerText = "It's a Tie";
        }
    }
}

// swtiching between X and O
let turn = true;
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
                XO.src = 'https://img.icons8.com/?size=100&id=pNXET7bXhanM&format=png&color=000000';
                XO.alt = 'X-img';
                annoncer.innerText = "Player O's Turn";
                makeMove(index, player);
            } else {
                player = "O";
                XO.src = 'https://img.icons8.com/?size=100&id=18722&format=png&color=8a2be2';
                XO.alt = 'circle-img';
                annoncer.innerText = "Player X's Turn";
                makeMove(index, player);
            }
            e.appendChild(XO);
            turn = !turn;
        }

        console.log(board);
        console.log(checkWinner(player));
    })
}) 
