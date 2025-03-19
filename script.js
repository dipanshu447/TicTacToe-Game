var boxes = document.querySelectorAll('.box');
var board = ["", "", "", "", "", "", "", "", ""];
var winCombo = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

var checkWinner = (player) => {
    for (let i = 0; i < winCombo.length; i++) {
        const [a, b, c] = winCombo[i];
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

// swtiching between X and O
let turn = true;
let player = "";
boxes.forEach((e) => {
    e.addEventListener("click", () => {
        let index = e.dataset.index;
        if(board[index] !== "") return;

        let XO = document.createElement('img');

        if (turn) {
            player = "X";
            XO.src = 'https://img.icons8.com/?size=100&id=pNXET7bXhanM&format=png&color=000000';
            XO.alt = 'X-img';
            board[index] = player;
        } else {
            player = "O";
            XO.src = 'https://img.icons8.com/?size=100&id=18722&format=png&color=8a2be2';
            XO.alt = 'circle-img';
            board[index] = player;
        }
        e.appendChild(XO);
        turn = !turn;
        console.log(board);
        console.log(checkWinner(player));
    })
}) 
