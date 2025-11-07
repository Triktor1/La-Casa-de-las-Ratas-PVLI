import Torre from "./TorreBase.js";
import SiliconeBullet from "../bullets/siliconeBullet.js";

export default class RataSilicona extends Torre
{
    constructor(scene , texture = 'torre')
    {
        super(scene , 30 , 30 , 1500 , 5 , "torreBase" , "silicona", 0)
    
    }

    shoot(enemy) {
        const dir = new Phaser.Math.Vector2(enemy.x - this.x, enemy.y - this.y).normalize();
        const bullet = new SiliconeBullet(this.scene, this.x, this.y, 'siliconeBullet', 800, this.damage, dir, 750, false, true, 0, 0.1);
        bullet.setScale(0.2, 0.3);
        this.scene.bullets.add(bullet);
        return bullet;
    }
}