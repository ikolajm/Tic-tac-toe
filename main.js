// FLOW OF GAME
// 1) Choose X or O
// 2) Flip coin to see who goes first
// 3) IF PLAYER FIRST - ADD LISTENERS AND INIT NEXT TURN
//    -> ELSE COMPUTER TURN AND INIT NEXR TURN

// 4) **Check for win**


// 5) Run nextTurn
// 6) Repeat until win

// ===========
// Variable init

// No winner by default
let gameWon = false;
let player;
let playerPiece;
let userMoves = [];
let computer;
let computerPiece;
let computerMoves = [];
let gameZones;
let currentPlayer;
let currentZone;
let choice;
let goFirst;
let xText;
const gameBoard = document.querySelector(".game-board");
const compThought = document.querySelector(".comp-thought");
const gamePiece = document.querySelectorAll(".player-piece");
const reset = document.querySelector("#reset");

// ===========
// Game Start Logic

  // Player must choose X's or O's - this shows the game board
    // Add event listeners for click, on click run player piece function
    for (let i = 0; i < gamePiece.length; i++) {
      gamePiece[i].addEventListener("click", playerSelect);
    }

    // Function to set player piece and show game board
    function playerSelect() {
      // Set player piece
      xText = "X";
      (this.textContent.toString().trim() === xText.toString().trim() ? player = "X" : player = "O");

      // Set computer piece
      (player === "X" ? computer = "O" : computer = "X");
      // Check player mark, set player and computer accordingly
        // Set player game piece HTML
        if (player === "X") {
          playerPiece = "<div class='game-piece'>" +
                          "<i class='fas fa-times'></i>" +
                        "</div>"
        } else {
          playerPiece = "<div class='game-piece'>" +
                          "<i class='far fa-circle'></i>" +
                        "</div>";
        }
        // Set computer game piece HTML
        if (player === "X") {
          computerPiece = "<div class='game-piece'>" +
                            "<i class='far fa-circle'></i>" +
                          "</div>"
        } else {
          computerPiece = "<div class='game-piece'>" +
                            "<i class='fas fa-times'></i>" +
                          "</div>";
        }
      // Show game board
      gameBoard.style.display = "flex";
      // Run a coin flip function to choose who goes first
      coinFlip();
    }

    // Function to decide who goes first
    function coinFlip() {
      // Reset all variables if player is looking for a restart
        // Clear inner html of all game zones
        gameZones = [zone1, zone2, zone3,
                    zone4, zone5, zone6,
                    zone7, zone8, zone9];
        gameZones.forEach(function(zone) {
          zone.innerHTML = "";
        });
        userMoves = [];
        computerMoves = [];
      const coin = ["Heads", "Tails"];
      // Show prompt to have player choose heads or tails
      choice = prompt("Lets flip a coin - Heads or Tails?").toString().toUpperCase();
      // Set variable for random function
      const random = Math.floor(Math.random() * coin.length);
      // Flip variable is the result of flipped coin
      const flip = coin[random].toString().toUpperCase();
      // If your choice matches the coin flip, you can go first
      (choice === flip ? goFirst = "true" : goFirst = "false");
      // If you get to go first, run go first function, if not, computer goes first
      (goFirst === "true" ? playerFirst() : computerFirst());
      // Tell player in console who goes first
      (goFirst === "true" ? alert("You won the flip, make the first move!") : alert("You lost the flip, the computer will make the first move!"));
    }

    // ========================================
    // Set current player depending on coin flip
    function playerFirst() {
      currentPlayer = "player";
      nextTurn();
    }

    function computerFirst() {
      currentPlayer = "computer";
      nextTurn();
    }

