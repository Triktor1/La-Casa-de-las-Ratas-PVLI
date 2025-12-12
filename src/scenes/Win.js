export default class Win extends Phaser.Scene {
    constructor() {
        super({ key: "Win" });
    }

    preload() {
        this.load.image('btnStart', 'assets/UI/start.png');
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    create() {
        const bg = this.add.image(0, 0, 'backgroundMainMenu').setOrigin(0, 0).setScale(2);
        bg.displayHeight = this.scale.height;
        bg.displayWidth = this.scale.width;

        this.add.text(350, 250, "VICTORY!", {
            fontSize: '100px',
            fontFamily: 'Arial Black'
        });
        const btnStart = this.add.sprite(this.scale.width / 2, 520, 'btnStart').setInteractive({ useHandCursor: true });

        btnStart.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        //efectos
        btnStart.on('pointerover', () => btnStart.setScale(1.1));
        btnStart.on('pointerout', () => btnStart.setScale(1.0));
    }

    endLevel() {
        this.scene.start('MainMenu');
    }
}