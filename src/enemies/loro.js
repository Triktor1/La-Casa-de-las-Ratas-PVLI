export default class Loro extends Phaser.GameObjects.PathFollower {

    constructor(scene, path, x = 0, y = 0, speed = 15, damage = 10, vida = 100, moneyDrop, loroname, texture = "loro", frame = 0) {
        super(scene, path, x, y, texture, frame) //constructora  pathfollower
        this.scene.add.existing(this);

        //Atributos loro
        this.scene = scene;
        this.nombre = loroname;
        this.damage = damage;
        this.speed = speed;
        this.vida = vida;
        this.moneyDrop = moneyDrop;

        this.isBeingTargeted = false; 

    }

    create() {

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

    getDamaged(damage) {
        this.vida -= damage;
        this.checkAlive();
    }

    checkAlive(reachedEnd = false) {
        if (reachedEnd) {
            this.scene.changePlayerHealth(-this.damage);
            this.destroy();
            this.stopFollow();
        }
        else if (this.vida <= 0) {
            this.scene.changeLevelMoney(this.moneyDrop);
            this.scene.writeLevelMoney();
            this.destroy();
            this.stopFollow();
        }
    }

    startFollowing() {
        this.startFollow({
            duration: 40000 / this.speed,
            repeat: 0,
            rotateToPath: false,
            onComplete: () => {
                this.checkAlive(true);
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
                this.checkAlive(true);
                console.log(`${this.nombre} ha llegado al final del path!`);

            }
        });
    }

}