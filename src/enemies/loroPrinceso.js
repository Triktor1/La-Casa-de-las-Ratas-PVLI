import Loro from "./loro.js";
export default class LoroPrinceso extends Loro
{
        constructor(scene , path , x , y , texture = 'loro')
    {
        super(scene , path , x , y , 5 , 5 , 150, "B", 5 , "Cañonero" , texture , 0)
    }
}