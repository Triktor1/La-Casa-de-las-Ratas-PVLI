import Loro from "../enemies/loro.js";

import Torre from "../torres/TorreBase.js";
import RataSilicona from "../torres/RataSilicona.js";
import RataJeringa from "../torres/RataJeringa.js";
import RataGorda from "../torres/RataGorda.js";
import RataManguera from "../torres/RataManguera.js";
import RataChef from "../torres/RataCamarera.js";
import RatSniper from "../torres/TorreSniper.js";

import Tropa from "../tropas/TropaBase.js";
import TropaUI from "../tropas/TropaUI.js"

import Bullet from "../bullets/bullet.js";
import HuecoTorre from "../torres/HuecoTorre.js";
import TorreUI from "../torres/TorreUI.js";
import loroGrumete from "../enemies/loroGrumete.js";
import loroBarril from "../enemies/loroBarril.js";
import loroCanonero from "../enemies/loroCanonero.js";
import RataComecables from "../tropas/RataComecables.js";
import PlayerData from "../PlayerData/PlayerData.js";
import RataCoche from "../tropas/RataCoche.js";
import RataRodadero from "../tropas/RataRodadero.js";

export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: "Level1" });
        this.shopMoney;
        this.levelMoney = 1000;
        this.levelNum = 1;
        this.playerHealth = 100;
        this.enemySpawnNum = 30;
    }


    init(data) {
        //Inicialización de variables principales
        this.test = data.dummy;
        this.shopMoney = data.shopMoney || 0;
        this.playerInfo = data.playerInfo;
        this.levelMoney = 1000;
        this.levelNum = 1;
        this.playerHealth = 30;
        this.enemySpawnNum = 20;
        this.enemySpawnNum = 30;
    }

    preload() {
        
        //Carga jsons de niveles
        this.load.json('L1Data', 'src/scenes/LevelJsons/Level1.json');
        this.load.json('L2Data', 'src/scenes/LevelJsons/Level2.json');
        this.load.json('L3Data', 'src/scenes/LevelJsons/Level3.json');

        this.levelArray = ['L1Data', 'L2Data', 'L3Data'];

        //Carga de imágenes
        this.load.image('loro', 'assets/Loros/ParrotPlaceholder.png');
        this.load.image('selectButton', 'assets/UI/lvlselectboton.png');
        this.load.image('shopButton', 'assets/UI/shop.png');
        this.load.image('torre', 'assets/Ratas/torre.png');
        this.load.image('rataComecables', 'assets/Ratas/rataComecables.png');

        //SPRITES DE RATA SILICONA
        this.load.image('rataSilicona', 'assets/Ratas/siliconeRat.png');
        this.load.image('rataSilicona2', 'assets/Ratas/siliconeRat2.png');
        this.load.image('rataSilicona3', 'assets/Ratas/siliconeRat3.png');
        this.load.image('siliconeBullet', 'assets/Ratas/siliconeBullet.png');

        //SPRITES DE RATA CHEF
        this.load.image('rataChef', 'assets/Ratas/RataChef.png');
        this.load.image('rataChef2', 'assets/Ratas/RataChef2.png');
        this.load.image('rataChef3', 'assets/Ratas/RataChef3.png');
        this.load.image('gourmetBullet', 'assets/Ratas/Gourmet.png');

        //SPRITES DE RATA GORDA
        this.load.image('BigCheese', 'assets/Ratas/BigCheese.png');
        this.load.image('BigCheese2', 'assets/Ratas/BigCheese2.png');
        this.load.image('BigCheese3', 'assets/Ratas/BigCheese3.png');
        this.load.image('FatBullet', 'assets/Ratas/FatBullet.png');

        //SPRITES DE RATA MANGUERA
        this.load.image('rataManguera', 'assets/Ratas/RataManguera.jpg');
        this.load.image('rataManguera2', 'assets/Ratas/RataManguera2.png');
        this.load.image('rataManguera3', 'assets/Ratas/RataManguera3.png');

        //SPRITES DE RATA SNIPER
        this.load.image('Sniper', 'assets/Ratas/Sniper.png');
        this.load.image('Sniper2', 'assets/Ratas/Sniper2.png');
        this.load.image('Sniper3', 'assets/Ratas/Sniper3.png');
        this.load.image('bullet', 'assets/Ratas/bullet.png');

        //SPRITES DE RATA JERINGA
        this.load.image('rataJeringa', 'assets/Ratas/RataJeringa.png');
        this.load.image('rataJeringa2', 'assets/Ratas/RataJeringa2.png');
        this.load.image('rataJeringa3', 'assets/Ratas/RataJeringa3.png');
        this.load.image('jeringaBullet', 'assets/Ratas/Jeringa.png');

        this.load.image('background', 'assets/bg.png');

        //SPRITES DE TROPAS LORO
        this.load.image('loroGrum', 'assets/Loros/GrumetePH.png');
        this.load.image('loroCan', 'assets/Loros/CanonPH.png');
        this.load.image('loroBarr', 'assets/Loros/BarrilPH.png');
        //SPRITES DE TROPAS RATA
        this.load.image('rataCoche', 'assets/Ratas/rataCoche.png');
        this.load.image('rataRodadero', 'assets/Ratas/rataRodadero.png');
        this.load.image('explosion', 'assets/Ratas/explosion.png');

        //Carga de sonido
        this.load.audio('Critico', 'assets/sonidos/SonidoOriginalParaDañoCriticoNoRobado.mp3');
        this.load.audio('Boom', 'assets/sonidos/Boom.mp3');
    }

    create() {


        console.log(this.playerInfo.CurrentLevel);
        this.jsonDataName = this.cache.json.get(this.levelArray[this.playerInfo.CurrentLevel]).Name;
        this.jsonDataArray = this.cache.json.get(this.levelArray[this.playerInfo.CurrentLevel]).path;
        this.levelMoney = this.cache.json.get(this.levelArray[this.playerInfo.CurrentLevel]).levelMoney;
        this.enemySpawnNum = this.cache.json.get(this.levelArray[this.playerInfo.CurrentLevel]).enemySpawnNum;

        //console.log(this.test);
        //console.log(this.playerInfo);

        //Creación de elementos del nivel
        this.enemies = this.physics.add.group();
        this.tropas = this.physics.add.group();
        this.crearFondo();
        this.crearCamino();
        this.crearEnemigos();
        this.crearTorres();
        this.crearTropas();
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
        this.jsonTextLevel = this.add.text(700 , 10, "Nivel: " + this.jsonDataName + " Puntos: " + this.jsonDataArray.length);


        // UI DE TORRES
        new TorreUI(this, 80, 100, 'torre', 50, RataSilicona);
        new TorreUI(this, 240, 100, 'torre', 50, RataJeringa);
        new TorreUI(this, 400, 100, 'torre', 50, RataGorda);
        new TorreUI(this, 560, 100, 'torre', 50, RataManguera);
        new TorreUI(this, 880, 100, 'torre', 50, RataChef);
        new TorreUI(this, 1040, 100, 'torre', 50, RatSniper);

        //UI DE TROPAS
        new TropaUI(this, 720, 100, 'torre', 20, 5, RataComecables);
        new TropaUI(this, 560, 200, 'torre', 20, 5, RataCoche);
        new TropaUI(this, 1200, 100, 'torre', 20, 5, RataRodadero);
        
        //COLISIONES
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

        this.path = new Phaser.Curves.Path(this.jsonDataArray[0].x , this.jsonDataArray[0].y )
        for(var a = 1 ; a < this.jsonDataArray.length;a++)
        {
            this.path.lineTo(this.jsonDataArray[a].x , this.jsonDataArray[a].y)
        }
     
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
                loro = new Loro(this, this.path, -50, 600, 10, 10, 100, "G", 10, 'basicLoro', 'loro', 0);
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
        this.torresGrupo = this.physics.add.group();
        this.torresArray = [];

        this.bullets = this.physics.add.group();
        this.Bullet = Bullet;
    }

    crearTropas() {
        this.tropas = this.physics.add.group();
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
            if (bullet.teamRat  && bullet.damage!=0 && enemy instanceof Loro) {
                bullet.effectCollision(enemy);
            }
        });
        this.physics.add.overlap(this.bullets, this.tropas, (bullet, tropa) => {
            if (bullet.teamRat && bullet.damage == 0 && tropa instanceof Tropa) {
                bullet.heal(tropa);
            }
        });

         //Colisiones tropas con loros
        this.physics.add.overlap(this.tropas, this.enemies, (tropa, loro) =>{
            
            //Si uno ya no existe/destruye, ignorar
            if (!tropa || !loro) return; 
            if (!tropa.active || !loro.active) return; 

            //Si ya se esetan pegando con otro, ignorar
            if(tropa.isFighting && tropa.currentEnemy !==loro ) return;
            if(loro.isFighting && loro.currentEnemy !== tropa) return;

            //caso rataCoche
            if(tropa instanceof RataCoche){
                tropa.onCollision(loro);
                if (!loro.lastAttackTime) loro.lastAttackTime = 0;  


                //al ser un caso apartado se declara de nuevo el comportamiento del ataque de los loros, porque no llega a la logica donde se realiza para el caso generico
                const now = this.time.now;
                const cooldown = 300; // milisegundos entre ataques

                if (now - loro.lastAttackTime >= cooldown) {
                    tropa.getDamaged(loro.damage, loro.type); // el loro ataca a la tropa
                    loro.lastAttackTime = now;
                }
                return; 
            }
            if(tropa instanceof RataComecables){
                tropa.onCollision(loro);
            }

            //comprobacion antifreeze
            const t = tropa;
            const e = loro;

            this.time.delayedCall(50, () => {

                if (!this.physics.overlap(t, e)) {
                    if (t.startWalking) t.startWalking();
                    if (e.startWalking) e.startWalking();
                }
            });

            //inicia combate
            tropa.isFighting = true;
            loro.isFighting = true;

            tropa.currentEnemy = loro; 
            loro.currentEnemy = tropa; 

            //Machetazos
            tropa.stopWalking();
            loro.stopWalking();

            const now = this.time.now; 
            const cooldown = 300; 
            
            
            if (!tropa.lastAttackTime) tropa.lastAttackTime = 0;
            if (!loro.lastAttackTime) loro.lastAttackTime = 0;

            if (now - tropa.lastAttackTime >= cooldown) {
                tropa.getDamaged(loro.damage, loro.type);
                loro.getDamaged(tropa.damage, tropa.type);

                tropa.lastAttackTime = now;
                loro.lastAttackTime = now;
            }
            
            //resultado de batalla (movimiento)
            if (!tropa.active || tropa.hasDied){
                loro.isFighting = false; 
                loro.currentEnemy = null; 
                loro.startWalking();
            }
            if (!loro.active || loro.hasDied){
                tropa.isFighting = false;
                tropa.currentEnemy = null; 
                tropa.startWalking(); 
            }
        })
      
    }

    update(time, delta) {
        this.bullets.children.iterate(bullet => {
            if (bullet) bullet.update(time, delta);
        });
        // añado el update de torre
        this.torresGrupo.children.iterate(torre => {
            if (torre) torre.update(time);
        });
        if (this.enemySpawnNum <= 0 && this.enemies.countActive() == 0) {

            if (this.playerInfo.CurrentLevel < 2)
            {
                this.playerInfo.CurrentLevel++;
                this.scene.start('Shop' ,{ shopMoney: this.shopMoney , playerInfo: this.playerInfo} );
            }
            else
            {
                this.scene.start('Win' ,{ shopMoney: this.shopMoney , playerInfo: this.playerInfo} );
            }
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
