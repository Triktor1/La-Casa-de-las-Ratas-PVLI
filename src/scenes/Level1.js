import Loro from "../enemies/loro.js";

import Torre from "../torres/TorreBase.js";
import RataSilicona from "../torres/RataSilicona.js";
import RataJeringa from "../torres/RataJeringa.js";
import RataGorda from "../torres/RataGorda.js";
import RataManguera from "../torres/RataManguera.js";

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
        this.enemySpawnNum = 30;

    }


    init(data) {
        //Inicialización de variables principales
        this.shopMoney = data.shopMoney || 0;
        this.levelMoney = 100;
        this.levelNum = 1;
        this.playerHealth = 30;
        this.enemySpawnNum = 20;
        this.enemySpawnNum = 30;
    }

    preload() {
        //Carga de imágenes


        
        this.load.json('L1Data' , 'src/scenes/LevelJsons/Level1.json');
        this.load.json('L2Data' , 'src/scenes/LevelJsons/Level2.json');
        this.load.json('L3Data' , 'src/scenes/LevelJsons/Level3.json');

        this.levelArray = ['L1Data' , 'L2Data' , 'L3Data'];


        this.load.image('loro', 'assets/Loros/ParrotPlaceholder.png');
        this.load.image('selectButton', 'assets/UI/lvlselectboton.png');
        this.load.image('shopButton', 'assets/UI/shop.png');
        this.load.image('torre', 'assets/Ratas/torre.png');
        this.load.image('rataSilicona', 'assets/Ratas/siliconeRat.png');
        this.load.image('BigCheese', 'assets/Ratas/BigCheese.png');
        this.load.image('rataManguera', 'assets/Ratas/RataManguera.jpg');
        this.load.image('background', 'assets/bg.png');
        this.load.image('bullet', 'assets/Ratas/bullet.png');
        this.load.image('siliconeBullet', 'assets/Ratas/siliconeBullet.png');
        this.load.image('FatBullet', 'assets/Ratas/FatBullet.png');
        this.load.image('loroGrum', 'assets/Loros/GrumetePH.png');
        this.load.image('loroCan', 'assets/Loros/CanonPH.png');
        this.load.image('loroBarr', 'assets/Loros/BarrilPH.png');

        //Carga de sonido
        this.load.audio('Critico', 'assets/sonidos/SonidoOriginalParaDañoCriticoNoRobado.mp3'); 
    }

    create() {

        
        this.jsonData = this.cache.json.get(this.levelArray[1]).Name;



        //Creación de elementos del nivel
        this.enemies = this.physics.add.group();
        this.crearFondo();
        this.crearCamino();
        this.crearEnemigos();
        this.crearTorres();
        this.crearHuecos();
        //UI
        this.dineroText = this.add.text(200, 10, "Dinero: " + this.levelMoney, {
            fontFamily: 'Arial Black',
            fontSize: '25px'
        });
        this.vidaText = this.add.text(450 + 20, 10, "Vida: " + this.playerHealth, {
            fontFamily: 'Arial Black',
            fontSize: '25px'
        })
        this.jsonTextLevel = this.add.text(700 , 10, "Nivel" + this.jsonData);



        // UI DE TORRES
        new TorreUI(this, 80, 100, 'torre', 50, Torre);
        new TorreUI(this, 240, 100, 'torre', 50, RataSilicona);
        new TorreUI(this, 400, 100, 'torre', 50, RataJeringa);
        new TorreUI(this, 560, 100, 'torre', 50, RataGorda);
        new TorreUI(this, 720, 100, 'torre', 50, RataManguera);

        //this.crearBotones();
        this.checkColisions();

        this.timedEvent = this.time.addEvent({

            delay: Math.floor(Math.random() * 3000 + 2000),
            loop: true,
            callback: this.crearEnemigos,
            callbackScope: this
        })
    }

    crearFondo() {
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

        if (this.enemySpawnNum > 0) {

            this.randomnum = Math.floor(Math.random() * 3)
            console.log(this.randomnum)

            let loro;

            if (this.randomnum == 0) {
                loro = new Loro(this, this.path, -50, 600, 10, 10, 100,"G", 10, 'basicLoro', 'loro', 0);
            }
            else if (this.randomnum == 1) {
                loro = new loroCanonero(this, this.path, -50, 600, 'loroCan')
            }
            else if (this.randomnum == 2) {
                loro = new loroGrumete(this, this.path, -50, 600, 'loroGrum')
            }
            else if (this.randomnum == 3) {
                loro = new loroBarril(this, this.path, -50, 600, 'loroBarr');
            }



            this.enemies.add(loro);
            loro.startFollowing();
            this.enemySpawnNum = this.enemySpawnNum - 1;
        }
    }

    crearTorres() {
        this.torres = this.physics.add.group();
        //let torreBase = new Torre(this, 500, 200, 0, 10, "basictorre", "torre");
        //this.torres.add(torreBase);

        this.bullets = this.physics.add.group();
        this.Bullet = Bullet;
    }

    //HUECOS DONDE SE COLOCAL LAS TORRES
    crearHuecos() {
        this.huecosTorre = [
            new HuecoTorre(this, 400, 600, 'torre'),
            new HuecoTorre(this, 800, 100, 'torre'),
            new HuecoTorre(this, 900, 470, 'torre'),
        ];
    }

    checkColisions() {
        //COLISION DE LAS BALAS CON LOS LOROS
        this.physics.add.overlap(this.bullets, this.enemies, (bullet, enemy) => {
            if (bullet.teamRat && enemy instanceof Loro) {
                bullet.effectCollision(enemy);
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
        if (this.enemySpawnNum <= 0 && this.enemies.countActive() == 0) {
            this.scene.start('Win');
        }
        if (this.playerHealth <= 0) {
            this.scene.start('GameOverScene');
        }
        this.dineroText.text = "Dinero: " + this.levelMoney;
        this.vidaText.text = "Vida: " + this.playerHealth;
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
