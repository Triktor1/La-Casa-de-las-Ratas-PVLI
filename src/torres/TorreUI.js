export default class TorreUI extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, cost, TorreClase) {
        super(scene, x, y, texture);
        scene.add.existing(this);

        this.scene = scene;
        this.cost = cost;            //Precio
        this.increase = 10;          //lo que sube el precio por cada compra
        this.TorreClase = TorreClase;//Clase que se va a colocar, se tendrá que importar con el js

        //Texto del precio
        this.priceText = scene.add.text(this.x, this.y + 100, `Precio: ${this.cost}`, { fontSize: '20px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);


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
                    console.log("Dinero actual", this.scene.levelMoney);
                    this.cost += this.increase;
                    this.priceText.setText(`Precio: ${this.cost}`);
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
