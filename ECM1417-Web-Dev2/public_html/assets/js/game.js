// game.js - Full implementation of Pairs Game Logic with Emoji Assets and Difficulty Levels

document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const startButton = document.getElementById("start-game");
    const difficultySelect = document.getElementById("difficulty") || { value: "simple" };
    const scoreForm = document.getElementById("score-form");
    let attempts = 0;
    let matchedSets = 0;
    let flippedCards = [];
    let cardSet = [];
    let currentLevel = 1;
    let totalPoints = 0;
    let pointsPerLevel = {}; // Used only in Complex Mode
    let highScore = localStorage.getItem("highScore") || 0;

    const emojiParts = {
        skin: ["green.png", "red.png", "yellow.png"],
        eyes: ["closed.png", "laughing.png", "long.png", "normal.png", "rolling.png", "winking.png"],
        mouth: ["open.png", "sad.png", "smiling.png", "straight.png", "surprise.png", "teeth.png"]
    };

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function generateEmojiSet(pairs) {
        const emojis = [];
        for (let i = 0; i < pairs; i++) {
            const emoji = {
                skin: emojiParts.skin[Math.floor(Math.random() * emojiParts.skin.length)],
                eyes: emojiParts.eyes[Math.floor(Math.random() * emojiParts.eyes.length)],
                mouth: emojiParts.mouth[Math.floor(Math.random() * emojiParts.mouth.length)]
            };
            emojis.push(emoji, emoji);
        }
        return shuffle(emojis);
    }

    function initializeGame() {
        gameBoard.innerHTML = "";
        attempts = 0;
        matchedSets = 0;
        flippedCards = [];
        
        let pairs;
        if (difficultySelect.value === "simple") {
            pairs = 3;
        } else if (difficultySelect.value === "medium") {
            pairs = 5;
        } else {
            pairs = 2 + currentLevel;
        }

        cardSet = generateEmojiSet(pairs);
        maxAttempts = (pairs * 2) + 2;
        cardSet.forEach((emoji, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.index = index;
            card.dataset.emoji = JSON.stringify(emoji);
            card.innerHTML = "?";
            card.addEventListener("click", flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (!this.classList.contains("flipped") && flippedCards.length < 2) {
            this.classList.add("flipped");
            const emoji = JSON.parse(this.dataset.emoji);
    
            this.innerHTML = `
                <div class="emoji">
                    <img class="skin" src="assets/emoji_assets/skin/${emoji.skin}" alt="Skin">
                    <img class="eyes" src="assets/emoji_assets/eyes/${emoji.eyes}" alt="Eyes">
                    <img class="mouth" src="assets/emoji_assets/mouth/${emoji.mouth}" alt="Mouth">
                </div>
            `;

            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    function checkMatch() {
        attempts++;
        const [card1, card2] = flippedCards;
    
        if (attempts >= maxAttempts) {
            endGame("Game Over! You've reached the max attempts.");
            return;
        }
    
        if (card1.dataset.emoji === card2.dataset.emoji) {
            matchedSets++;
            flippedCards = [];
    
            let pointsEarned = 10;
            totalPoints += pointsEarned;
    
            if (difficultySelect.value === "complex") {
                pointsPerLevel[currentLevel] = (pointsPerLevel[currentLevel] || 0) + pointsEarned;
            } else {
                pointsPerLevel = totalPoints;
            }

            updateScoreDisplay(); 
    
            // **Check if high score is beaten**
            if (totalPoints > highScore) {
                highScore = totalPoints;
                localStorage.setItem("highScore", highScore);
                document.getElementById("game-board").style.backgroundColor = "#FFD700"; // Gold background
                document.getElementById("main").style.backgroundColor = "#FFD700"; 
            }
    
            if (matchedSets === cardSet.length / 2) {
                if (difficultySelect.value === "complex") {
                    alert(`Level ${currentLevel} completed! Points Earned: ${pointsPerLevel[currentLevel]}`);
                    currentLevel++;
                    initializeGame();
                } else {
                    endGame();
                }
            }
        } else {
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1.innerHTML = "?";
                card2.innerHTML = "?";
                flippedCards = [];
            }, 1000);
        }
    }

    function endGame() {
        const gameContainer = document.getElementById("game-container");
        const resultDiv = document.createElement("div");
        resultDiv.id = "game-result";
        
        resultDiv.innerHTML = `
            <h3>Game Completed!</h3>
            <p>Total Score: <span id="final-score">${totalPoints}</span></p>
            <button id="submit-score">Submit Score</button>
            <button id="reset-game">Reset Game</button>
        `;

        
        // Remove any existing result div
        const existingResultDiv = document.getElementById("game-result");
        if (existingResultDiv) {
            existingResultDiv.remove();
        }
    
        gameContainer.appendChild(resultDiv);

        // Ensure the event listener is added after the button exists
        setTimeout(() => {
            const resetBtn = document.getElementById("reset-game");
            if (resetBtn) {
                resetBtn.addEventListener("click", () => {
                    location.reload();
                });
            } else {
                console.error("Reset button not found in the DOM.");
            }
        }, 100);
        
        // Ensure form elements exist
        const totalPointsInput = document.getElementById("total_points");
        const scoreForm = document.getElementById("score-form");
    
        if (scoreForm) {
            totalPointsInput.value = totalPoints; // Set the correct total score
            document.getElementById("submit-score").addEventListener("click", () => {
                scoreForm.submit();
            });
        } else {
            console.error("Score form elements not found in the DOM.");
        }
    }

    function updateScoreDisplay() {
        document.getElementById("score-counter").innerText = `Points: ${totalPoints}`;
    }


    startButton.addEventListener("click", () => {
        currentLevel = 1;
        totalPoints = 0;
        pointsPerLevel = {};
        initializeGame();
        startButton.style.display = "none";
        document.getElementById("status-bar").style.display = "flex";
    });
    
});
