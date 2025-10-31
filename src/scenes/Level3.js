export default class Level3 extends Phaser.Scene {
    constructor(){
        super({key:"Level3"});
    }
    shopMoney;
    levelNum = 3;

    init(data){
        this.shopMoney = data.shopMoney || 0;
    }
    
    preload(){
        this.load.image('selectButton', 'assets/selectBt.png'); 
        this.load.image('shopButton', 'assets/shopBt.png')
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    create(){
        this.add.text(20,20,"Level3");

        //BOTONES
        //Seleccion de niveles
        const selectBtn = this.add.sprite(this.sys.game.canvas.width * 0.25, this.sys.game.canvas.height * 0.7, 'selectButton').setInteractive({ useHandCursor: true });
        selectBtn.on('pointerdown', () => {
            this.scene.start('SelectScene');
        });
        selectBtn.on('pointerover', () => selectBtn.setScale(1.1));
        selectBtn.on('pointerout', () => selectBtn.setScale(1.0));
        //Tienda
        const shopBtn = this.add.sprite(this.sys.game.canvas.width * 0.8, this.sys.game.canvas.height * 0.7, 'shopButton').setInteractive({ useHandCursor: true });
        shopBtn.on('pointerdown', () => {
            this.scene.start('Shop');
        });
        shopBtn.on('pointerover', () => shopBtn.setScale(1.1));
        shopBtn.on('pointerout', () => shopBtn.setScale(1.0));
    }

    endLevel(){
        this.scene.start('Shop', {shopMoney: this.shopMoney});
    }
}