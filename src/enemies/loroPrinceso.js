import Loro from "./loro.js";
export default class LoroPrinceso extends Loro {
    constructor(scene, path, x, y, texture = 'loro') {
        super(scene, path, x, y, 5, 5, 150, "B", 15, "Cañonero", texture, 0)
        this.anims.play('princesoIdle');
    }
}