import PlayerData from "../PlayerData/PlayerData.js";


export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenu" });
    }

    init() {

    }

    preload() {
        this.load.image('startButton', 'assets/UI/start.png'); // Botón de start
        this.load.image('galleryButton', 'assets/UI/gallery.png'); // Botón de galería (placeholder)
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    create() {

        let keyScene = "LevelClassTest";
        this.playerInfo = new PlayerData();

        this.add.text(225, 200, "Filthy Feathers", {
            fontSize: '100px',
            fontFamily: 'Arial Black'
        });

        //Configuración del botón Start
        const startBtn = this.add.sprite(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.6, 'startButton').setInteractive({ useHandCursor: true }).setScale(0.7);
        startBtn.on('pointerdown', () => {
            this.scene.start("Level1");
        });

        //Tweens del botón Start
        startBtn.on('pointerover', () =>
            this.tweens.add({
                targets: startBtn,
                scale: 0.8,
                duration: 70,
                ease: 'Linear',
            }));
        startBtn.on('pointerout', () =>
            this.tweens.add({
                targets: startBtn,
                scale: 0.7,
                duration: 70,
                ease: 'Linear',
            }));

        //Configuración del botón Gallery
        const galleryBtn = this.add.sprite(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.8, 'galleryButton').setInteractive({ useHandCursor: true }).setScale(0.7);
        galleryBtn.on('pointerdown', () => {
            this.scene.start("Gallery");
        });
        galleryBtn.on('pointerover', () =>
            this.tweens.add({
                targets: galleryBtn,
                scale: 0.8,
                duration: 70,
                ease: 'Linear',
            }));
        galleryBtn.on('pointerout', () =>
            this.tweens.add({
                targets: galleryBtn,
                scale: 0.7,
                duration: 70,
                ease: 'Linear',
            }));
    }
}