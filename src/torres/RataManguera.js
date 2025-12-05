import Torre from "./TorreBase.js";
import WaterBullet from "../bullets/waterBullet.js";

export default class RataManguera extends Torre{
    constructor(scene, x, y) {
        super(scene, x, y, 135, 15, "rataManguera", "rataManguera", 0, 0.225, 275);

        //Atributos base
        this.damage = 1;
        this.bulletSpeed = 1700;
        this.fireRate = 135;

        //Atributos de mejora al mejorar la torre
        this.damageBoost = 0.5;
        this.rangeBoost = 15;
        this.fireRateBoost = 25;

        this.setUpgradeText("Siguiente nivel: \ndaño + " + this.damageBoost + "\nrango + " + this.rangeBoost + "\nvelocidad - " + this.fireRateBoost/1000 + "s", 24, 3);
    }

    shoot(enemy) {
        const dir = new Phaser.Math.Vector2(enemy.x - this.x, enemy.y - this.y).normalize();
        const bullet = new WaterBullet(this.scene, this.x, this.y, 'siliconeBullet', this.bulletSpeed, this.damage, dir, 380, true, true, 0, "G", 0.075, 0);
        this.scene.bullets.add(bullet);
        return bullet;
    }

    upgrade(){
        this.damage += this.damageBoost;
        this.rangeValue += this.rangeBoost;
        this.fireRate -= this.fireRateBoost;    
        this.resetRange();

        if (this.upgradeLevel == 2){
            this.setTexture("rataManguera2");
        }
        else if (this.upgradeLevel == 3){
            this.setTexture("rataManguera3");
        }
    }
}