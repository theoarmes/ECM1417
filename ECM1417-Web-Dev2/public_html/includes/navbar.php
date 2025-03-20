<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
// Debugging: Print session data to see if avatar is stored correctly
echo "<!-- Debugging Session Data -->";
echo "<!-- ";
print_r($_SESSION['avatar']);
echo " -->";

// Ensure avatar data exists
if (!isset($_SESSION['avatar']) || !isset($_SESSION['avatar']['skin'], $_SESSION['avatar']['eyes'], $_SESSION['avatar']['mouth'])) {
    $_SESSION['avatar'] = [
        'skin' => 'default-skin.png',
        'eyes' => 'default-eyes.png',
        'mouth' => 'default-mouth.png'
    ];
}

// Assign variables safely
$username = $_SESSION["username"] ?? null;
$skin = $_SESSION['avatar']['skin'] ?? 'default-skin.png';
$eyes = $_SESSION['avatar']['eyes'] ?? 'default-eyes.png';
$mouth = $_SESSION['avatar']['mouth'] ?? 'default-mouth.png';

// Debugging: Output actual paths
echo "<!-- Debug Avatar Paths: Skin: $skin | Eyes: $eyes | Mouth: $mouth -->";
?>

<nav>
    <div class="left">
        <a href="index.php">Home</a>
    </div>

    
    <div class="emoji" style="
        background-image: 
            url('assets/emoji_assets/mouth/<?php echo htmlspecialchars($mouth); ?>'),
            url('assets/emoji_assets/eyes/<?php echo htmlspecialchars($eyes); ?>'),
            url('assets/emoji_assets/skin/<?php echo htmlspecialchars($skin); ?>');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        width: 60px;
        height: 60px;
    ">
    </div>
    

    <div class="right">
        <a href="pairs.php">Play Pairs</a>
        <?php if ($username): ?>
            <a href="leaderboard.php">Leaderboard</a>
        <?php else: ?>
            <a href="registration.php">Register</a>
        <?php endif; ?>
    </div>
</nav>
