import Bullet from "../bullets/bullet.js";

export default class JeringaBullet extends Bullet {
    constructor(scene, x, y, texture, speed, damage, direction, timeToLive, piercing, teamRat, healValue, type, scale, frame, ticks , interval) {
        super(scene, x, y, texture, speed, damage, direction, timeToLive, piercing, teamRat, healValue, type, scale, frame);

        //TICKS DEL VENENO A APLICAR Y SU INTERVALO
        this.ticks = ticks; 
        this.interval = interval;
    }
        //SOBREESCRITURA DEL METODO DE COLISION DE LA CLASE BASE BULLET
    effectCollision(enemy){
        enemy.getDamaged(this.damage, this.type);
        enemy.getPoisoned(this.damage, this.ticks - 1, this.interval, this.type); //EN VEZ DE DAÑAR DE UNA, APLICA VENENO
        if (!this.piercing) this.destroy(); //comprobar si es perforante
    }

}
