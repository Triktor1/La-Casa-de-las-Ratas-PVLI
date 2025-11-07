import Torre from "./TorreBase.js";

export default class RataBombaQueso extends Torre
{
    constructor(scene , texture = 'torre')
    {
        super(scene , 30 , 30 , 10 , 10 , "Rata Bomba Queso" , texture , 0)
    }
}