import PlayerData from "../PlayerData/PlayerData.js";
import TropeButton from "./ShopDataManagement/TropeButton.js";
export default class Shop extends Phaser.Scene {
    shopMoney;
    levelNum;
    playerInfo;
    descText;
    constructor() {
        super({ key: "Shop" });
    }

    init(data) {
        this.playerInfo = data.playerInfo;
        this.shopMoney = data.shopMoney || 10;
        this.levelNum = data.levelNum || 1;
    }
    
    preload(){
        this.load.image('backgroundTienda' , 'assets/Fondos/Tienda.png')
        this.load.image('textboxNavi' , 'assets/Tienda/TextBoxNavi.png')
        this.load.image('botonVolver', 'assets/UI/backbuttonTienda.png');
        this.load.image('botonPlaceholder', 'assets/WebSprites/Rick.png')
        this.load.json('coordsBotones', 'src/scenes/ShopDataManagement/ShopGapsCoords.json')
        this.load.json('frasesNavi', 'src/scenes/ShopDataManagement/FrasesNavi.json')
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    create(){
        const bg = this.add.image(0, 0, 'backgroundTienda').setOrigin(0, 0).setScale(2);
        bg.displayHeight = this.scale.height;
        bg.displayWidth = this.scale.width;

        //Frases navi
        this.frasesNavi = this.cache.json.get('frasesNavi');
        this.randomnum = Math.floor(Math.random() * 3)

        //TEXTO
        
        this.add.text(20,20,"Shop");
        
        this.add.image(650 , 500 , 'textboxNavi').setOrigin(0,0).setScale(2.1);
        this.descText = this.add.text(700 , 550 , this.frasesNavi.FrasesNavi[this.randomnum].Frase)
        
        this.dineroTienda = this.add.text(20 , 50 , "Plumas: " + this.shopMoney)

        //BOTONES
        const btnBack = this.add.sprite(this.scale.width - 220, 0, 'botonVolver').setOrigin(0,0).setInteractive({ useHandCursor: true }).setScale(4);
        btnBack.on('pointerdown', () => {
            this.endShop();
        });

        //efectos
        btnBack.on('pointerover', () => btnBack.setScale(4.1));
        btnBack.on('pointerout', () => btnBack.setScale(4));

        //CREACION BOTONES COMPRA

        this.buttonPos = this.cache.json.get("coordsBotones").buttonPosition;
        this.buttonArray = [];
        let a = 0;
        for (let i = 0; i < this.playerInfo.A.length; i++) {
            if (this.playerInfo.A[i].NivelDesbloqueo <= this.playerInfo.CurrentLevel && this.playerInfo.A[i].NivelDesbloqueo > 0) {
                


                this.buttonArray[a] = new TropeButton(this, this.buttonPos[a].x, this.buttonPos[a].y, this.playerInfo.A[i].Sprite , this.playerInfo.A[i].Precio, this.playerInfo.A[i].Desbloqueado, this.playerInfo.A[i].Descripcion);
                this.buttonArray[a].setScale(0.5)
                this.buttonArray[a].setInteractive({ useHandCursor: true });

                a++;
            }
        }


        //Funciones a la hora de interactuar con el cursor

        for (let i = 0; i < this.buttonArray.length; i++) {

            //ANIMACIONES Y DISPLAY DE FUNCIONALIDAD DE LA TROPA/TORRE

            this.buttonArray[i].on("pointerover", () => {
                console.log(this.buttonArray[i].desc);
                this.buttonArray[i].setScale(0.6);

                this.descText.text = this.buttonArray[i].desc;
            })

            this.buttonArray[i].on("pointerout", () => {
                this.buttonArray[i].setScale(0.5);
                this.randomnum = Math.floor(Math.random() * 3)
                this.descText.text = this.frasesNavi.FrasesNavi[this.randomnum].Frase
            })

            this.buttonArray[i].on("pointerdown", () => {
                if (this.buttonArray[i].isUnlocked == false && this.shopMoney >= this.buttonArray[i].precio) {
                    this.buttonArray[i].preFX.addColorMatrix().grayscale(1);
                    this.shopMoney = this.shopMoney - this.buttonArray[i].precio;
                    this.buttonArray[i].esComprada();
                    for (let j = 0; j < this.playerInfo.A.length; j++) {
                        if (this.playerInfo.A[j].Descripcion == this.buttonArray[i].desc) {
                            this.playerInfo.A[j].Desbloqueado = true;
                        }
                    }
                    this.dineroTienda.text = "Plumas: " + this.shopMoney;

                    console.log(this.playerInfo);
                }
                else {
                    this.randomnum = Math.floor(Math.random() * 2)
                    console.log(this.randomnum);
                    this.descText.text = this.frasesNavi.FrasePobre[this.randomnum].Frase
                }
            })

        }
    }

    update() {

    }

    endShop() {
        let levelID = 'Level' + this.levelNum;
        this.scene.start(levelID, { playerInfo: this.playerInfo, dummy: 2 });   
    }
}