import Bullet from "../bullets/bullet.js";

export default class ComecablesBullet extends Bullet {
    constructor(scene, x, y, texture, damage = 5, radio, timeToLive, piercing, teamRat, healValue, type, scale, frame) {
        super(scene, x, y, texture, 0, damage, new Phaser.Math.Vector2(0, 0), timeToLive, piercing, teamRat, healValue, type, scale, frame);
        this.radio = radio;
        this.hasAttacked = false;

        this.anims.play('comecablesRayo');
    }

    effectCollision() {

    }

    update(t, dt) {
        this.timeToLive -= dt;

        if (!this.hasAttacked) {
            this.hasAttacked = true;
            //Recorro la pool de enemigos
            const enemies = this.scene.enemies.getChildren();

            for (let enemy of enemies) {
                //Solo aplico a enemigos vivos
                if (enemy.active) {
                    //Si el enemigo está dentro del radio
                    const distancia = Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y);
                    if (distancia <= this.radio) {
                        enemy.getDamaged(this.damage, this.type);
                        console.log("daño");
                    }
                }
            }
        }

        if (this.timeToLive <= 0) {
            this.destroy();
        }
    }
}
