import Tropa from "./TropaBase.js";

export default class RataComecables extends Tropa {
    constructor(scene, path, x, y, texture = "rataRodadero") {
        super(scene, path, x, y, 2, 10, 100, "B", "rataRodadero", texture, 0, 1);
        this.anims.play('rodaderoAnim');
        
    }
}