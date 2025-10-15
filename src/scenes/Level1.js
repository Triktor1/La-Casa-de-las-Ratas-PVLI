export default class Level1 extends Phaser.Scene {
    constructor(){
        super({key:"Level1"});
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