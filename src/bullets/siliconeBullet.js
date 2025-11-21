import Bullet from "../bullets/bullet.js";

export default class SiliconeBullet extends Bullet {
    constructor(scene, x, y, texture, speed, damage, direction, timeToLive, piercing, teamRat, healValue, type, scale, frame) {
        super(scene, x, y, texture, speed, damage, direction, timeToLive, piercing, teamRat, healValue, type, scale, frame);
    }
}
