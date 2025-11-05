import Loro from "../enemies/loro.js";
export default class LoroGrumete extends Loro
{
    constructor(scene , path , texture)
    {
        super(scene , path , 100 , 100 , 20 , 10 , 50 , 5 , "Grumete" , texture)
    }

}