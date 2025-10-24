import Loro from "../enemies/loro.js";

export default class Level1 extends Phaser.Scene {
    constructor(){
        super({key:"Level1"});
    }
    shopMoney;
    levelNum = 1;

    init(data){
        this.shopMoney = data.shopMoney || 0;
    }
    
    preload(){
        this.load.image('loro' , 'assets/ParrotPlaceholder.png')
        this.load.image('selectButton', 'assets/lvlselectboton.png'); 
        this.load.image('shopButton', 'assets/shop.png'); 

    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    create(){
        this.add.text(20,20,"Level1");


        this.basicLoro  = new Loro(this , 200 , 200 , 15 , 10 , "basicLoro" , 'loro')


        //BOTONES
        //Seleccion de niveles
        const selectBtn = this.add.sprite(this.sys.game.canvas.width * 0.25, this.sys.game.canvas.height * 0.7, 'selectButton').setInteractive({ useHandCursor: true });
        selectBtn.on('pointerdown', () => {
            this.scene.start('SelectScene');
        });
        selectBtn.on('pointerover', () => selectBtn.setScale(1.1));
        selectBtn.on('pointerout', () => selectBtn.setScale(1.0));
        //Tienda
        const shopBtn = this.add.sprite(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.7, 'shopButton').setInteractive({ useHandCursor: true });
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