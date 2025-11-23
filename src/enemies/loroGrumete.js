import Loro from "../enemies/loro.js";
export default class LoroGrumete extends Loro
{
    constructor(scene , path , x , y , texture = 'loro')
    {
        super(scene , path , x , y , 6 , 10 , 60 , "G", 5 , "Grumete" , texture)
    }

}