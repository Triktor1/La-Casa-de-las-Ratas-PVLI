export default class Level2 extends Phaser.Scene {
    constructor(){
        super({key:"Level2");
    }
    shopMoney;
    levelNum = 2;

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