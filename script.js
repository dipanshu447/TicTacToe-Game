var boxes = document.querySelectorAll('.box');

// swtiching between X and O
let turn = true;
boxes.forEach((e) => {
    e.addEventListener("click", () => {
        if (e.children.length === 0) {
            let XO = document.createElement('img');
            if (turn) {
                XO.src = 'https://img.icons8.com/?size=100&id=pNXET7bXhanM&format=png&color=000000';
                XO.alt = 'X-img';
            } else {
                XO.src = 'https://img.icons8.com/?size=100&id=18722&format=png&color=8a2be2';
                XO.alt = 'circle-img';
            }
            e.appendChild(XO);
            turn = !turn;
        }
    })
})