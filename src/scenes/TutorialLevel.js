export default class TutorialLevel extends Phaser.Scene {
    constructor(){
        super({key:"TutorialLevel"});
    }
    shopMoney;
    levelNum = 0;

    init(data){
        this.shopMoney = data.shopMoney || 0;
    }
    
    preload(){
        this.load.image('btnShop', 'assets/btnShop.png');
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    create(){
        this.add.text(20,20,"Tutorial");
        const btnShop = this.add.image(this.scale.width / 2, 520, 'btnShop').setInteractive({ useHandCursor: true });

        btnShop.on('pointerdown', () => {
            this.scene.start('Shop');
        });

        //efectos
        btnShop.on('pointerover', () => btnShop.setScale(1.1));
        btnShop.on('pointerout', () => btnShop.setScale(1.0));
    }

    endLevel(){
        this.scene.start('Shop', {shopMoney: this.shopMoney}, { levelNum: this.levelNum });
    }
}