import Bullet from "../bullets/bullet.js";

export default class JeringaBullet extends Bullet {
    constructor(scene, x, y, texture, speed, damage, direction, timeToLive, piercing, teamRat, healValue, type, scale, frame) {
        super(scene, x, y, texture, speed, damage, direction, timeToLive, piercing, teamRat, healValue, type, scale, frame);

        //TICKS DEL VENENO A APLICAR Y SU INTERVALO
        this.ticks = 3; 
        this.interval = 900;
    }
        //SOBREESCRITURA DEL METODO DE COLISION DE LA CLASE BASE BULLET
    effectCollision(enemy){
        enemy.getPoisoned(this.damage, this.ticks, this.interval, this.type); //EN VEZ DE DAÑAR DE UNA, APLICA VENENO
        if (!this.piercing) this.destroy(); //comprobar si es perforante
    }

}
