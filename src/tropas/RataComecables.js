import Tropa from "./TropaBase.js";

export default class RataComecables extends Tropa {
    constructor(scene, path, x, y, texture = "rataComecables") {
        super(scene, path, x, y, 5, 10, 50, "G", "rataComecables", "rataComecables", 0);
    }
}