export default class TropaUI extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, cost, increase = 5, TropaClase) {
        super(scene, x, y, texture);
        this.anims.play(texture);
        scene.add.existing(this);

        this.scene = scene;
        this.cost = cost;             //Precio
        this.increase = increase;     //lo que sube el precio por cada compra
        this.TropaClase = TropaClase; //Clase que se va a colocar, se tendrá que importar con el js

        //Texto del precio
        this.priceText = scene.add.text(this.x-5, this.y-65, `${this.cost}`, { fontSize: '20px', color: '#ffffff', fontFamily: 'Arial Black' }).setOrigin(0.5).setScale(0.8);
        this.coinIcon = scene.add.sprite(this.priceText.x + this.priceText.width-10, this.priceText.y, 'coin').setScale(0.4).setOrigin(0, 0.5);
        this.coinIcon.anims.play('coinAnim');

        this.setInteractive();

        this.on('pointerdown', () => {//Mientras se arrastra
            if (this.scene.levelMoney >= this.cost) {
                let spawnPoint = new Phaser.Math.Vector2();
                this.scene.path.getEndPoint(spawnPoint);
                console.log("spawnPoint", spawnPoint, spawnPoint.x, spawnPoint.y);
                const nuevaTropa = new this.TropaClase(this.scene, this.scene.path, spawnPoint.x, spawnPoint.y);
                this.scene.tropas.add(nuevaTropa);
                this.scene.levelMoney -= this.cost;
                console.log("Dinero actual", this.scene.levelMoney);
                this.cost += this.increase;
                this.priceText.setText(`${this.cost}`);
            }
        });
    }
}
