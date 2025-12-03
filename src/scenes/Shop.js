import PlayerData from "../PlayerData/PlayerData.js";
import TropeButton from "./ShopDataManagement/TropeButton.js";
export default class Shop extends Phaser.Scene {
    shopMoney;
    levelNum;
    playerInfo;
    constructor(){
        super({key:"Shop"});
    }

    init(data){
        this.playerInfo = data.playerInfo;
        this.shopMoney = data.shopMoney || 10;
        this.levelNum = data.levelNum || 1;
    }
    
    preload(){
        this.load.image('botonVolver', 'assets/UI/backbutton.png');
        this.load.image('botonPlaceholder' , 'assets/WebSprites/Rick.png')
        this.load.json('coordsBotones' , 'src/scenes/ShopDataManagement/ShopGapsCoords.json')
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    create(){

        //TEXTO

        this.add.text(20,20,"Shop");
        this.dineroTienda = this.add.text(20 , 50 , "Plumas: " + this.shopMoney);
        

        //BOTONES
        const btnBack = this.add.sprite(this.scale.width - 220, 220, 'botonVolver').setInteractive({ useHandCursor: true });
        btnBack.on('pointerdown', () => {
            this.endShop();
        });

        //efectos
        btnBack.on('pointerover', () => btnBack.setScale(1.1));
        btnBack.on('pointerout', () => btnBack.setScale(1.0));


        //BOTONES COMPRA TEST

        /*
        const a = new TropeButton(this , 100 , 200 , 'botonPlaceholder' , 5);
        a.setInteractive({useHandCursor : true});
        a.setScale(0.2 , 0.2);
        a.on('pointerover', () =>
        {
            a.setScale(0.21);
            console.log(a.desc);
        });
        a.on('pointerout', () => a.setScale(0.2));

        a.on('pointerdown' , () =>
        {
            if (a.isUnlocked == false && this.shopMoney >= a.precio)
            {
                a.preFX.addColorMatrix().grayscale(1);
                this.shopMoney = this.shopMoney - a.precio;
                a.esComprada();
                console.log(this.shopMoney);
            }
        })

        */
        //CREACION BOTONES COMPRA

        this.buttonPos = this.cache.json.get("coordsBotones").buttonPosition;
        this.buttonArray = [];
        let a = 0;
        for(let i = 0 ; i < this.playerInfo.A.length; i++)
        {
            if(this.playerInfo.A[i].NivelDesbloqueo <= this.playerInfo.CurrentLevel)
            {
                console.log(a);
                console.log(i);

                this.buttonArray[a] = new TropeButton(this , this.buttonPos[a].x , this.buttonPos[a].y , 'botonPlaceholder' , this.playerInfo.A[i].Precio , this.playerInfo.A[i].Desbloqueado , this.playerInfo.A[i].Descripcion);
                this.buttonArray[a].setScale(0.2);
                this.buttonArray[a].setInteractive({useHandCursor : true});
                
                a++;
            }
        }


        //Funciones a la hora de interactuar con el cursor

        for (let i = 0 ; i < this.buttonArray.length ; i++)
        {

            //ANIMACIONES Y DISPLAY DE FUNCIONALIDAD DE LA TROPA/TORRE

            this.buttonArray[i].on("pointerover" , () => {
                console.log(this.buttonArray[i].desc);
                this.buttonArray[i].setScale(0.21);
            })

            this.buttonArray[i].on("pointerout" , () =>{
                this.buttonArray[i].setScale(0.2);
            })

            this.buttonArray[i].on("pointerdown" , () =>
            {
                 if (this.buttonArray[i].isUnlocked == false && this.shopMoney >= this.buttonArray[i].precio)
                {
                    this.buttonArray[i].preFX.addColorMatrix().grayscale(1);
                    this.shopMoney = this.shopMoney - this.buttonArray[i].precio;
                    this.buttonArray[i].esComprada();
                    //console.log(this.shopMoney);
                }
            })

        }
    }

    update()
    {
        this.dineroTienda = "Plumas: " + this.shopMoney
    }

    endShop(){
        let levelID = 'Level' + this.levelNum;
        if(this.levelNum === 0){
            this.scene.start('TutorialLevel', {shopMoney: this.shopMoney});
        }
        else{
            this.scene.start(levelID, {shopMoney: this.shopMoney});
        }
    }
}