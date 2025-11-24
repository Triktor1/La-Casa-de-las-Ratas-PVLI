import Torre from "./TorreBase.js";
import FatBullet from "../bullets/fatBullet.js";

export default class RataGorda extends Torre{
    constructor(scene, x, y) {
        super(scene, x, y, 2750, 5, "BigCheese", "BigCheese", 0, 0.5, 150);
    }

shoot(enemy) {
    const dir = new Phaser.Math.Vector2(enemy.x - this.x, enemy.y - this.y).normalize();
    const bullet = new FatBullet(this.scene, this.x, this.y, 'FatBullet', 1200, 25, dir, 100, true, true, 0, "R", 0.2, 0);
    this.scene.bullets.add(bullet);
    return bullet;
}

}