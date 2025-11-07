export default class Win extends Phaser.Scene {
    constructor(){
        super({key:"Win"});
    }
    
    preload(){
        this.load.image('btnStart', 'assets/start.png');
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    create(){
        this.add.text(350, 250,"VICTORY!", {
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

    endLevel(){
        this.scene.start('Shop', {shopMoney: this.shopMoney}, { levelNum: this.levelNum });
    }
}