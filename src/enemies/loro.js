export default class Loro extends Phaser.GameObjects.PathFollower {

    constructor(scene, path, x = 0, y = 0, speed = 15, damage = 10, vida = 100, type, moneyDrop, loroname, texture = "loro", frame = 0) {
        super(scene, path, x, y, texture, frame) //constructora  pathfollower
        this.scene = scene;
        this.scene.add.existing(this);

        //Atributos loro
        this.nombre = loroname;
        this.damage = damage;
        this.speed = speed;
        this.vida = vida;
        this.type = type; // ESTE ES EL TIPO DE LORO, SERA CLASIFICADO COMO R,B,G.   R critico a G, G critico a B, B critico a R
        this.moneyDrop = moneyDrop;

        this.audiosHit = [];
        this.audiosCrit = [];
        this.audioChance = 2;

        //cosas combate loro
        this.isFighting = false; 
        this.currentEnemy = null; 

        this.setScale(0.5);

        this.criticoSonido = this.scene.sound.add('Critico', { volume: 0.5 });
        // this.stopMovement = () => this.pauseFollow();
        // this.resumeMovement = () => this.resumeFollow();

        //Para el slow 
        this.slowTimer = 0;
        this.slowApplied = false;
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
        if (this.vida > 0){
            //comprobamos si el daño es critico
            if ((this.type == "G" && bulletType == "R") || (this.type == "R" && bulletType == "B") || (this.type == "B" && bulletType == "G")) {
                this.criticoSonido.play();
                this.setTint(0xffff0000); //Rojo intenso por el critico
                this.vida -= 2*damage;
                if (Phaser.Math.Between(1, this.audioChance) == 1) {
                    let index = Phaser.Math.Between(0, this.audiosCrit.length - 1);
                    if (this.audiosCrit[index]) this.audiosCrit[index].play();
                }
            }
            
            else {
                this.setTint(0xff999999); //Tintado gris por daño normal
                this.vida -= damage;
                if (Phaser.Math.Between(1, this.audioChance) == 1) {
                    let index = Phaser.Math.Between(0, this.audiosHit.length - 1);
                    if (this.audiosHit[index]) this.audiosHit[index].play();
                }
            }
            
            if (this.active){ //ESTO ES PARA DEVOLVER AL LORO SU TINTE NORMAL
                this.scene.time.addEvent({
                    delay : 200,
                    callback: () => {
                        if (this.active) this.clearTint();
                    }
                })
            }
            this.checkAlive();
            console.log (`Vida restante: ${this.vida}`);
        }
    }
    //Aplica lentitud al enemigo
    slowed(factor, time) {
        this.data = this.pathTween.data[0];
        this.current = this.data.current; //data.current es el progreso del path follower, que funciona entre 0 y 1

        //Ajuste del tween
        this.data.duration = 40000 / (this.speed * factor);  
        this.data.elapsed = this.current * this.data.duration; 

        //Se pasa el efecto
        if (this.active){
            this.slowApplied = true;
            this.slowTimer = this.scene.time.now + time;

            this.scene.time.addEvent({
                delay: time,
                callback: () => {
                    if (this.active && this.data && this.slowTimer <= this.scene.time.now){ //para asegurarse de que el loro está vivo o que no se ha reseteado el slow
                        this.current = this.data.current;
                        // el 40k es el tiempo en milisegundos que tarda en recorrerlo, numero magico igual habria que corregirlo
                        this.data.duration = 40000 / this.speed;  
                        this.data.elapsed = this.current * this.data.duration; 
                        this.slowApplied = false;
                    } 
                }
            });
        }
    }

    checkAlive(reachedEnd = false) {
        if (reachedEnd) {
            this.scene.changePlayerHealth(-this.damage);
            this.stopFollow();
            this.destroy();
        }
        else if (this.vida <= 0) {
            console.log(`${this.nombre} ha muerto`);
            //si estaba luchando
            if (this.isFighting && this.currentEnemy){
                //hace que el enemigo resete loss valores y que siga caminando
                this.currentEnemy.currentEnemy = null; 
                this.currentEnemy.isFighting = false; 
                this.currentEnemy.startWalking();
            }
            if (this.active){ //evitar crasheos
                this.scene.changeLevelMoney(this.moneyDrop); //esto da problemas por ahora
                this.scene.writeLevelMoney();
            }
            this.stopFollow();
            this.destroy();
        }
      
    }

    getPoisoned(damage, ticks, interval, bulletType) {
        for (let i = 0; i < ticks; i++){
            if (this.active){ //para asegurarse de que el loro está vivo
                this.scene.time.addEvent({
                    delay: interval * (i + 1),
                    callback: () => {

                        this.getDamaged(damage, bulletType);
                        
                    }
                })
            }
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

    startWalking() {
    if (!this.active) return;
    this.resumeFollow();
    }

    stopWalking() {
        if (!this.active) return;
        this.pauseFollow();
    }

    update(time, delta) {
        if (this.slowApplied) {
            this.slowTimer -= delta;
        }
    }
}