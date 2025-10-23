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

    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    create(){
        this.add.text(20,20,"Main Menu");
    }

    endLevel(){
        this.scene.start('Shop', {shopMoney: this.shopMoney}, { levelNum: this.levelNum });
    }
}