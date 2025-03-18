<?php
ob_start();
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Function to validate username
function isValidUsername($username)
{
    return !preg_match('/[!@#%&*()+=\[\]{};:"\'<>?\/]/', $username);
}

// Handling form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $avatarType = $_POST['avatar_type'] ?? 'simple';
    $avatarSelection = $_POST['avatar_selection'] ?? 'default.png';

    if (!isValidUsername($username)) {
        $error = "Invalid username. Please avoid special characters.";
    } else {
        // Store user info in session & cookies
        $_SESSION['username'] = $username;
        $_SESSION['avatar'] = $avatarSelection;
        setcookie("username", $username, time() + (86400 * 30), "/"); // Store for 30 days
        setcookie("avatar", $avatarSelection, time() + (86400 * 30), "/");
        header("Location: index.php");
        exit();
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="assets\css\style.css">
</head>

<body>
    <?php include 'includes/navbar.php'; ?>
    <div id="main">
        <h2>Register</h2>
        <form method="POST" action="">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <?php if (!empty($error))
                echo "<p style='color:red;'>$error</p>"; ?>

            <label for="avatar_type">Select Avatar Type:</label>
            <select name="avatar_type" id="avatar_type">
                <option value="simple">Simple</option>
                <option value="medium">Medium</option>
                <option value="complex">Complex</option>
            </select>

            <div id="avatar-selection">
                <p>Choose an Avatar:</p>
                <input type="radio" name="avatar_selection" value="avatar1.png"> <img src="avatars/avatar1.png"
                    width="50">
                <input type="radio" name="avatar_selection" value="avatar2.png"> <img src="avatars/avatar2.png"
                    width="50">
                <input type="radio" name="avatar_selection" value="avatar3.png"> <img src="avatars/avatar3.png"
                    width="50">
            </div>

            <button type="submit">Register</button>
        </form>
    </div>
</body>

</html>