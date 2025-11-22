export default class Loro extends Phaser.GameObjects.PathFollower {

    constructor(scene, path, x = 0, y = 0, speed = 15, damage = 10, vida = 100, moneyDrop, loroname, texture = "loro", frame = 0) {
        super(scene, path, x, y, texture, frame) //constructora  pathfollower
        this.scene = scene;
        this.scene.add.existing(this);
        
        //Atributos loro
        this.nombre = loroname;
        this.damage = damage;
        this.speed = speed;
        this.vida = vida;
        this.moneyDrop = moneyDrop;
        this.setScale(0.5);
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
        // Si no se comprueba esto, es posible que cuente su muerte mas de una vez si sufre daño tras haber muerto
        if (this.vida > 0){
            this.vida -= damage;
            this.checkAlive();
            console.log (`Vida restante: ${this.vida}`);
        }
    }

    getPoisoned(damage, ticks, interval) {
        for (let i = 0; i < ticks; i++){
            this.scene.time.addEvent({
                delay: interval * (i + 1),
                callback: () => {
                    this.getDamaged(damage);
                }
            });
        }

    }

    slowed(factor){
        // hay que rehacer el metodo de movimiento para que esto funcione, pues actualmente no hace nada
        this.speed *= factor;
        

    }
    checkAlive(reachedEnd = false) {
        if (reachedEnd) {
            this.scene.changePlayerHealth(-this.damage);
            this.stopFollow();
            this.destroy();
        }
        else if (this.vida <= 0) {
            console.log(`${this.nombre} ha muerto`);
            this.scene.changeLevelMoney(this.moneyDrop); //esto da problemas por ahora
            this.scene.writeLevelMoney();
            this.stopFollow();
            this.destroy();
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