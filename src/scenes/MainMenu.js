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
        this.load.image('tutorialButton', 'assets/UI/tutorial.png') //Botón de tutorial
        this.load.image('logo', 'assets/UI/FilthyFeathersLogo.png'); // Logo del juego
        this.load.json('TropeDefaultData', 'src/scenes/ShopDataManagement/TropaShopData.json')

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    create() {
        this.cameras.main.setBackgroundColor(0x967194);

        this.arrayCosas = this.cache.json.get('TropeDefaultData').tropas;

        let keyScene = "LevelClassTest";
        this.playerInfo = new PlayerData(this.arrayCosas);

        console.log(this.playerInfo);
        this.add.sprite(this.sys.game.canvas.width * 0.5, this.sys.canvas.height * 0.3, 'logo').setScale(0.5);

        //Configuración del botón Start
        const startBtn = this.add.sprite(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.5, 'startButton').setInteractive({ useHandCursor: true }).setScale(0.7);
        startBtn.on('pointerdown', () => {
            this.scene.start("Level1", { playerInfo: this.playerInfo, dummy: 1 });
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
        const galleryBtn = this.add.sprite(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.68, 'galleryButton').setInteractive({ useHandCursor: true }).setScale(0.7);
        galleryBtn.on('pointerdown', () => {
            this.scene.start("GalleryGrid");
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

        //Configuración del botón Tutorial
        const tutorialBtn = this.add.sprite(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.86, 'tutorialButton').setInteractive({ useHandCursor: true }).setScale(0.7);
        tutorialBtn.on('pointerdown', () => {
            window.location.href = 'tutorial.html';
        });
        tutorialBtn.on('pointerover', () =>
            this.tweens.add({
                targets: tutorialBtn,
                scale: 0.8,
                duration: 70,
                ease: 'Linear',
            }));
        tutorialBtn.on('pointerout', () =>
            this.tweens.add({
                targets: tutorialBtn,
                scale: 0.7,
                duration: 70,
                ease: 'Linear',
            }));
    }
}