export default class Tropa extends Phaser.GameObjects.PathFollower {

    constructor(scene, path, x = 0, y = 0, speed = 15, damage = 10, vida = 100, type, tropaname, texture = "rataComecables", frame = 0, scale = 0.5) {
        super(scene, path, x, y, texture, frame) //constructora  pathfollower
        this.scene = scene;
        this.scene.add.existing(this);

        //Atributos tropa
        this.nombre = tropaname;
        this.damage = damage;
        this.speed = speed;
        this.vida = vida;
        this.type = type; // ESTE ES EL TIPO DE LORO, SERA CLASIFICADO COMO R,B,G.   R critico a G, G critico a B, B critico a R
        this.setScale(scale);

        this.criticoSonido = this.scene.sound.add('Critico', { volume: 0.5 });

        this.startFollowingReversed();
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

    getDamaged(damage, bulletType) {
        // Si no se comprueba esto, es posible que cuente su muerte mas de una vez si sufre daño tras haber muertoi
        if (this.vida > 0) {
            //comprobamos si el daño es critico
            if ((this.type == "G" && bulletType == "R") || (this.type == "R" && bulletType == "B") || (this.type == "B" && bulletType == "G")) {
                this.criticoSonido.play();
                this.setTint(0xffff0000); //Rojo intenso por el critico
                this.vida -= 2 * damage;
            }

            else {
                this.setTint(0xff999999); //Tintado gris por daño normal
                this.vida -= damage;
            }

            if (this.active) { //ESTO ES PARA DEVOLVER AL LORO SU TINTE NORMAL
                this.scene.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.clearTint();
                    }
                })
            }
            this.checkAlive();
            console.log(`Vida restante: ${this.vida}`);
        }
    }

    getHealed(heal){
        this.vida+=heal;
        console.log("Me he curado");
    }

    checkAlive(reachedEnd = false) {
        if (reachedEnd) {
            this.stopFollow();
            this.destroy();
        }
        else if (this.vida <= 0) {
            console.log(`${this.nombre} ha muerto`);
            this.stopFollow();
            this.destroy();
        }

    }

    startFollowingReversed() {
        this.startFollow({
            duration: 40000 / this.speed,
            from: 1,
            to: 0,
            rotateToPath: false,
            positionOnPath: true,
            onComplete: () => {
                this.checkAlive(true);
                console.log(`${this.nombre} ha llegado al final del path!`);
                console.log("speed: " + this.speed);
            }
        });
    }

}