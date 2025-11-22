import Bullet from "../bullets/bullet.js";

export default class SiliconeBullet extends Bullet {
    constructor(scene, x, y, texture, speed, damage, direction, timeToLive, piercing, teamRat, healValue, type, scale, frame) {
        super(scene, x, y, texture, speed, damage, direction, timeToLive, piercing, teamRat, healValue, type, scale, frame);
        this.slowAmount = 0.65; //VAlor de multiplicacion de velocidad
        this.duration = 1500; //Duracion del slow
    }
        effectCollision(enemy){
        enemy.getDamaged(this.damage);
        enemy.slowed(this.slowAmount, this.duration); 
        if (!this.piercing) this.destroy(); //comprobar si es perforante
    }

}
