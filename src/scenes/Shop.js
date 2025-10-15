export default class Shop extends Phaser.Scene {
    constructor(){
        super({key:"Shop"});
    }

    init(){

    }
    
    preload(){

    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    create(){
        this.add.text(20,20,"Main Menu");
    }
}