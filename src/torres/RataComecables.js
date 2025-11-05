import Torre from "./TorreBase.js";

export default class RataComecables extends Torre
{
    constructor(scene , texture = 'torre')
    {
        super(scene , 30 , 30 , 10 , 10 , "Rata comecables" , texture , 0)
    }
}