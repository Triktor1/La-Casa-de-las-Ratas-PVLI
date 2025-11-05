export default class Torre extends Phaser.GameObjects.Image{

    constructor(scene, x=20, y=0 , speed, damage =10 , torrename , texture , frame = 0)
    {
        //declaracioness
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.scene.phsyics.add.existing(this);

        //atributos
        this.vida = 100;
        this.nombre = torrename;
        this.range= 150; 
        this.damage = damage;

        //cuerpo circular (rango)
        this.body.setCircle(this.range, this.width/2 - this.range, this.height/2 - this.range);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

        //debug
        this.rangeCircle = this.scene.add.circle(this.x, this.y, this.range, 0x00ff00, 0.15);

        //aceso al grupo de balas
        this.bulletGroup = this.scene.bullet; 
        
    }
    update() {
            this.rangeCircle.x = this.x; 
            this.rangeCircle.y = this.y; 
        }

        shoot(target) {
        const bullet = new this.scene.Bullet(
            this.scene,
            this.x,
            this.y,
            'bullet',
            300,
            this.damage,
            dir,
            2000,
            false,
            true,
            0,
            0.1
        );        this.bulletGroup.add(bullet);
        }
}