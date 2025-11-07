import Torre from "./TorreBase.js";

export default class RataSilicona extends Torre
{
    constructor(scene , texture = 'torre')
    {
        super(scene , 30 , 30 , 10 , 10 , "Rata Rata Silicona" , texture , 0)
    }
}