import Torre from "./TorreBase.js";
import JeringaBullet from "../bullets/jeringaBullet.js";

export default class RataJeringa extends Torre{
    constructor(scene, x, y) {
        super(scene, x, y, 1500, 15, "rataJeringa", "rataJeringa", 0);

        //Atributos propios
        this.damage = 8;
        this.bulletSpeed = 800;
        this.tick = 3;
        this.interval = 900;

        //Atributos de mejora al mejorar la torre
        this.damageBoost = 1;
        this.tickUpgrade = 1;
        this.intervalUpgrade = 125;

        this.setUpgradeText("Siguiente nivel: \ndaño + " + this.damageBoost + "\ngolpes + " + this.tickUpgrade + "\nintervalo veneno - " + this.intervalUpgrade, 24, 3);
    }

    shoot(enemy) {
        const dir = new Phaser.Math.Vector2(enemy.x - this.x, enemy.y - this.y).normalize();
        const bullet = new JeringaBullet(this.scene, this.x, this.y, 'jeringaBullet', this.bulletSpeed, this.damage, dir, 750, false, true, 0, "G", 0.2, 0, this.tick, this.interval);
        this.scene.bullets.add(bullet);
        return bullet;
    }

    upgrade(){
        this.damage += this.damageBoost;
        this.tick += this.tickUpgrade;
        this.interval -= this.intervalUpgrade;
    }
}