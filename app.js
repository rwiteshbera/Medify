const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".video-container video");

    //Sounds
    const sounds = document.querySelectorAll(".sound-picker button");

    //Time Display
    const timeDisplay = document.querySelector(".time-display");

    // Time Select 
    const timeSelect = document.querySelectorAll('.timer button');

    //Length of outline
    const outlineLength = outline.getTotalLength();

    console.log(outlineLength);
    //Duration
    let defaultDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Pick different sound
    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src= this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    // Play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // Select duration
    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            defaultDuration = this.getAttribute("data-time");

            //Update text display
            timeDisplay.textContent = `${Math.floor(defaultDuration / 60)}:${Math.floor(defaultDuration % 60)}`;
        });
    });

    // Function to stop and play the sounds
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            video.muted = true;
            play.src = "./svg/pause.svg";
        }
        else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }

        //Song time update
        song.ontimeupdate = () => {
            let currentTime = song.currentTime;
            let elapsed = defaultDuration - currentTime;
            let seconds = Math.floor(elapsed % 60);
            let minutes = Math.floor(elapsed / 60);

            //Animation of circle
            let progress = outlineLength - (currentTime / defaultDuration) * outlineLength;
            outline.style.strokeDashoffset = progress;

            //Text Animation
            timeDisplay.textContent = `${minutes}:${seconds}`;


            if (currentTime >= defaultDuration) {
                song.pause();
                song.currentTime = 0;
                play.src = './svg/play.svg';
                video.pause();
            }
        }
    };
};
app();
