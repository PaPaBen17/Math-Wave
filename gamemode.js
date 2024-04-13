const playButtonSound = () => {
    const buttonSound = document.getElementById('buttonSound');
    buttonSound.play();
}

const buttons = document.querySelectorAll('.play-btn button');
buttons.forEach(button => button.addEventListener('click', playButtonSound));
