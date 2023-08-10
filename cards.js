var errors = 0;
var cardList = [
    "moehammadhatta",
    "cutnyakdien",
    "diponegoro",
    "kartini",
    "tanmalaka",
    "kihajardewantara",
    "sutomo",
    "agussalim",
    "radensaleh",
    "soekarno"
];

var cardSet = [];
var board = [];
var rows = 4;
var columns = 5;

var flippedCards = [];

window.onload = function() {
    initializeGame();
};

function initializeGame() {
    cardSet = shuffleCards(cardList.concat(cardList));
    createBoard();
    setTimeout(hideAllCards, 1000);
}

function shuffleCards(array) {
    var shuffledArray = array.slice();
    for (var i = shuffledArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function createBoard() {
    var boardElement = document.getElementById("board");
    for (var r = 0; r < rows; r++) {
        var row = [];
        for (var c = 0; c < columns; c++) {
            var cardImg = cardSet.pop();
            var cardId = r + "-" + c;

            var card = document.createElement("img");
            card.id = cardId;
            card.src = "back.jpg";
            card.classList.add("card");
            card.addEventListener("click", function() {
                selectCard(this);
            });

            row.push({ id: cardId, value: cardImg });
            boardElement.appendChild(card);
        }
        board.push(row);
    }
}

function hideAllCards() {
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            var cardId = r + "-" + c;
            var card = document.getElementById(cardId);
            card.src = "back.jpg";
        }
    }
}

function checkWinCondition() {
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            var cardId = r + "-" + c;
            var card = document.getElementById(cardId);
            if (card.src.includes("back")) {
                return false;
            }
        }
    }
    return true;
}

function resetBoard() {
    var boardElement = document.getElementById("board");
    boardElement.innerHTML = "";

    flippedCards = [];
    errors = 0;
    document.getElementById("errors").innerText = errors;

    initializeGame();
}

function selectCard(selectedCard) {
    if (flippedCards.length < 2 && !flippedCards.includes(selectedCard)) {
        var coords = selectedCard.id.split("-");
        var r = parseInt(coords[0]);
        var c = parseInt(coords[1]);

        selectedCard.src = board[r][c].value + ".png";
        flippedCards.push(selectedCard);

        if (flippedCards.length === 2) {
            setTimeout(function() {
                update(flippedCards);

                if (checkWinCondition()) {
                    setTimeout(function() {
                        resetBoard();
                    }, 1000);
                }
            }, 1000);
        }
    }
}


function update(flippedCards) {
    var [card1, card2] = flippedCards;
    var coords1 = card1.id.split("-");
    var coords2 = card2.id.split("-");
    var r1 = parseInt(coords1[0]);
    var c1 = parseInt(coords1[1]);
    var r2 = parseInt(coords2[0]);
    var c2 = parseInt(coords2[1]);

    if (board[r1][c1].value !== board[r2][c2].value) {
        card1.src = "back.jpg";
        card2.src = "back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }

    flippedCards.pop();
    flippedCards.pop();
}
