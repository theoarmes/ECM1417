<?php
session_start(); // Ensures session starts correctly

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ensure the incoming form data is received correctly
    $skin = isset($_POST['skin']) ? $_POST['skin'] : 'default-skin.png';
    $eyes = isset($_POST['eyes']) ? $_POST['eyes'] : 'default-eyes.png';
    $mouth = isset($_POST['mouth']) ? $_POST['mouth'] : 'default-mouth.png';
    $username = isset($_POST["username"]) ? trim($_POST["username"]) : "";



    // Force correct file extensions
    if (!str_ends_with($skin, '.png')) $skin .= '.png';
    if (!str_ends_with($eyes, '.png')) $eyes .= '.png';
    if (!str_ends_with($mouth, '.png')) $mouth .= '.png';

    // Store avatar in session
    $_SESSION["username"] = $username;
    $_SESSION['avatar'] = [
        'skin' => $skin,
        'eyes' => $eyes,
        'mouth' => $mouth
    ];

    // Debugging: Print session data
    echo json_encode(["success" => true, "session_data" => $_SESSION["avatar"]]);
    exit();
}

// If this is NOT a POST request, continue to the registration form HTML below
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="assets\css\style.css">
    <script src="assets\js\registration.js"></script>
</head>

<body>
    <?php include 'includes/navbar.php'; ?>
    <div id="main">
    <h2>Register Your Profile</h2>
    <form id="registration-form">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>

        <h3>Customize Your Emoji Avatar</h3>
        <div id="avatar-preview" class="emoji">
            <img id="avatar-skin" class="skin" src="assets/emoji_assets/skin/green.png">
            <img id="avatar-eyes" class="eyes" src="assets/emoji_assets/eyes/normal.png">
            <img id="avatar-mouth" class="mouth" src="assets/emoji_assets/mouth/smiling.png">
        </div>

        <button type="button" onclick="changeSkin()">Change Skin</button>
        <button type="button" onclick="changeEyes()">Change Eyes</button>
        <button type="button" onclick="changeMouth()">Change Mouth</button>

        <input type="hidden" id="skin-input" name="skin" value="green.png">
        <input type="hidden" id="eyes-input" name="eyes" value="normal.png">
        <input type="hidden" id="mouth-input" name="mouth" value="smiling.png">
        <button type="submit">Submit</button>
    </form>
</div>

</body>

</html>