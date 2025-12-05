import Torre from "./TorreBase.js";
import Bullet from "../bullets/bullet.js";

export default class RatSniper extends Torre{
    constructor(scene, x, y) {
        super(scene, x, y, 3500, 5, "Sniper", "Sniper", 0, 0.5, 450);

        this.damage = 35;
        this.bulletSpeed = 3500;
        this.fireRate = 3000;

        //Atributos de mejora al mejorar la torre
        this.damageBoost = 5;
        this.rangeBoost = 50;
        this.fireRateBoost = 500;

        this.setUpgradeText("Siguiente nivel: \ndaño + " + this.damageBoost + "\nrango + " + this.rangeBoost + "\nvelocidad - " + this.fireRateBoost/1000 + "s", 24, 3);
    }

    shoot(enemy) {
        const dir = new Phaser.Math.Vector2(enemy.x - this.x, enemy.y - this.y).normalize();
        const bullet = new Bullet(this.scene, this.x, this.y, 'bullet', this.bulletSpeed, this.damage, dir, this.bulletDuration, false, true, 0, "R", 0.1, 0);
        this.scene.bullets.add(bullet);
        return bullet;
    }

    upgrade(){
        this.damage += this.damageBoost;
        this.rangeValue += this.rangeBoost;
        this.fireRate -= this.fireRateBoost;
        this.resetRange();

        if (this.upgradeLevel == 2){
            this.setTexture("Sniper2");
        }
        else if (this.upgradeLevel == 3){
            this.setTexture("Sniper3");
        }
    }
}