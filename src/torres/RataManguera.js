import Torre from "./TorreBase.js";
import WaterBullet from "../bullets/waterBullet.js";

export default class RataManguera extends Torre{
    constructor(scene, x, y) {
        super(scene, x, y, 120, 15, "rataManguera", "rataManguera", 0, 0.225, 275);
    }

shoot(enemy) {
    const dir = new Phaser.Math.Vector2(enemy.x - this.x, enemy.y - this.y).normalize();
    const bullet = new WaterBullet(this.scene, this.x, this.y, 'siliconeBullet', 1500, 0.4, dir, 380, true, true, 0, "G", 0.075, 0);
    this.scene.bullets.add(bullet);
    return bullet;
}

}