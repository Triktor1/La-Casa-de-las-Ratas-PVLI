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

    create(){

        if (!this.hasToggleEvent) { 
        this.hasToggleEvent = true;
        this.toggle = true;

        this.scene.time.addEvent({
            delay: 500, 
            loop: true,
            callback: () => {
                if (this.toggle) {
                    this.pauseFollow();
                    console.log("Paused");
                } else {
                    this.resumeFollow();
                    console.log("Resumed");
                }
                this.toggle = !this.toggle;
            }
        });
        }
    }

    getDamaged(damage){
        this.vida -= damage;
        this.checkAlive();
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
        rotateToPath: false,
        onComplete: () => {
            this.checkAlive(false);
            console.log(`${this.nombre} ha llegado al final del path!`);
        }
    });
}

startFollowingReversed() {
    this.startFollow({
        from: 1,
        to: 0,
        duration: 40000 / this.speed,
        repeat: 0,
        rotateToPath: false,
        onComplete: () => {
            this.checkAlive(false);
            console.log(`${this.nombre} ha llegado al final del path!`);
        }
    });
}

}