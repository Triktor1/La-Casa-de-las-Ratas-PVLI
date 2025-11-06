export default class TorreUI extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, cost, TorreClase) {
        super(scene, x, y, texture);
        scene.add.existing(this);

        this.scene = scene;
        this.cost = cost;            //Precio
        this.increase = 10;          //lo que sube el precio por cada compra
        this.TorreClase = TorreClase;//Clase que se va a colocar, se tendrá que importar con el js

        this.setInteractive({ draggable: true });
        scene.input.setDraggable(this);

        this.on('drag', (pointer, dragX, dragY) => {//Mientras se arrastra
            this.x = dragX;
            this.y = dragY;
        });

        this.on('dragend', (pointer) => { //Al soltarse
            if (this.scene.levelMoney >= this.cost) {
                const hueco = this.scene.huecosTorre?.find(h =>
                    !h.ocupado && Phaser.Math.Distance.Between(this.x, this.y, h.x, h.y) < 80
                );
                if (hueco) {
                    //crear torre y añadir al grupo 
                    const nuevaTorre = new this.TorreClase(this.scene, hueco.x, hueco.y);
                    this.scene.torres.add(nuevaTorre);
                    //activar colisiones rango enemigo
                     this.scene.physics.add.overlap(nuevaTorre.rangeCircle, this.scene.enemies, (range, enemy) => {
                        const torre = range.parentTorre;
                        if (!torre.currentTarget && enemy.active) {
                        torre.currentTarget = enemy;
                        console.log(enemy.nombre + " ha entrado en el rango de " + torre.nombre);
                        }
                    });

                    // activar colisiones de torre con enemigos (accion de disparo)
                    this.scene.physics.add.overlap(nuevaTorre, this.scene.enemies, (torre, enemy) => {
                        if (!enemy.isBeingTarget) {
                        enemy.isBeingTarget = true;
                        torre.shoot(enemy);
                        console.log(enemy.nombre + " está siendo atacado por " + torre.nombre);
                        }
                    });
                    hueco.ocupar();
                    this.scene.levelMoney -= this.cost;
                    console.log("Dinero actual", this.scene.levelMoney);
                    this.cost += this.increase;
                }
            }
            this.resetPosition();
        });
    }
    resetPosition() {
        this.x = this.input.dragStartX;
        this.y = this.input.dragStartY;
    }
}
