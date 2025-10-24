export default class MainMenu extends Phaser.Scene {
    constructor(){
        super({key:"MainMenu"});

    }

    init(){

    }
    
    preload(){
        this.load.image('startButton', 'assets/start.png'); // Botón de start
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    create(){
        this.add.text(20,20,"Main Menu");
        const startBtn = this.add.sprite(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.7, 'startButton').setInteractive({ useHandCursor: true });
        startBtn.on('pointerdown', () => {
            this.scene.start('TutorialLevel');
        });
        startBtn.on('pointerover', () => startBtn.setScale(1.1));
        startBtn.on('pointerout', () => startBtn.setScale(1.0));
    }
}