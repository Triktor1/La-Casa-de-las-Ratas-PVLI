import Tropa from "./TropaBase.js"
export default class RataCoche extends Tropa {
    constructor(scene, path, x, y, texture = "rataCoche") {
        super(scene, path, x, y, 20, 15, 60, "R", "rataCoche", "rataCoche", 0, 0.3);
        this.setScale(0.12)
        this.hitCooldown = 250; 
        this.explosionSound = this.scene.sound.add("Boom", { volume: 7});
    }


    onCollision(enemy){
        if(!enemy || !enemy.active) return; 

        const now = this.scene.time.now;
        if (now - this.lastHitTime < this.hitCooldown) return;
        this.lastHitTime = now;

        const esCritico = 
          (this.type === "R" && enemy.type === "B") 
        if (esCritico) {
            enemy.vida = 0; // instakill
            console.log("BOOM");

            this.playExplosion(enemy.x,enemy.y);
            //explosion 
            if (this.explosionSound) this.explosionSound.play();
            enemy.checkAlive();

        } else {
            //daño normal
         enemy.getDamaged(this.damage, this.type);
        }
    }

    playExplosion(x,y){
         const exp = this.scene.add.image(x, y, "explosion");

        exp.setScale(0.4);
        exp.setAlpha(1);

        // tween 
        this.scene.tweens.add({
            targets: exp,
            scale: 1.3,
            duration: 2000,
            ease: "Sube.easeInOut",
            flipX: true,
            yoyo: true,
            repeat:2,
            onComplete: () => exp.destroy()
        });
    }
}

