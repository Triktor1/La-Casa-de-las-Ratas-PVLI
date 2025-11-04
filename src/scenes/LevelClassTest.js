import Loro from "../enemies/loro.js";
import Level  from "../scenes/Level.js";

export default class LevelClassTest extends Level
{

    constructor()
    {
        super("LevelClassTest");
    }


    create()
    {
        this.a = this.add.image(200 , 200 , 'loro');
        console.log()
        this.playerInfoCopy.setFeathers(1)
        this.add.text(20,500,this.playerInfoCopy.getFeathers());  
        
    }

    update()
    {
    }
} 