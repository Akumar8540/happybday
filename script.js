document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("bg-music");

    // Try playing the audio
    let playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("Autoplay started successfully.");
        }).catch(() => {
            console.log("Autoplay blocked. Waiting for user interaction...");

            // Show a floating play button only if autoplay is blocked
            let playButton = document.createElement("button");
            playButton.innerText = "🔊 Click to Play Music";
            playButton.style.position = "fixed";
            playButton.style.top = "50%";
            playButton.style.left = "50%";
            playButton.style.transform = "translate(-50%, -50%)";
            playButton.style.padding = "15px 30px";
            playButton.style.fontSize = "18px";
            playButton.style.background = "#ff4081";
            playButton.style.color = "white";
            playButton.style.border = "none";
            playButton.style.cursor = "pointer";
            playButton.style.borderRadius = "10px";
            playButton.style.zIndex = "1000";

            document.body.appendChild(playButton);

            // Play music when the user clicks the button
            playButton.addEventListener("click", function () {
                audio.play();
                playButton.remove(); // Remove button after clicking
            });
        });
    }
});
document.addEventListener("click", function () {
    let audio = document.getElementById("bg-music");
    if (audio.paused) {
        audio.play();
    }
}, { once: true }); // Runs only once
document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("bg-music");

    function tryPlayAudio() {
        let playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log("Autoplay successful!");
                audio.muted = false; // Unmute after it starts
            }).catch(() => {
                console.log("Autoplay blocked. Retrying...");
                setTimeout(tryPlayAudio, 2000); // Retry every 2 seconds
            });
        }
    }

    // Try autoplay immediately
    tryPlayAudio();

    // Force play on user interaction (click anywhere)
    document.addEventListener("click", function () {
        if (audio.paused) {
            audio.play().catch(err => console.log("Play failed:", err));
        }
    }, { once: true }); // Ensures it only happens once
});
