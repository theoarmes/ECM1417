document.addEventListener("DOMContentLoaded", () => {
    const skins = ["green.png", "red.png", "yellow.png"];
    const eyes = ["closed.png", "laughing.png", "long.png", "normal.png", "rolling.png", "winking.png"];
    const mouths = ["open.png", "sad.png", "smiling.png", "straight.png", "surprise.png", "teeth.png"];

    let skinIndex = 0, eyesIndex = 0, mouthIndex = 0;

    function updateAvatar() {
        document.getElementById("avatar-skin").src = `assets/emoji_assets/skin/${skins[skinIndex]}`;
        document.getElementById("avatar-eyes").src = `assets/emoji_assets/eyes/${eyes[eyesIndex]}`;
        document.getElementById("avatar-mouth").src = `assets/emoji_assets/mouth/${mouths[mouthIndex]}`;

        // Update hidden form values
        document.getElementById("skin-input").value = skins[skinIndex];
        document.getElementById("eyes-input").value = eyes[eyesIndex];
        document.getElementById("mouth-input").value = mouths[mouthIndex];
    }

    window.changeSkin = function () {
        skinIndex = (skinIndex + 1) % skins.length;
        updateAvatar();
    };

    window.changeEyes = function () {
        eyesIndex = (eyesIndex + 1) % eyes.length;
        updateAvatar();
    };

    window.changeMouth = function () {
        mouthIndex = (mouthIndex + 1) % mouths.length;
        updateAvatar();
    };

    document.getElementById("registration-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(this);

        fetch("registration.php", { 
            method: "POST",
            body: formData
        })
        .then(response => response.text())  // Change from .json() to .text() to debug HTML responses
        .then(data => {
            try {
                let jsonData = JSON.parse(data);
                if (jsonData.success) {
                    window.location.href = "index.php"; // Redirect after successful save
                } else {
                    alert("Error: " + jsonData.message);
                }
            } catch (e) {
                console.error("Invalid JSON response from server:", data);
                alert("Unexpected server response. Please check the console.");
            }
        })
        .catch(error => console.error("Error:", error));
    });
});
