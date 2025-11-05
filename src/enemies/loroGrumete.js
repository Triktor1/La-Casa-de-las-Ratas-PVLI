import Loro from "../enemies/loro.js";
export default class loroGrumete extends Loro
{
    constructor(scene , path , texture = 'loro')
    {
        super(scene , path , 100 , 100 , 20 , 10 , 50 , 5 , "Grumete" , texture , 0)
    }

}