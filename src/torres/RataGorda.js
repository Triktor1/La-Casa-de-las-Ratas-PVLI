import Torre from "./TorreBase.js";
import FatBullet from "../bullets/fatBullet.js";

export default class RataGorda extends Torre{
    constructor(scene, x, y) {
        super(scene, x, y, 2750, 5, "BigCheese", "BigCheese", 0, 0.5, 150);

        this.damage = 25;
        this.bulletDuration = 100;

        //Atributos de mejora al mejorar la torre
        this.damageBoost = 5;
        this.rangeBoost = 20;
        this.bulletDurationBoost = 25;
    }

    shoot(enemy) {
        const dir = new Phaser.Math.Vector2(enemy.x - this.x, enemy.y - this.y).normalize();
        const bullet = new FatBullet(this.scene, this.x, this.y, 'FatBullet', 1200, this.damage, dir, this.bulletDuration, true, true, 0, "R", 0.2, 0);
        this.scene.bullets.add(bullet);
        return bullet;
    }

    upgrade(){
        this.damage += this.damageBoost;
        this.rangeValue += this.rangeBoost;
        this.bulletDuration += this.bulletDurationBoost;
        
        this.resetRange();
    }
}