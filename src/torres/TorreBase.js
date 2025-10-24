export default class Torre extends Phaser.GameObjects.Image{

    constructor(scene, x=20, y=0 , speed, damage , torrename , texture , frame = 0)
    {
        super(scene, x, y, texture, frame);

        this.scene.add.existing(this);

        this.vida = 100;
        this.nombre = torre;
        this.damage = damage;
    }
}