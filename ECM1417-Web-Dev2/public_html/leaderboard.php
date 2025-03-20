<?php
session_start();

// Store scores in session (no database used)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'] ?? "Guest";
    $totalPoints = $_POST['total_points'] ?? 0;

    if (!isset($_SESSION['scores'])) {
        $_SESSION['scores'] = [];
    }

    $_SESSION['scores'][] = [
        "username" => htmlspecialchars($username),
        "total_score" => intval($totalPoints)
    ];
}

// Retrieve stored scores
$scores = $_SESSION['scores'] ?? [];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Leaderboard</title>
    <link rel="stylesheet" href="assets\css\style.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }

        table {
            width: 50%;
            margin: auto;
            border-collapse: collapse;
        }

        th,
        td {
            border: 1px solid black;
            padding: 10px;
            text-align: center;
        }

        th {
            background-color: blue;
            color: white;
        }
    </style>
</head>

<body>
    <?php include 'includes/navbar.php'; ?>
    <h1>Leaderboard</h1>
    <table>
        <tr>
            <th>Username</th>
            <th>Total Score</th>
        </tr>

        <?php
        if (!empty($scores)) {
            foreach ($scores as $entry) {
                echo "<tr><td>{$entry['username']}</td><td>{$entry['total_score']}</td></tr>";
            }
        } else {
            echo "<tr><td colspan='2'>No scores yet.</td></tr>";
        }
        ?>
    </table>
</body>

</html>