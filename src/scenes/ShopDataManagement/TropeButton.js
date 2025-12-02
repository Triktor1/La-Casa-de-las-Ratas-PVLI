export default class TropeButton extends Phaser.GameObjects.Image
{

    constructor(scene , x , y , sprite , precio , estado , nivelDisp , desc)
    {
        super(scene , x , y , sprite , 0)
        
        const textura  = sprite;

        this.isUnlocked = estado;
        this.tropa = 0;
        this.desc = "Esta tropa hace esto";
        this.precio = precio;
        scene.add.existing(this);

        if (this.isUnlocked)
        {
            this.setTint(0x34383d);
        }
        
    }
    esComprada()
    {
        console.log("Caching");
        this.isUnlocked = true;
        this.setTint(0x34383d);
    }

}