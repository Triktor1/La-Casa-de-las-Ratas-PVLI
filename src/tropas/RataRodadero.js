import Tropa from "./TropaBase.js";

export default class RataComecables extends Tropa {
    constructor(scene, path, x, y, texture = "rataRodadero") {
        super(scene, path, x, y, 2, 10, 100, "G", "rataRodadero", "rataRodadero", 0, 0.3);
        this.setScale(0.12)
    }
}