// ===========
// Gameboard logic

  // Initialize zones
  const zone1 = document.querySelector("#zone1");
  const zone2 = document.querySelector("#zone2");
  const zone3 = document.querySelector("#zone3");
  const zone4 = document.querySelector("#zone4");
  const zone5 = document.querySelector("#zone5");
  const zone6 = document.querySelector("#zone6");
  const zone7 = document.querySelector("#zone7");
  const zone8 = document.querySelector("#zone8");
  const zone9 = document.querySelector("#zone9");

  // Initialize gameboard
  gameZones = [zone1, zone2, zone3,
              zone4, zone5, zone6,
              zone7, zone8, zone9];

  // ==================
  // Listener functions

    // Add listeners
    function addListeners() {
      // Add event listeners for each zone
      gameZones.forEach(function(zone) {
        zone.addEventListener("click", placeZone);
      });
    }
    // Remove listeners
    function removeListeners() {
      // Add event listeners for each zone
      gameZones.forEach(function(zone) {
        zone.removeEventListener("click", placeZone);
      });
    }

  // Place player game piece in clicked zone
  function placeZone() {
    // Append game piece to zone
    this.innerHTML += playerPiece;
    // Add zone to player played array
    userMoves.push(this);

    // Remove zone from playable array
    currentZone = gameZones.indexOf(this);
    if (currentZone > -1) {
      gameZones.splice(currentZone, 1);
    }

    // Remove event listener from played zone
    this.removeEventListener("click", placeZone);
    // End player turn
    playerTurnEnd();
  }

// ===========
// Next turn logic

  function nextTurn() {
    if (currentPlayer === "player") {
      // User move logic
      playerTurnStart();
    } else {
      // Computer move logic
      compThought.style.display = "block";
      setTimeout(function() {
        compThought.style.display = "none";
        let computerGZInit = gameZones[Math.floor(Math.random() * gameZones.length)];
        // Choose random zone
        let computerZone = computerGZInit;
        // Append move to zone
        computerZone.innerHTML += computerPiece;
        // Add zone to computerMoves array
        computerMoves.push(computerZone);
        // Remove zone from playable array
        currentZone = gameZones.indexOf(computerZone);
        if (currentZone > -1) {
          gameZones.splice(currentZone, 1);
        }
        // check end game
        checkEndGame();
      }, 1500);
    }
  }

  function playerTurnStart() {
    // Add listeners to board
    // listen for click and then process
    addListeners();
  }

  function playerTurnEnd() {
    // Remove listeners from board for player
    removeListeners();
    // Check for win, if no win you switch current players and play next turn
    checkEndGame();
  }

// ===========
// Win Logic

  // Set win conditions
  const up = [zone1, zone2, zone3];
  const mid = [zone4, zone5, zone6];
  const bottom = [zone7, zone8, zone9];
  const diagLeft = [zone1, zone4, zone7];
  const vLeft = [zone1, zone5, zone9];
  const vMid = [zone2, zone5, zone8];
  const vRight = [zone3, zone6, zone9];
  const diagRight = [zone3, zone5, zone7];

  let winners = [up, mid, bottom, diagLeft, vLeft, vMid, vRight, diagRight];

  function checkEndGame() {
    // Check to see if a win has taken place
    if (currentPlayer === "player") {
      // See if items in user moves index contains that of a win condition
      checkArray(userMoves);
    } else {
      // See if items in user moves index contains that of a win condition
      checkArray(computerMoves);
    }
    // If yes, win condition
    if (gameWon === true) {
      setTimeout(function() {
        alert(currentPlayer + " has won!  To replay click the reset button!");
      }, 300);
    } else {
      // Switch current player
      (currentPlayer === "player" ? currentPlayer = "computer" : currentPlayer = "player");
      nextTurn();
    }
  }

  function checkArray(moveArray) {

    // See if 3 moves are made at least
    if (moveArray.length >= 3) {
        // check if any 'winners' are also in your selections
        for (i = 0; i < winners.length; i++) {
            let sets = winners[i];  // sets = winning possibilities
            let setFound = true; //setFound shows there are sets

            // Loop through each index in set
            for (r = 0; r < sets.length; r++) {
                // check if number is in current players hand
                // if not, break, not winner
                let found = false;

                // players hand
                for (s = 0; s < moveArray.length; s++) {
                    if (sets[r] == moveArray[s]) {
                        found = true;
                    }
                }

                // value not found in players hand
                // not a valid set, move on
                if (found == false) {
                    setFound = false;
                }

            }
            if (setFound == true) {
                gameWon = true;
            }
        }
    }
    return gameWon;
  }


// =============
// Reset Logic

  reset.addEventListener("click", restart);

  function restart() {
    // Clear inner html of all game zones
    gameZones = [zone1, zone2, zone3,
                zone4, zone5, zone6,
                zone7, zone8, zone9];
    gameZones.forEach(function(zone) {
      zone.innerHTML = "";
    });
    userMoves = [];
    computerMoves = [];
    // Coin flip functions
    coinFlip();
  }
