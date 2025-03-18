<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
$username = $_SESSION['username'] ?? $_COOKIE['username'] ?? null;
$avatar = $_SESSION['avatar'] ?? $_COOKIE['avatar'] ?? 'default.png';
?>

<nav>
    <a href="index.php" name="home">Home</a>
    <div style="display: flex; align-items: center;">
        <?php if ($username): ?>
            <a href="pairs.php" name="memory">Play Pairs</a>
            <a href="leaderboard.php" name="leaderboard">Leaderboard</a>
            <span style="margin-left: 10px; display: flex; align-items: center;">
                <img src="avatars/<?php echo htmlspecialchars($avatar); ?>" alt="User Avatar" width="30"
                    style="border-radius: 50%; margin-right: 5px;">
                <strong><?php echo htmlspecialchars($username); ?></strong>
            </span>
        <?php else: ?>
            <a href="registration.php" name="register">Register</a>
        <?php endif; ?>
    </div>
</nav>