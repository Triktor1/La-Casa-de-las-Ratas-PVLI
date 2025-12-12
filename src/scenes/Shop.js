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

    preload() {
        this.load.image('botonVolver', 'assets/UI/backbutton.png');
        this.load.image('botonPlaceholder', 'assets/WebSprites/Rick.png')
        this.load.json('coordsBotones', 'src/scenes/ShopDataManagement/ShopGapsCoords.json')
        this.load.json('frasesNavi', 'src/scenes/ShopDataManagement/FrasesNavi.json')
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    create() {

        //Frases navi

        this.frasesNavi = this.cache.json.get('frasesNavi');
        this.randomnum = Math.floor(Math.random() * 3)
        //TEXTO
        this.add.text(20, 20, "Shop");
        this.descText = this.add.text(700, 500, this.frasesNavi.FrasesNavi[this.randomnum].Frase)
        this.dineroTienda = this.add.text(20, 50, "Plumas: " + this.shopMoney)

        //BOTONES
        const btnBack = this.add.sprite(this.scale.width - 220, 220, 'botonVolver').setInteractive({ useHandCursor: true });
        btnBack.on('pointerdown', () => {
            this.endShop();
        });

        //efectos
        btnBack.on('pointerover', () => btnBack.setScale(1.1));
        btnBack.on('pointerout', () => btnBack.setScale(1.0));

        //CREACION BOTONES COMPRA

        this.buttonPos = this.cache.json.get("coordsBotones").buttonPosition;
        this.buttonArray = [];
        let a = 0;
        for (let i = 0; i < this.playerInfo.A.length; i++) {
            if (this.playerInfo.A[i].NivelDesbloqueo <= this.playerInfo.CurrentLevel && this.playerInfo.A[i].NivelDesbloqueo > 0) {
                //console.log(a);
                //console.log(i);

                this.buttonArray[a] = new TropeButton(this, this.buttonPos[a].x, this.buttonPos[a].y, 'botonPlaceholder', this.playerInfo.A[i].Precio, this.playerInfo.A[i].Desbloqueado, this.playerInfo.A[i].Descripcion);
                this.buttonArray[a].setScale(0.2);
                this.buttonArray[a].setInteractive({ useHandCursor: true });

                a++;
            }
        }


        //Funciones a la hora de interactuar con el cursor

        for (let i = 0; i < this.buttonArray.length; i++) {

            //ANIMACIONES Y DISPLAY DE FUNCIONALIDAD DE LA TROPA/TORRE

            this.buttonArray[i].on("pointerover", () => {
                console.log(this.buttonArray[i].desc);
                this.buttonArray[i].setScale(0.21);

                this.descText.text = this.buttonArray[i].desc;
            })

            this.buttonArray[i].on("pointerout", () => {
                this.buttonArray[i].setScale(0.2);
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