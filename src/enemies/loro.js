export default class Loro extends Phaser.GameObjects.Image{

    constructor(scene, x=0, y=0 , speed, damage , loroname , texture , frame = 0)
    {
        super(scene , x , y ,texture, frame) //cosntructora sprite

        this.scene.add.existing(this);

        //Atributos loro
        this.vida = 100
        this.nombre = loroname
        this.damage = damage
    }


}