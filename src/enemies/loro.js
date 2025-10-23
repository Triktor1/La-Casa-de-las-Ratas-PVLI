export default class Loro extends Phaser.GameObjects.Image{

    constructor(scene, x=0, y=0 , speed, damage , loroname , texture)
    {
        super(scene , x , y ,texture, 0) //cosntructora sprite


        //Atributos loro
        this.vida = 100
        this.nombre = loroname
        this.damage = damage
    }


}