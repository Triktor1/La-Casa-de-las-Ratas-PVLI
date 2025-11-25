export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameOverScene" });
    }

    preload() {
        this.load.image('btnStart', 'assets/UI/start.png');
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    create() {
        this.add.text(350, 250, "GameOver", {
            fontSize: '100px',
            fontFamily: 'Arial Black'
        });
        const startBtn = this.add.sprite(this.scale.width / 2, 520, 'btnStart').setInteractive({ useHandCursor: true });

        startBtn.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        //Tweens del botón Start
        startBtn.on('pointerover', () =>
            this.tweens.add({
                targets: startBtn,
                scale: 1.1,
                duration: 70,
                ease: 'Linear',
            }));
        startBtn.on('pointerout', () =>
            this.tweens.add({
                targets: startBtn,
                scale: 1,
                duration: 70,
                ease: 'Linear',
            }));

    }

    endLevel() {
        this.scene.start('Shop', { shopMoney: this.shopMoney }, { levelNum: this.levelNum });
    }
}