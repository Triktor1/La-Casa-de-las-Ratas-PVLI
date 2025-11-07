import Loro from "../enemies/loro.js";
import Torre from "../torres/TorreBase.js";
import PlayerData from "../PlayerData/PlayerData.js";

export default class Level extends Phaser.Scene
{

    constructor(levelkey)
    {
        super({key:levelkey});

        this.levelMoney = 0;
        this.playerHealth = 0;
        this.levelNum;
        
    }
    init(data)
    {
        this.add.text(20,20, data.sceneName);  
        this.playerInfoCopy = data.playerInfo;
        this.levelNum = data.nextLevel;
    }
    preload()
    {
        
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