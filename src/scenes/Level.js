import Loro from "../enemies/loro.js";
import Torre from "../torres/TorreBase.js";
import PlayerData from "../PlayerData/PlayerData.js";

export default class Level extends Phaser.Scene
{


    constructor(levelkey , currentLevel)
    {
        super({key:levelkey});
    }
    init(data)
    {
        this.add.text(20,20, data.sceneName);
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

}