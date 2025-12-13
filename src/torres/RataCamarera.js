import Torre from "./TorreBase.js";
import NormalBullet from "../bullets/normalBullet.js";

export default class RataChef extends Torre{
    constructor(scene, x, y) {
        super(scene, x, y, 1500, 5, "rataChef", "rataChef", 0, 0.8);

        this.heal = true;
        this.healAmount = 15;

        // MEJORAS DE STATS POR MEJORAR LA TORRE (j)
        this.healBoost = 5;
        this.firerateBoost = 0.1;
        this.play('chefIdle1');
        this.on('animationcomplete', (anim) => {
            if (anim.key === 'chefAttack' + this.upgradeLevel) {
                this.play('chefIdle' + this.upgradeLevel);
            }
        });

        this.setUpgradeText("Siguiente nivel: \ncuracion + " + this.healBoost + "\nvelocidad + " + this.firerateBoost + "s", 24, 3);
    }

    shoot(enemy) {
        const dir = new Phaser.Math.Vector2(enemy.x - this.x, enemy.y - this.y).normalize();
        const bullet = new NormalBullet(this.scene, this.x, this.y, 'gourmetBullet', 800, 0, dir, 750, false, true, this.healAmount, "B ", 0.2, 0,
             this.slowAmount, this.duration);
        this.scene.bullets.add(bullet);
        this.play('chefAttack' + this.upgradeLevel);
        return bullet;
    }

    upgrade(){
        this.healAmount += this.healBoost;
        this.firerate -= this.firerateBoost;
        this.play('chefIdle'+ this.upgradeLevel);

    }
}