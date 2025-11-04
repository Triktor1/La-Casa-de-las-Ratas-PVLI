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
    }

    update()
    {
    }
} 