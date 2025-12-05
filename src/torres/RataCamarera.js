import Torre from "./TorreBase.js";
import GourmetBullet from "../bullets/gourmetBullet.js";

export default class RataChef extends Torre{
    constructor(scene, x, y) {
        super(scene, x, y, 1500, 5, "rataChef", "rataChef", 0, 0.3);

        this.heal = true;
        this.healAmount = 15;

        // MEJORAS DE STATS POR MEJORAR LA TORRE (j)
        this.healBoost = 5;
        this.firerateBoost = 0.1;

        this.setUpgradeText("Siguiente nivel: \ncuracion + " + this.healBoost + "\nvelocidad + " + this.firerateBoost + "s", 24, 3);
    }

    shoot(enemy) {
        const dir = new Phaser.Math.Vector2(enemy.x - this.x, enemy.y - this.y).normalize();
        const bullet = new GourmetBullet(this.scene, this.x, this.y, 'gourmetBullet', 800, 0, dir, 750, false, true, this.healAmount, "B ", 0.2, 0,
             this.slowAmount, this.duration);
        this.scene.bullets.add(bullet);
        return bullet;
    }

    upgrade(){
        this.healAmount += this.healBoost;
        this.firerate -= this.firerateBoost;

        if (this.upgradeLevel == 2){
            this.setTexture("rataChef2");
        }
        else if (this.upgradeLevel == 3){
            this.setTexture("rataChef3");
        }
    }
}