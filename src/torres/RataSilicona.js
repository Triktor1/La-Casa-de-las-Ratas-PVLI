import Torre from "./TorreBase.js";
import SiliconeBullet from "../bullets/siliconeBullet.js";

export default class RataSilicona extends Torre{
    constructor(scene, x, y) {
        super(scene, x, y, 1500, 5, "rataSilicona", "silicona", 0);
    }

shoot(enemy) {
    const dir = new Phaser.Math.Vector2(enemy.x - this.x, enemy.y - this.y).normalize();
    const bullet = new SiliconeBullet(this.scene, this.x, this.y, 'siliconeBullet', 800, this.damage, dir, 750, false, true, 0, "", 0.2, 0);
    this.scene.bullets.add(bullet);
    return bullet;
}

}