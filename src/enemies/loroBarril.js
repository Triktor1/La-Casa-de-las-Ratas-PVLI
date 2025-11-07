import Loro from "../enemies/loro.js";
export default class LoroBarril extends Loro
{
        constructor(scene , path, x , y , texture = 'loro')
    {
        super(scene , path , x , y , 10 , 10 , 40 , 5 , "Barril" , texture , 0)
    }
}