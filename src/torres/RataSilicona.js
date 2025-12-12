import Torre from "./TorreBase.js";
import SiliconeBullet from "../bullets/siliconeBullet.js";

export default class RataSilicona extends Torre{
    constructor(scene, x, y) {
        super(scene, x, y, 1500, 5, "rataSilicona", "rataSilicona", 0, 0.8);

        this.slowAmount = 0.5; //multiplicador del efecto slow
        this.duration = 1800; //Duracion del slow

        // MEJORAS DE STATS POR MEJORAR LA TORRE (j)
        this.damageBoost = 5;
        this.slowBoost = 0.1;
        this.durationBoost = 450;

        this.play('siliconeIdle1');
        this.on('animationcomplete', (anim) => {
            if (anim.key === 'siliconettack' + this.upgradeLevel) {
                this.play('siliconeIdle' + this.upgradeLevel);
            }
        });

        this.setUpgradeText("Siguiente nivel: \ndaño + " + this.damageBoost + "\nlentitud + " + this.slowBoost + "\nduracion + " + this.durationBoost/1000 + "s", 24, 3);
    }

    shoot(enemy) {
        const dir = new Phaser.Math.Vector2(enemy.x - this.x, enemy.y - this.y).normalize();
        const bullet = new SiliconeBullet(this.scene, this.x, this.y, 'siliconeBullet', 800, this.damage, dir, 750, false, true, 0, "B", 0.2, 0,
             this.slowAmount, this.duration);
        this.scene.bullets.add(bullet);
        return bullet;
    }

    upgrade(){
        this.damage += this.damageBoost;
        this.slowAmount -= this.slowBoost;
        this.duration += this.durationBoost;

        this.play('siliconeIdle'+this.upgradeLevel);

    }
}