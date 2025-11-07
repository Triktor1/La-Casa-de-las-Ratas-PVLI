function playSound(soundName){
    const audio = new Audio(`sfx/${soundName}.mp3`);
    audio.play();
}