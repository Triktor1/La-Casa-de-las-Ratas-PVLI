import Torre from "./TorreBase.js";
import JeringaBullet from "../bullets/jeringaBullet.js";

export default class RataJeringa extends Torre{
    constructor(scene, x, y) {
        super(scene, x, y, 1500, 15, "rataJeringa", "rataJeringa", 0);
    }

shoot(enemy) {
    const dir = new Phaser.Math.Vector2(enemy.x - this.x, enemy.y - this.y).normalize();
    const bullet = new JeringaBullet(this.scene, this.x, this.y, 'jeringaBullet', 800, this.damage, dir, 750, false, true, 0, "", 0.2, 0);
    this.scene.bullets.add(bullet);
    return bullet;
}

}