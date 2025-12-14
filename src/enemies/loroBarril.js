import Loro from "../enemies/loro.js";
export default class LoroBarril extends Loro {
    constructor(scene, path, x, y, texture = 'loro') {
        super(scene, path, x, y, 10, 10, 50, "R", 5, "Barril", texture, 0)
        this.anims.play('barrilIdle');
    }

    startFollowing() {
        this.startFollow({
            duration: 40000 / this.speed,
            repeat: 0,
            rotateToPath: false,
            onComplete: () => {
                this.checkAlive(true);
                console.log(`${this.nombre} ha llegado al final del path!`);
            }
        });
    }
}
