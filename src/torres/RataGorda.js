import Torre from "./TorreBase.js";
import NormalBullet from "../bullets/normalBullet.js";

export default class RataGorda extends Torre{
    constructor(scene, x, y) {
        super(scene, x, y, 2750, 5, "BigCheese", "BigCheese", 0, 0.60, 150);

        this.damage = 25;
        this.bulletDuration = 100;

        //Atributos de mejora al mejorar la torre
        this.damageBoost = 5;
        this.rangeBoost = 20;
        this.bulletDurationBoost = 25;

        this.play('bombasticIdle1');
        this.on('animationcomplete', (anim) => {
            if (anim.key === 'bombasticAttack' + this.upgradeLevel) {
                this.play('bombasticIdle' + this.upgradeLevel);
            }
        });
        this.setUpgradeText("Siguiente nivel: \ndaño + " + this.damageBoost + "\nrango + " + this.rangeBoost, 24, 2);
    }

    shoot(enemy) {
        const dir = new Phaser.Math.Vector2(enemy.x - this.x, enemy.y - this.y).normalize();
        const bullet = new NormalBullet(this.scene, this.x, this.y, 'FatBullet', 1200, this.damage, dir, this.bulletDuration, true, true, 0, "R", 0.2, 0);
        this.scene.bullets.add(bullet);
        this.play('bombasticAttack' + this.upgradeLevel);
        return bullet;
    }

    upgrade(){
        this.damage += this.damageBoost;
        this.rangeValue += this.rangeBoost;
        this.bulletDuration += this.bulletDurationBoost;
        this.resetRange();
        this.play('bombasticIdle'+ this.upgradeLevel);
    }
}