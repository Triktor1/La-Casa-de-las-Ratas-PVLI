export default class TorreUI extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, cost, TorreClase) {
        super(scene, x, y, texture);
        scene.add.existing(this);

        this.scene = scene;
        this.cost = cost; //Precio
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
                    new this.TorreClase(this.scene, hueco.x, hueco.y);
                    hueco.ocupar();
                    this.scene.levelMoney -= this.cost;
                    console.log("Torre colocada en", hueco.x, hueco.y);
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
