export default class MainMenu extends Phaser.Scene {
    constructor(){
        super({key:"MainMenu"});

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