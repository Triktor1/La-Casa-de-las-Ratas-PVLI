import Bullet from "../bullets/bullet.js";

export default class Torre extends Phaser.GameObjects.Image {
    constructor(scene, x = 20, y = 0, speed = 1000, damage = 10, torrename = "torreBase", texture = "torre", frame = 0, scale, rangeValue = 300) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Atributos base
        this.nombre = torrename;
        this.damage = damage;
        this.rangeValue = rangeValue; // radio de alcance
        this.fireRate = speed; // milisegundos entre disparos
        this.lastShotTime = 0;
        this.currentTarget = null; // enemigo actual en rango
        this.setScale(scale);

        this.upgradeLevel = 1;
        this.maxLevel = 3;
        
        // Collider circular invisible (rango)
        this.rangeCircle = this.scene.add.circle(this.x, this.y, this.rangeValue, 0x00ff00, 0.15);
        this.scene.physics.add.existing(this.rangeCircle);
        this.rangeCircle.body.setCircle(this.rangeValue);
        this.rangeCircle.body.setAllowGravity(false);
        this.rangeCircle.body.setImmovable(true);
        this.rangeCircle.setVisible(false);

        this.rangeGraphics = this.scene.add.graphics();
        this.rangeGraphics.lineStyle(2, 0x00ff00, 0.4);
        this.rangeGraphics.strokeCircle(x, y, this.rangeValue);
                
        this.setInteractive({ useHandCursor: true });

        this.on('pointerover', () => {
            this.rangeGraphics.setVisible(true); //hover en torre
        });
        this.on('pointerout', () => {
            this.rangeGraphics.setVisible(false); //fuera del hover
        });

        // Mantiene el rango asociado a la torre
        this.rangeCircle.parentTorre = this;


        //this.checkCollisions(this.scene.enemies, this.scene.bullets);
    }

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
        const bullet = new Bullet(this.scene, this.x, this.y, 'bullet', 1000, this.damage, dir, 750, false, true, 0, "R");
        bullet.setScale(0.2, 0.3);
        this.scene.bullets.add(bullet);
        return bullet;
    }

    upgrade(){
        //Individual para cada torre, usando override
    }

    checkLevelUp(){
        if (this.upgradeLevel < this.maxLevel) {
            this.upgradeLevel += 1;
            return true;
        }
        else return false;
    }
    //ESTE METODO ES PARA LAS TORRES QUE MEJORAN SU RANGO CON EL METODO UPGRADE
    resetRange(){
        if (this.rangeCircle) {
            this.rangeCircle.destroy();
            this.rangeGraphics.clear();
        }
        this.rangeCircle = this.scene.add.circle(this.x, this.y, this.rangeValue, 0x00ff00, 0.15);
        this.scene.physics.add.existing(this.rangeCircle);
        this.rangeCircle.body.setCircle(this.rangeValue);
        this.rangeCircle.body.setAllowGravity(false);
        this.rangeCircle.body.setImmovable(true);
        this.rangeCircle.setVisible(false);

        this.rangeGraphics = this.scene.add.graphics();
        this.rangeGraphics.lineStyle(2, 0x00ff00, 0.4);
        this.rangeGraphics.strokeCircle(this.x, this.y, this.rangeValue);

        this.scene.physics.add.overlap(this.rangeCircle, this.scene.enemies, (range, enemy) => {this.currentTarget = enemy;});
    }
}
