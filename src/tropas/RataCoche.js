import Tropa from "./TropaBase.js"
export default class RataCoche extends Tropa {
    constructor(scene, path, x, y, texture = "rataCoche") {
        super(scene, path, x, y, 20, 15, 60, "R", "rataCoche", texture, 0, 0.8);
        this.hitCooldown = 250;
        this.explosionSound = this.scene.sound.add("Boom", { volume: 7 });
        this.anims.play('cocheAnim');
    }


    onCollision(enemy) {
        if (!enemy || !enemy.active) return;

        const now = this.scene.time.now;
        if (now - this.lastHitTime < this.hitCooldown) return;
        this.lastHitTime = now;

        if (enemy.type === "B") {
            enemy.vida = 0; // instakill
            console.log("BOOM");

            this.playExplosion(enemy.x, enemy.y);
            //explosion 
            if (this.explosionSound) this.explosionSound.play();
            enemy.checkAlive();

        } else {
            //daño normal
            enemy.getDamaged(this.damage, "N");
        }
        this.getDamaged(enemy.damage, enemy.type);
    }

    playExplosion(x, y) {
        const exp = this.scene.add.image(x, y, "explosion");

        exp.setScale(0.4);
        exp.setAlpha(1);

        // tween 
        this.scene.tweens.add({
            targets: exp,
            scale: 0.6,
            duration: 60,
            flipX: true,
            yoyo: true,
            onComplete: () => exp.destroy()
        });
    }
}

