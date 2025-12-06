import Tropa from "./TropaBase.js";
import Bala from "../bullets/normalBullet.js"

export default class RataComecables extends Tropa {
    constructor(scene, path, x, y, texture = "rataComecables", bullletTexture = "comecablesBullet") {
        super(scene, path, x, y, 5, 0, 50, "G", "rataComecables", "rataComecables", 0, 0.3);
    }

    onCollision(enemy){
        this.bala = new Bala(this.scene, x, y, bullletTexture, 0, 1, 0, 100, true,  )
    }
}