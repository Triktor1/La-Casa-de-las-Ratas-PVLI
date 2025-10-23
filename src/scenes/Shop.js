export default class Shop extends Phaser.Scene {
    shopMoney;
    levelNum;
    constructor(){
        super({key:"Shop"});
    }

    init(data){
        this.shopMoney = data.shopMoney || 0;
        this.levelNum = data.levelNum || 0;
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
        let levelID = 'Level' + this.levelNum;
        if(this.levelNum === 0){
            this.scene.start('TutorialLevel', {shopMoney: this.shopMoney});
        }
        else{
            this.scene.start(levelID, {shopMoney: this.shopMoney});
        }
    }
}