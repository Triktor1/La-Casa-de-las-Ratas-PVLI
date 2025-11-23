export default class Bullet extends Phaser.GameObjects.Image {
    constructor(scene, x = 0, y = 0, texture, speed, damage, direction, timeToLive, piercing, teamRat, healValue, type, scale = 1, frame = 0) 
    {
        super(scene, x, y, texture, frame); // constructora
        scene.add.existing(this);
        scene.physics.add.existing(this)

        //Atributos
        this.speed = speed;                             //VELOCIDAD DE LA BALA
        this.damage = damage;                           //DAÑO DE LA BALA
        this.direction = direction.clone().normalize(); //DIRECCION NORMALIZADA
        this.timeToLive = timeToLive;                   //DURACION DE LA BALA
        this.piercing = piercing;                       //BOOLEANA, SI ES TRUE ATRAVIESA A LOS ENEMIGOS
        this.teamRat = teamRat;                         //BOOLEANA, USADA PARA SABER SI ES DEL EQUIPO DE RATAS O DE LOROS
        this.healValue = healValue;                     //VALOR DE CURACION DE LA BALA, 0 EN CASO DE NO CURAR
        this.scaleFactor = scale;                       //ESCALA DE LA BALA
        this.type = type;                               //TIPO (PIEDRA PAPEL TIJERA)
        //escala y rotacion
        this.setScale(this.scaleFactor);
        this.rotation = this.direction.angle() + Math.PI / 2;
        //movimiento
        this.velocity = new Phaser.Math.Vector2(this.direction.x * this.speed, this.direction.y * this.speed);
    }

    update(time, delta) {
        this.x += this.velocity.x * (delta / 1000);
        this.y += this.velocity.y * (delta / 1000);

        this.timeToLive -= delta;
        if (this.timeToLive <= 0) this.destroy();
    }

    effectCollision(enemy) {
        enemy.getDamaged(this.damage, this.type);
        if (!this.piercing) this.destroy(); //comprobar si es perforante
    }
}
