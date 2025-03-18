<?php
// functions.php - Session & Cookie Handling
function isUserRegistered() {
    return isset($_COOKIE['username']);
}
function getUserAvatar() {
    return isset($_COOKIE['avatar']) ? $_COOKIE['avatar'] : '';
}
?>
