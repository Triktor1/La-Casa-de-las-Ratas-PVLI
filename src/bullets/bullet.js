export default class Bullet extends Phaser.GameObjects.Image{

    constructor(scene, x=0, y=0 , speed, damage , timeToLive , piercing ,teamRat, healValue, frame = 0)
    {
        super(scene , x , y ,texture, frame) //constructora sprite

        this.scene.add.existing(this);

        //Atributos bala
        this.speed = speed;            //VELOCIDAD DE LA BALA
        this.damage = damage;          //DAÑO DE LA BALA
        this.timeToLive = timeToLive;  //DURACION DE LA BALA
        this.piercing = piercing;      //BOOLEANA, SI ES TRUE ATRAVIESA A LOS ENEMIGOS
        this.teamRat = teamRat;        //BOOLEANA, USADA PARA SABER SI ES DEL EQUIPO DE RATAS O DE LOROS
        this.healValue = healValue;    //VALOR DE CURACION DE LA BALA, 0 EN CASO DE NO CURAR
    }
}