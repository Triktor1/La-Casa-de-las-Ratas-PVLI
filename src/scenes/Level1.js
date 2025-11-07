import Loro from "../enemies/loro.js";
import Torre from "../torres/TorreBase.js";
import Bullet from "../bullets/bullet.js";
import HuecoTorre from "../torres/HuecoTorre.js";
import TorreUI from "../torres/TorreUI.js";
import loroGrumete from "../enemies/loroGrumete.js";
import loroBarril from "../enemies/loroBarril.js";
import loroCanonero from "../enemies/loroCanonero.js";



export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: "Level1" });
        this.shopMoney;
        this.levelMoney = 100;
        this.levelNum = 1;
        this.playerHealth = 100;
        this.enemySpawnNum = 5;
    }

    init(data) {
        this.shopMoney = data.shopMoney || 0;
    }

    preload() {
        this.load.image('loro', 'assets/ParrotPlaceholder.png');
        this.load.image('selectButton', 'assets/lvlselectboton.png');
        this.load.image('shopButton', 'assets/shop.png');
        this.load.image('torre', 'assets/torre.png');
        this.load.image('background', 'assets/bg.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('loroGrum' , 'assets/GrumetePH.png');
        this.load.image('loroCan' , 'assets/CanonPH.png');
        this.load.image('loroBarr' , 'assets/BarrilPH.png');

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    create() {
        this.crearFondo();
        this.crearCamino();
        this.crearEnemigos();
        this.crearTorres();
        this.crearHuecos();
        new TorreUI(this, 80, 100, 'torre', 50, Torre);
        this.crearBotones();
        this.checkColisions();
    }

    crearFondo() {
        this.add.text(20, 20, "Level1");
        const bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(2);
        bg.displayHeight = this.scale.height;
        bg.displayWidth = this.scale.width;

    }

    crearCamino() {
        this.path = new Phaser.Curves.Path(-50, 600);
        this.path.lineTo(300, 600);
        this.path.lineTo(300, 200);
        this.path.lineTo(700, 200);
        this.path.lineTo(700, 600);
        this.path.lineTo(1000, 600);
        this.path.lineTo(1000, 300);
        this.path.lineTo(1300, 300);

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(2, 0xffffff, 1);
        this.path.draw(this.graphics);
    }

    crearEnemigos() {
        this.enemies = this.physics.add.group();
        let loro = new Loro(this, this.path, -50, 600, 10, 10, 100, 10, 'basicLoro', 'loro', 0);
        this.enemies.add(loro);
        loro.startFollowing();
    }

    crearTorres() {
        this.torres = this.physics.add.group();
        //let torreBase = new Torre(this, 500, 200, 0, 10, "basictorre", "torre");
        //this.torres.add(torreBase);

        this.bullets = this.physics.add.group();
        this.Bullet = Bullet;
    }

    crearHuecos() {
        this.huecosTorre = [
            new HuecoTorre(this, 400, 600, 'torre'),
            new HuecoTorre(this, 800, 100, 'torre'),
            new HuecoTorre(this, 900, 470, 'torre')
        ];
    }

    //Habría que hacer un bucle con todas las disponibles y que se vayan colocando: (UI TORREs)
    //new TorreUI(this, 80, 100, 'torre', 50, TorreClase);



    //BOTONES
    //Seleccion de niveles
    /*
    crearBotones() {
        const selectBtn = this.add.sprite(this.sys.game.canvas.width * 0.25, this.sys.game.canvas.height * 0.7, 'selectButton').setInteractive({ useHandCursor: true });
        selectBtn.on('pointerdown', () => {
            this.scene.start('SelectScene');
        });
        selectBtn.on('pointerover', () => selectBtn.setScale(1.1));
        selectBtn.on('pointerout', () => selectBtn.setScale(1.0));

        const shopBtn = this.add.sprite(this.sys.game.canvas.width * 0.8, this.sys.game.canvas.height * 0.7, 'shopButton').setInteractive({ useHandCursor: true });
        shopBtn.on('pointerdown', () => {
            this.scene.start('Shop');
        });
        shopBtn.on('pointerover', () => shopBtn.setScale(1.1));
        shopBtn.on('pointerout', () => shopBtn.setScale(1.0));

        this.text = this.add.text(30,30)
        this.timedEvent = this.time.addEvent({

            delay: 5000,
            loop: true,
            callback: this.spawnEnemy,
            callbackScope: this
        })
    }
        */


    checkColisions() {
        //estas colisiones fueron las que hice cuando simplemente estaba la torre ahi puesta
        //por eso tanto rollo.
        //Disparo desde torre
        /* this.torres.children.iterate(torre => {
            if(!torre) return; 

            this.physics.add.overlap(torre, this.enemies, (range, enemy) => {
            if (!enemy.isBeingTarget) {
                enemy.isBeingTarget = true;
                const bullet = torre.shoot(enemy); // ahora sí existe la variable
                console.log(`${enemy.nombre} esta siendo atacado`);
            }
        }); 
 
        
        //Deteccion enemigo con rango torre
        this.physics.add.overlap(torre.rangeCircle, this.enemies, (range, enemy) => {
            const torre = range.parentTorre;
            if (!torre.currentTarget && enemy.active) {
                torre.currentTarget = enemy;
                console.log(`${enemy.nombre} ha entrado en el rango de ${torre.nombre}`);
            }
        });
        
        }) */

        //colision bala con loro
        /* this.physics.add.overlap(this.bullets, this.enemies, (bullet, enemy) => {
            if (!bullet.active || !enemy.active) return;

            enemy.getDamaged(bullet.damage);
            enemy.checkAlive();

            if (!bullet.piercing) bullet.destroy();
        });
 */
        //colisioni original bala con loro
        this.physics.add.overlap(this.bullets, this.enemies, (bullet, enemy) => {
            if (bullet.teamRat && enemy instanceof Loro) {
                enemy.getDamaged(bullet.damage);
                if (!bullet.piercing) bullet.destroy(); //comprobar si es perforante
            }
        });
    }

    endLevel() {
        this.scene.start('Shop', { shopMoney: this.shopMoney });
    }

    update(time, delta) {
        this.bullets.children.iterate(bullet => {
            if (bullet) bullet.update(time, delta);
        });
        // añado el update de torre
        this.torres.children.iterate(torre => {
            if (torre) torre.update(time);
        });

        if (this.playerHealth <= 0) {
            this.scene.start('GameOverScene');
        }
        this.text.setText(`Event.progress: ${this.timedEvent.getProgress().toString().substr(0, 4)}`);
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
