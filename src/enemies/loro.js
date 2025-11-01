export default class Loro extends Phaser.GameObjects.PathFollower{

    constructor(scene, path, x=0, y=0 , speed = 15, damage = 10, vida = 100, loroname , texture = "loro", frame = 0)
    {
        super(scene, path, x, y, texture, frame) //constructora  pathfollower
        this.scene.add.existing(this);

        //Atributos loro
        this.nombre = loroname
        this.damage = damage
        this.speed = speed
        this.vida = vida
    }

    getDamaged(damage){
        this.vida -= damage;
    }

    checkAlive(isAlive = true){
            if(this.vida <= 0 || !isAlive){
            this.destroy();
        }
    }

startFollowing() {
    this.startFollow({
        duration: 40000 / this.speed,
        repeat: 0,
        rotateToPath: true,
        onComplete: () => {
            this.checkAlive(false);
            console.log(`${this.nombre} ha llegado al final del path!`);
        }
    });
}

}