export default class Torre extends Phaser.GameObjects.Image{

    constructor(scene, x=20, y=0 , speed, damage =100 , torrename , texture , frame = 0)
    {
        //declaracioness
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        //atributos
        this.vida = 100;
        this.nombre = torrename;
        this.range= 150; 
        this.damage = damage;

        //cuerpo circular (rango)
        //this.body.setCircle(this.range, this.width/2 - this.range, this.height/2 - this.range);
        //this.body.setAllowGravity(false);
        //this.body.setImmovable(true);

        this.body.setCircle(this.range);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

       
    }   
    update() {
        if (this.rangeCircle){
            this.rangeCircle.x = this.x; 
            this.rangeCircle.y = this.y;
        }
             
    }

    shoot(target) {
        const dir = new Phaser.Math.Vector2(target.x - this.x, target.y - this.y).normalize();
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
        );       
    }
}