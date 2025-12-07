import Tropa from "./TropaBase.js";
import BalaComecables from "../bullets/comecablesBullet.js"

export default class RataComecables extends Tropa {
    constructor(scene, path, x, y, damage, attackCooldown = 1200, texture = "rataComecables", bulletTexture = "comecablesBullet") {
        super(scene, path, x, y, 5, 0, 50, "G", "rataComecables", "rataComecables", 0, 0.3);

        this.texture = texture;
        this.bulletTexture = bulletTexture;
        this.damage = damage;

        this.attackCooldown = attackCooldown;
        this.lastAttack = 0;
    }

    onCollision(loro) {

        const now = this.scene.time.now;
        if (now - this.lastAttack < this.attackCooldown) {
            return;
        }

        this.lastAttack = now;

        const offset = 20; // separarla un poco visualmente

        const dirX = loro.x - this.x;
        const dirY = loro.y - this.y;
        const len = Math.hypot(dirX, dirY);
        const nx = dirX / len;
        const ny = dirY / len;

        // posición inicial de la bala, desplazada hacia el enemigo
        const bx = this.x + nx * offset;
        const by = this.y + ny * offset;

        const bala = new BalaComecables(this.scene, bx, by, this.bulletTexture, this.damage, 300, 1000, false, true, 0, 'G', 0.5, 0);
        this.scene.bullets.add(bala);

        this.getDamaged(loro.damage, loro.type);
    }
}