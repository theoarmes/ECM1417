<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
$username = $_SESSION['username'] ?? $_COOKIE['username'] ?? null;
$bestScore = $_COOKIE['best_score'] ?? PHP_INT_MAX;
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pairs Game</title>
    <link rel="stylesheet" href="assets\css\style.css">
    <script defer src="assets\js\game.js"></script>
    <style>
        #main.gold-background {
            background-color: #FFD700;
        }
    </style>
</head>

<body>
    <?php include 'includes/navbar.php'; ?>
    <div id="main">
        <h2>Memory Pairs Game</h2>
        <button id="start-game">Start the game</button>
        <select id="difficulty">
            <option value="simple">Simple</option>
            <option value="medium">Medium</option>
            <option value="complex">Complex</option>
        </select>
        <div id="game-container"></div>
            <div id="game-board"></div>
            <div id="status-bar">
                <span id="timer">Time: 0s</span>
                <span id="score-counter">Points: 0</span>
            </div>
        </div>
        <form id="score-form" action="leaderboard.php" method="POST" style="display: none;">
            <input type="hidden" name="username" id="username"
                value="<?php echo htmlspecialchars($_SESSION['username'] ?? 'Guest'); ?>">
            <input type="hidden" name="total_points" id="total_points">
        </form>
    </div>

    <script>
        let startTime, timerInterval;

        document.getElementById("start-game").addEventListener("click", () => {
            startTime = Date.now();
            timerInterval = setInterval(updateTimer, 1000);
        });

        function updateTimer() {
            let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            document.getElementById("timer").textContent = "Time: " + elapsedTime + "s";
        }

        function checkBestScore(currentScore) {
            let bestScore = <?php echo json_encode($bestScore); ?>;
            if (currentScore < bestScore) {
                document.getElementById("main").classList.add("gold-background");
                document.cookie = "best_score=" + currentScore + "; path=/";
            }
        }
    </script>
</body>

</html>