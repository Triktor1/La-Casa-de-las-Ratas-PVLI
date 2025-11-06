import Bullet from "../bullets/bullet.js"; 

export default class Torre extends Phaser.GameObjects.Image {
    constructor(scene, x = 20, y = 0, speed = 0.1, damage = 10, torrename = "torreBase", texture = "torre", frame = 0) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Atributos base
        this.nombre = torrename;
        this.damage = damage;
        this.rangeValue = 150; // radio de alcance
        this.fireRate = speed; // milisegundos entre disparos
        this.lastShotTime = 0;
        this.currentTarget = null; // enemigo actual en rango

        // Collider circular invisible (rango)
        this.rangeCircle = this.scene.add.circle(this.x, this.y, this.rangeValue, 0x00ff00, 0.15);
        this.scene.physics.add.existing(this.rangeCircle);
        this.rangeCircle.body.setCircle(this.rangeValue);
        this.rangeCircle.body.setAllowGravity(false);
        this.rangeCircle.body.setImmovable(true);
        this.rangeCircle.setVisible(false); // oculta el rango visual

        // Mantiene el rango asociado a la torre
        this.rangeCircle.parentTorre = this;
    }

    /* rangeSensor(){
        const rango = this.scene.add.circle(this.x, this.y, this.rangeValue, 0x00ff00, 0.15);
        this.scene.physics.add.existing(this.rango);
        this.rango.body.setCircle(this.rangeValue);
        this.rango.body.setAllowGravity(false);
        this.rango.body.setImmovable(true);
        this.rango.setVisible(false);    
        return rango;
    } */
    update(time) {
        // Mantiene el rango en la posición de la torre
        if (this.rangeCircle) {
            this.rangeCircle.x = this.x;
            this.rangeCircle.y = this.y;
        }

        // Control de disparo automático
        if (this.currentTarget && time - this.lastShotTime > this.fireRate) {
            this.shoot(this.currentTarget);
            this.lastShotTime = time;
        }

        // Si el objetivo ya ha muerto o salido del rango, deja de apuntar
        if (this.currentTarget && (!this.currentTarget.active || this.currentTarget.vida <= 0)) {
            this.currentTarget = null;
        }
    }

    shoot(enemy) {
        const dir = new Phaser.Math.Vector2(enemy.x - this.x, enemy.y - this.y).normalize();
        const bullet = new Bullet(this.scene, this.x, this.y, 'bullet', 700, 20, dir, 750, false, true, 0, 0.1);
        this.scene.bullets.add(bullet);
        return bullet; 
    }
}
