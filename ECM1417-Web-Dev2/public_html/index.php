<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Pairs</title>
    <link rel="stylesheet" href="assets\css\style.css">
    <style>
        /* Center Content */
        .container {
            width: 80%;
            max-width: 600px;
            margin: 120px auto;
            text-align: center;
            background: rgba(255, 255, 255, 0.85);
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        /* Styled Buttons */
        .btn {
            display: inline-block;
            padding: 12px 25px;
            margin: 20px;
            font-size: 18px;
            color: white;
            background-color: blue;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            text-decoration: none;
            font-weight: bold;
            transition: background 0.3s ease;
        }

        .btn:hover {
            background-color: darkblue;
        }
    </style>
</head>

<body>

    <!-- Include the existing navbar -->
    <?php include 'includes/navbar.php'; ?>

    <!-- Main Content -->
    <div class="container">
        <?php if (isset($_SESSION['username'])): ?>
            <h1>Welcome to Pairs, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h1>
            <a href="pairs.php" class="btn">Click here to play</a>
        <?php else: ?>
            <h1>You're not using a registered session?</h1>
            <p>Register now to save your scores and compete on the leaderboard.</p>
            <a href="registration.php" class="btn">Register Now</a>
        <?php endif; ?>
    </div>

</body>

</html>