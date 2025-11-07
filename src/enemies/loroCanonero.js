import Loro from "./loro.js";
export default class LoroCanonero extends Loro
{
        constructor(scene , path , texture = 'loro')
    {
        super(scene , path , 100 , 100 , 5 , 10 , 50 , 5 , "Cañonero" , texture , 0)
    }
}