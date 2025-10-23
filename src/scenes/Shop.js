export default class Shop extends Phaser.Scene {
    shopMoney;
    constructor(){
        super({key:"Shop"});
    }

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

    endShop(){
        this.scene.start('Level1', {shopMoney: this.shopMoney});
    }
}