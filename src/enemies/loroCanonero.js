import Loro from "./loro.js";
export default class LoroCanonero extends Loro
{
        constructor(scene , path , x , y , texture = 'loro')
    {
        super(scene , path , x , y , 5 , 10 , 80, "B", 7 , "Cañonero" , texture , 0)
        this.anims.play('canoneroIdle');
    }
}