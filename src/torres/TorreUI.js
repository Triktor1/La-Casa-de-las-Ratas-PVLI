export default class TorreUI extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, cost, TorreClase) {
        super(scene, x, y, texture);
        scene.add.existing(this);

        this.scene = scene;
        this.cost = cost;            //Precio
        this.increase = 10;          //lo que sube el precio por cada compra
        this.TorreClase = TorreClase;//Clase que se va a colocar, se tendrá que importar con el js
        this.anims.play(texture);
        
        //Texto del precio
        this.priceText = scene.add.text(this.x, this.y + 100, `Precio: ${this.cost}`, { fontSize: '20px', color: '#ffffff', fontFamily: 'Arial Black' }).setOrigin(0.5).setScale(0.8);


        this.setInteractive({ draggable: true });
        scene.input.setDraggable(this);

        this.on('drag', (pointer, dragX, dragY) => {//Mientras se arrastra
            this.x = dragX;
            this.y = dragY;
        });

        this.on('dragend', (pointer) => { //Al soltarse
            if (this.scene.levelMoney >= this.cost) {
                const hueco = this.scene.huecosTorre?.find(h =>
                    !h.ocupado && Phaser.Math.Distance.Between(this.x, this.y, h.x, h.y) < 80);
                const miClase = this.scene.torresArray?.find(t => Phaser.Math.Distance.Between(this.x, this.y, t.x, t.y) < 80);
                if (hueco) {
                    //crear torre y añadir al grupo 
                    const nuevaTorre = new this.TorreClase(this.scene, hueco.x, hueco.y);
                    this.scene.torresGrupo.add(nuevaTorre);
                    this.scene.torresArray.push(nuevaTorre);
                    //activar colisiones rango enemigo
                    if (!nuevaTorre.heal){
                        this.scene.physics.add.overlap(nuevaTorre.rangeCircle, this.scene.enemies, (range, enemy) => {
                            const torre = range.parentTorre;
                            if (!torre.currentTarget && enemy.active) {
                            torre.currentTarget = enemy;}
                        });
                    } else{
                        this.scene.physics.add.overlap(nuevaTorre.rangeCircle, this.scene.tropas, (range, tropa) => {
                            const torre = range.parentTorre;
                            if (!torre.currentTarget && tropa.active) {
                            torre.currentTarget = tropa;}
                        });

                    }
                    hueco.ocupar();
                    this.scene.levelMoney -= this.cost;
                    this.cost += this.increase;
                    this.priceText.setText(`Precio: ${this.cost}`);
                }
                if (miClase instanceof this.TorreClase && miClase.checkLevelUp()) {
                    console.log('Mejorando torre:', miClase);
                    miClase.upgrade();
                    this.scene.levelMoney -= this.cost;
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
