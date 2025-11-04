export default class HuecoTorre extends Phaser.GameObjects.Image {

    constructor(scene, x, y, texture = 'huecoTorre', frame = 0) {
        super(scene, x, y, texture, frame);

        this.scene.add.existing(this);
        this.setScrollFactor(0);
        //Atributos
        this.ocupado = false;  //Booleana que indicia si hay torre encima o no 
        this.setAlpha(0.4);
    }

    ocupar() {
        this.ocupado = true;
        this.setAlpha(1);//Quitar silueta
    }
}
//n bjuyhhhhhhhhhhhhhhhhhhh
