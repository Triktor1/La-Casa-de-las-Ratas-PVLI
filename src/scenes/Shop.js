export default class Shop extends Phaser.Scene {
    shopMoney;
    levelNum;
    constructor(){
        super({key:"Shop"});
    }

    init(data){
        this.shopMoney = data.shopMoney || 0;
        this.levelNum = data.levelNum || 1;
    }
    
    preload(){
        this.load.image('botonVolver', 'assets/botonVolver.png');
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    create(){
        this.add.text(20,20,"Shop");

        const btnBack = this.add.image(this.scale.width / 2, 220, 'botonVolver').setInteractive({ useHandCursor: true });

        btnBack.on('pointerdown', () => {
            this.endShop();
        });

        //efectos
        btnBack.on('pointerover', () => btnBack.setScale(1.1));
        btnBack.on('pointerout', () => btnBack.setScale(1.0));
        }

    endShop(){
        let levelID = 'Level' + this.levelNum;
        if(this.levelNum === 0){
            this.scene.start('TutorialLevel', {shopMoney: this.shopMoney});
        }
        else{
            this.scene.start(levelID, {shopMoney: this.shopMoney});
        }
    }
}