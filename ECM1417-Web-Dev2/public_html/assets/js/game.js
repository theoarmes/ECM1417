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
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
                    <img src='assets/emoji_assets/skin/${emoji.skin}' style='width:40px; display:block;'>
                    <img src='assets/emoji_assets/eyes/${emoji.eyes}' style='width:30px; display:block;'>
                    <img src='assets/emoji_assets/mouth/${emoji.mouth}' style='width:30px; display:block;'>
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

            // Award points when a match is found
            let pointsEarned = 10; // Each match earns 10 points
            totalPoints += pointsEarned;

            if (difficultySelect.value === "complex") {
                pointsPerLevel[currentLevel] = (pointsPerLevel[currentLevel] || 0) + pointsEarned;
            } else {
                pointsPerLevel = totalPoints;
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
        alert(`Congratulations! You completed the game with ${totalPoints} points!`);
    
        // Show results and submit button
        const resultDiv = document.createElement("div");
        resultDiv.innerHTML = `
            <h3>Game Completed!</h3>
            <p>Total Score: ${totalPoints}</p>
            <button id="submit-score">Submit Score</button>
        `;
        document.body.appendChild(resultDiv);
    
        // Ensure form elements exist
        const usernameInput = document.getElementById("username");
        const totalPointsInput = document.getElementById("total_points");
        const scoreForm = document.getElementById("score-form");
    
        if (scoreForm) {
            totalPointsInput.value = totalPoints; // Set the correct total score
    
            document.getElementById("submit-score").addEventListener("click", () => {
                scoreForm.submit(); // Submit the form with correct values
            });
        } else {
            console.error("Score form elements not found in the DOM.");
        }
    }

    startButton.addEventListener("click", () => {
        currentLevel = 1;
        totalPoints = 0;
        pointsPerLevel = {};
        initializeGame();
        startButton.style.display = "none";
    });
});
