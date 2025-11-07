import Bullet from "../bullets/bullet.js";

export default class SiliconeBullet extends Bullet {
    constructor(scene, x, y, direction) {
        super(scene, 0, 0, "siliconeBullet", 900, 15, direction, 800, false, true, 0, "", 1, 0);
        this.texture = scene.textures.get("siliconeBullet");
        this.speed = 900;
        this.damage = 15;
        this.timeToLive = 800;
        

    }
}
