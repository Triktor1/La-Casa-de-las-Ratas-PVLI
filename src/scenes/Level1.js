import Loro from "../enemies/loro.js";
import Torre from "../torres/TorreBase.js";
import Bullet from "../bullets/bullet.js";
import HuecoTorre from "../torres/HuecoTorre.js";
import TorreUI from "../torres/TorreUI.js";

export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: "Level1" });
        this.shopMoney;
        this.levelMoney = 100;
        this.levelNum = 1;
        this.playerHealth = 100;
    }

    init(data) {
        this.shopMoney = data.shopMoney || 0;
    }

    preload() {
        this.load.image('loro', 'assets/ParrotPlaceholder.png')
        this.load.image('selectButton', 'assets/lvlselectboton.png');
        this.load.image('shopButton', 'assets/shop.png');
        this.load.image('torre', 'assets/torre.png');
        this.load.image('background', 'assets/bg.png');
        this.load.image('bullet', 'assets/bullet.png');

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    create() {
        this.add.text(20, 20, "Level1");
        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(2);
        bg.displayHeight = this.scale.height;
        bg.displayWidth = this.scale.width;

        //CAMINO
        this.path = new Phaser.Curves.Path(100, 100);
        this.path.lineTo(400, 200);
        this.path.lineTo(400, 300);
        this.path.lineTo(900, 100);

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(2, 0xffffff, 1);
        this.path.draw(this.graphics);

        this.enemies = this.physics.add.group();
        let loro = new Loro(this, this.path, 100, 100, 15, 10, 100, 10, 'basicLoro', 'loro', 0);
        this.enemies.add(loro);
        loro.startFollowing();
        loro = new Loro(this, this.path, 100, 100, 10, 10, 100, 10, 'basicLoro', 'loro', 0);
        this.enemies.add(loro);
        loro.startFollowingReversed();

        this.Torre = new Torre(this, 500, 200, 0, 10, "basictorre", "torre");

        this.bullets = this.physics.add.group();

        const dir = new Phaser.Math.Vector2(1, 0); //Derecha
        const bullet = new Bullet(this, 500, 200, 'bullet', 700, 2500000, dir, 750, false, true, 0, 0.1);
        this.bullets.add(bullet);


        this.huecosTorre = [
            new HuecoTorre(this, 300, 250, 'torre'),
            new HuecoTorre(this, 450, 250, 'torre'),
        ];

        //Habría que hacer un bucle con todas las disponibles y que se vayan colocando: (UI TORREs)
        //new TorreUI(this, 80, 100, 'torre', 50, TorreClase);

        this.physics.add.overlap(this.bullets, this.enemies, (bullet, enemy) => {
            if (bullet.teamRat && enemy instanceof Loro) {
                enemy.getDamaged(bullet.damage);
                if (!bullet.piercing) bullet.destroy(); //comprobar si es perforante
            }
        });

        //BOTONES
        //Seleccion de niveles
        const selectBtn = this.add.sprite(this.sys.game.canvas.width * 0.25, this.sys.game.canvas.height * 0.7, 'selectButton').setInteractive({ useHandCursor: true });
        selectBtn.on('pointerdown', () => {
            this.scene.start('SelectScene');
        });
        selectBtn.on('pointerover', () => selectBtn.setScale(1.1));
        selectBtn.on('pointerout', () => selectBtn.setScale(1.0));
        //Tienda
        const shopBtn = this.add.sprite(this.sys.game.canvas.width * 0.8, this.sys.game.canvas.height * 0.7, 'shopButton').setInteractive({ useHandCursor: true });
        shopBtn.on('pointerdown', () => {
            this.scene.start('Shop');
        });
        shopBtn.on('pointerover', () => shopBtn.setScale(1.1));
        shopBtn.on('pointerout', () => shopBtn.setScale(1.0));
    }


    endLevel() {
        this.scene.start('Shop', { shopMoney: this.shopMoney });
    }

    update(time, delta) {
        this.bullets.children.iterate(bullet => {
            if (bullet) bullet.update(time, delta);
        });
        if (this.playerHealth <= 0) {
            this.scene.start('GameOverScene');
        }
    }

    changePlayerHealth(amount) {
        this.playerHealth += amount;
    }

    changeLevelMoney(amount) {
        this.levelMoney += amount;
    }

    writeLevelMoney() {
        console.log("Dinero del nivel: " + this.levelMoney);
    }
}