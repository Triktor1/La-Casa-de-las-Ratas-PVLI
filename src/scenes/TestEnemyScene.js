import Loro from "../enemies/loro.js";

export default class TestEnemyScene extends Phaser.Scene {
    constructor(){
        super({key:"TestEnemyScene"});
    }
    shopMoney;
    levelNum = 1;

    init(data){
        this.shopMoney = data.shopMoney || 0;
    }
    
    preload(){

        this.load.image('loro' , 'assets/ParrotPlaceholder.png');
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    create(){
        this.add.text(20,20,"Test");
        this.basicLoro  = new Loro(this , 200 , 200 , 15 , 10 , "basicLoro" , 'loro');
    }

    endLevel(){
        this.scene.start('Shop', {shopMoney: this.shopMoney});
    }
}