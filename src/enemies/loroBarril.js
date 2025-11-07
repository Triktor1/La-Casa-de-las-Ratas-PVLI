import Loro from "../enemies/loro.js";
export default class LoroBarril extends Loro
{
        constructor(scene , path , texture = 'loro')
    {
        super(scene , path , 100 , 100 , 10 , 10 , 50 , 5 , "Barril" , texture , 0)
    }
}