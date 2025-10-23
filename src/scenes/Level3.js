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

    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    create(){
        this.add.text(20,20,"Main Menu");
    }

    endLevel(){
        this.scene.start('Shop', {shopMoney: this.shopMoney});
    }
}